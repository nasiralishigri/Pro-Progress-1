
var Client = require('coinbase').Client;
var client = new Client({'apiKey': '8oEJVBbeccvTnTYD', 'apiSecret': 'M9maqFYEmr0qoIC9cC0CNTVsKrAE9gkU'});


async function xx(){
 async function getEthToUS(data){     // Convert Eth to USD

  return await client.getBuyPrice({'currencyPair': 'ETH-BTC'}, function(err, obj) {    // Return Price of Token in USD

   var price = obj.data.amount;  //  1 Eth Price to Dollar
   console.log(" Price is   "+ price);
   // var tokenPrice =  (0.02 * 1000000000000000000)/ price;
 //  var tokenPrice =  (tokenRate/1000000000000000000) * price;
  
  // return price;
   // callback(tokenPrice);
   data(price);
 });

}

var x = await getEthToUS(function(data){

  console.log(data);
});
// console.log(x);
}
xx();