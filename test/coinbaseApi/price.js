
var Client = require('coinbase').Client;
var client = new Client({'apiKey': '8oEJVBbeccvTnTYD', 'apiSecret': 'M9maqFYEmr0qoIC9cC0CNTVsKrAE9gkU'});
// var ether = require('../helpers/ethers.js');

// async function getPrice(){
//   return await  client.getBuyPrice({'currencyPair': 'ETH-USD'}, function(err, obj) {

// //  ethtoDollar = obj.data.amount;
// //  console.log(ethtoDollar);
// //  return callback(ethtoDollar);

    
// // ((cap * tokenRate)/ ether(1) ) * ethtoDollar;
//   });
// }


// client.getBuyPrice({'currencyPair': 'ETH-USD'},  async(err, obj)=> {


//   var price = obj.data.amount;  //  1 Eth Price to Dollar

//   var tokenPrice =  (0.02 * 1000000000000000000)/ price; 

//   console.log('total amount: ' + tokenPrice);
// });

// // module.exports = getPrice;


module.exports = {
getPrice:async  (token, callback)=>{
    var x = await  client.getBuyPrice({'currencyPair': 'ETH-USD'}, function(err, obj) {

      var price = obj.data.amount;  //  1 Eth Price to Dollar
      // var tokenPrice =  (0.02 * 1000000000000000000)/ price;
     var tokenPrice =  (token/1000000000000000000) * price;
     
     
      callback(tokenPrice);
    });
   
  }


}

