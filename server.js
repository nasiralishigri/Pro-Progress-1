const express = require('express');
const app = express();
const port = 3003 || process.env.PORT;
const Web3 = require('web3');
const truffle_connect = require('./connection/app.js');
const bodyParser = require('body-parser');
const path = require('path');

// const showData_connect = require('./views/accounts.js');




//////   Handle Bars   Import /////
var exphbs  = require('express-handlebars');

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');


// const viewsPath = path.join(__dirname, '../views') 
// app.set('views', viewsPath)

app.set('view engine', 'handlebars');

app.use('/', express.static(__dirname + '/views'));
app.use('/index', express.static('views'));



app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());



app.get('/getAccounts', (req, res) => {        //   Get All Accounts
  console.log("**** GET /getAccounts ****");
  truffle_connect.start(function (answer) {
    res.send(answer);
  })
});
    app.get('/sendTranacrion',async(req,res)=>{   // 
    //let getaccount=await truffle_connect.start();
    //console.log('hammad zahid 12234  '+getaccount)
    let pakistan=await truffle_connect.lifeIsTest();
    res.send("transection is true")

    })

app.post('/getBalance', (req, res) => {     // Get Balance of All Accounts Registered
  console.log("**** GET /getBalance ****");
  console.log(req.body);
  let currentAcount = req.body.account;

  truffle_connect.refreshBalance(currentAcount, (answer) => {
    let account_balance = answer;
    truffle_connect.start(function(answer){
      // get list of all accounts and send it along with the response
      let all_accounts = answer;
      response = [account_balance, all_accounts]
      res.send(response);
    });
  });
});

app.post('/sendCoin', (req, res) => {     //    Send Coin
  console.log("**** GET /sendCoin ****");
  console.log(req.body);

  let amount = req.body.amount;
  let sender = req.body.sender;
  let receiver = req.body.receiver;

  truffle_connect.sendCoin(amount, sender, receiver, (balance) => {
    res.send(balance);
  });
});



app.get('/getTokenName',async(req,res)=>{   ///// Getting Token ///////
  // console.log("pre provider")
  const name=await truffle_connect.tokenName();
  console.log('Token Name is: '+ name);
  res.send(name);
});

app.get('/getTokenSymbol',async(req,res)=>{   ///// Getting Token Symbol ///////
  // console.log("pre provider")/ate',async(req,res)=>{   ///// Getting Token  Rate///////
  // console.log("pre provider")
  const tokenSymbol =await truffle_connect.tokenSymbol();
  console.log('Token Decemal is:  '+ tokenSymbol);
  res.send(tokenSymbol);
});
app.get('/getTokenRate',async(req,res)=>{   ///// Getting Token Rate in Wei ///////
  // console.log("pre provider")/ate',async(req,res)=>{   ///// Getting Token  Rate///////
  // console.log("pre provider")
  const tokenRate =await truffle_connect.tokenRate();
  console.log('Token Decemal is:  '+ tokenRate);
  res.send(tokenRate);
});
app.get('/getWeiRaised',async(req,res)=>{   ///// Getting Wei  Raised ///////
  // console.log("pre provider")
  const weiRaised =await truffle_connect.weiRaised();
  console.log("Raised Wei is:  "+ weiRaised);
  res.send(weiRaised);
});
app.get('/getTotalSupply', async (req, res)=>{
  var totalSupply = await truffle_connect.totalSupply();
  res.send("Total Supply is: "+ totalSupply);
})
app.get('/getTokenAddress',async(req,res)=>{   ///// Getting Token Address ///////
  // console.log("pre provider")
  const tokenAddress = await truffle_connect.tokenAddress();
  console.log("Token Address is:  "+ tokenAddress);
  res.send("Token Address is:  "+ tokenAddress);
});
app.get('/getWalletAddress',async(req,res)=>{   ///// Getting Wallet Address ///////
  // console.log("pre provider")
  const walletAddress = await truffle_connect.walletAddress();
  console.log("your Wallet Address is :  "+ walletAddress);
  res.send("your Wallet Address is :  "+ walletAddres);
});
app.get('/getHardCap',async(req,res)=>{   ///// Getting Hard Cap  or JusAddress ///////
  // console.log("pre provider")
  const hardCap = await truffle_connect.hardCap();
  console.log("Your Token Cap is :  "+ hardCap);
  res.send("Your Token Cap is :  "+ hardCap);
});
app.get('/sendTransaction',async(req,res)=>{   ///// Send Transaction  ///////
  
   await truffle_connect.start(async function (answer){sidebar
   
    const sendTransaction = await truffle_connect.sendTransaction(answer);
  console.log("Send Transaction Successfully:  "+ sendTransaction);
  res.send("Send Transaction Successfully:  "+ sendTransaction);

  });
});

app.get('/buyToken',async(req,res)=>{   ///// Buy Token  ///////

   await truffle_connect.start(async function (answer){
  
    const buyToken = await truffle_connect.buyToken(answer);
  console.log("Wallet Address is:  "+ buyToken);
  res.send(buyToken);

  });
});


app.get('/getBalances', async(req, res)=>{     // If we Want to get Balance of Current User then Call getBalances

  try{

    truffle_connect.start(async(answer)=> {
      var balanceOf = await truffle_connect.balanceOfUser(answer);
      res.send("Your Balance is : "+balanceOf);
    })
  }
  catch(err){
    console.log("Eror is "+err);
  }

})


app.get('/', async(req,res)=>{
  // res.render(__dirname + '/views/index.handlebars');
  truffle_connect.start(async(answer)=> {
    var balanceOf = await truffle_connect.balanceOfUser(answer);
    var totalSupply = await truffle_connect.totalSupply();
    const hardCap = await truffle_connect.hardCap();
    res.render(__dirname + '/views/index.handlebars',{balanceIs: balanceOf });
  })
   
})

///////////////// Routing of Some Specifc Pages here

app.get('/index', async( req, res)=>{   //   Go to Index page
  truffle_connect.start(async(answer)=> {
    var balanceOf = await truffle_connect.balanceOfUser(answer);
    const hardCap = await truffle_connect.hardCap();
    var totalSupply = await truffle_connect.totalSupply();
    res.render(__dirname + '/views/index.handlebars',{
      balanceIs: balanceOf, 
      distributed: totalSupply,
      cap: hardCap
    });
  })
  
});
app.get('/buyico', async( req, res)=>{    //   Route to Buy ICO Page
  res.render(__dirname + '/views/buyico.handlebars');
  
});
app.get('/history', async( req, res)=>{  // Route to History Page
  res.render(__dirname + '/views/history.handlebars');
  
});
app.get('/profile', async( req, res)=>{    // Route to Profile Page
  res.render(__dirname + '/views/profile.handlebars');
  
});
app.get('/recent-trans', async( req, res)=>{    //   Route to Recent Transaction Page
  res.render(__dirname + '/views/recent-trans.handlebars');
  
});
app.get('/wallet', async( req, res)=>{       // Route to  Wallet Page
  res.render(__dirname + '/views/wallet.handlebars');
  
});
app.get('/faqs', async( req, res)=>{      // Route to Faws Page
  res.render(__dirname + '/views/faqs.handlebars');
  
});



app.listen(port, () => {

  // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
  truffle_connect.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));

  console.log("Express Listening at http://localhost:" + port);

});



