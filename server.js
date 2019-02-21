/*
 * Write your routing code in this file.  Make sure to add your name and
 * @oregonstate.edu email address below.
 *
 * Name: Jeremiah Kramer
 * Email: kramerje@oregonstate.edu
 */

var path = require('path');
var express = require('express');
var exphbs = require('express-handlebars');

var twitData = require('./twitData');

var app = express();
var port = process.env.PORT || 3000;

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');


app.get('/', function (req, res, next) {
   res.status(200).render('twitPage', {
      twits: twitData,
      buttonDisplay: true,
      modalDisplay: true
   });
});

app.use(express.static('public'));

app.get('/twit/:n', function (req, res, next) {
   var n = req.params.n;
   if(twitData[n]){
      res.status(200).render('twitPage', {
         twits: [twitData[n]],
         buttonDisplay: false,
         modalDisplay: false
      });
   } else{
      next();
   }
});


app.get('*', function (req, res) {
  res.status(404).render('404');
});

app.listen(port, function () {
  console.log("== Server is listening on port", port);
});
