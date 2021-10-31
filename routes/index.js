var express = require('express');

const reTwit = require('../controller/twit')

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Twitter Retweet Bot.' });
});

router.get('/tweets', async (req,res) => {
  
  const getResponse = new reTwit()

  const mainResponse = await getResponse.getTweets()

  res.send("Searching Tweets!")

})

module.exports = router;
