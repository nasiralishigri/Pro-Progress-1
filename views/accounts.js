// // var express = require('express');
// // var app = express();
// // var path = require('path');
// // //////   Handle Bars   Import /////
// // var exphbs  = require('express-handlebars');
// // app.engine('handlebars', exphbs({defaultLayout: 'main', layoutsDir: path.join(__dirname ,'views/layouts')}));
// // const viewsPath = path.join(__dirname, '../views') 
// // app.set('views', viewsPath)

// // app.set('view engine', 'handlebars');


// $(document).ready(function () {
//     var curraccount;
//     var selectedAccount;
//     console.log("its connected and Ready")
//     // $.get('/getBalances',  (req, res)=>{
//     //  console.log("Response is "+res);
//     // //  console.log("Response is "+req);
//     // })
// })
  
//     $('#submit').click(function () {
//       selectedAccount = $('#options').val();
//       console.log(selectedAccount);
//       $.post('/getBalance', {account : selectedAccount}, function (response) {
//         $('.select').removeClass("active");
//         $('.send').addClass("active");
//         $('#account').text(selectedAccount);
//         $('#balance').text(response[0]);
//         var current_account_index = response[1].indexOf(selectedAccount);
//         response[1].splice(current_account_index,1); //remove the selected account from the list of accounts you can send to.
//         $('#all-accounts').addClass("active");
//         var list= $('#all-accounts > ol');
//         for(let i=0;i< response[1].length;i++){
//           li="<li>"+response[1][i]+"</li>";
//           list.append(li)
//         }
  
  
//       })
//     })
  
//     $('#send').click(function () {
//       $('#status').text("Sending...");
//       let amount = $('#amount').val();
//       let receiver = $('#receiver').val();
//       $.post('/sendCoin', {amount : amount, sender : selectedAccount, receiver : receiver}, function (response) {
//         $('#balance').text(response);
//         $('#status').text("Sent!!");
//       })
//     });
//   })
  