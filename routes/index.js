var express = require('express');

const reTwit = require('../controller/twit')

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Twitter Retweet Bot.' });
});

router.get('/tweets/like', async (req,res) => {
  
  const getResponse = new reTwit()

  const mainResponse = await getResponse.getTweets("deeplearning", "like")

  res.send("Liked Tweets!")

})

router.get('/tweets/retweet', async (req,res) => {
  
  const getResponse = new reTwit()

  const mainResponse = await getResponse.getTweets("deeplearning", "retweet")

  res.send("Retweeted Tweets!")

})

module.exports = router;
