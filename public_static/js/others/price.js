
var Client = require('coinbase').Client;
var client = new Client({'apiKey': '8oEJVBbeccvTnTYD', 'apiSecret': 'M9maqFYEmr0qoIC9cC0CNTVsKrAE9gkU'});



module.exports = {
getPrice:async  (token, callback)=>{
    var x = await  client.getBuyPrice({'currencyPair': 'ETH-USD'}, function(err, obj) {

      var price = obj.data.amount;  //  1 Eth Price to Dollar
      // var tokenPrice =  (0.02 * 1000000000000000000)/ price;
     var tokenPrice =  (token/1000000000000000000) * price;
     
     
      callback(tokenPrice);
    });
   
  },

  getTokenOfEther: async (tokenAmount,tokenRate,callback)=>{

      var totalEther = (tokenAmount * tokenRate)/ 1000000000000000000;
      callback(totalEther);


  }


}

