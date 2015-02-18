var express = require('express')
var app = express()
var PORT = 4999;

app.get('/', function (req, res) {
  res.send('Hello World!')
})

var server = app.listen(PORT, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Tweet Retriever - Listening on port: " + PORT)

})