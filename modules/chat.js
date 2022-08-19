module.exports = {    
    bot: bot
};

function bot (client, message, response) {
      console.log(response);
    return new Promise(function (resolve, reject) {
        client.sendMessage(message.from, response.text.text[0])
        .then((result) => {
          console.log("Result: ", result); //return object success
          resolve(result);
        })
        .catch((erro) => {
          console.error("Error when sending: ", erro);
          reject(erro);
        });    
});
  
}