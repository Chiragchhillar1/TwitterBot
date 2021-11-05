const axios = require('axios');
const crypto = require('crypto');
const oauth1a = require('oauth-1.0a');

const { response } = require('express');
const URL_GET_TWEETS = process.env.TWITTER_DEV_BASE_URL + 'tweets/search/recent?query='
const URL_LIKE_TWEETS = process.env.TWITTER_DEV_BASE_URL + `users/${process.env.TWITTER_USER_ID}/likes`
const URL_RETWEETS = process.env.TWITTER_DEV_BASE_URL + `users/${process.env.TWITTER_USER_ID}/retweets`

class twitBot
{

    getAuth = async(request) => {

        const CONSUMERKEY = process.env.CONSUMERKEY;
        const CONSUMERSECRET = process.env.CONSUMERSECRET;
        const TOKENKEY = process.env.TOKENKEY;
        const TOKENSECRET = process.env.TOKENSECRET;

        const oauth = oauth1a({
            consumer: { key: CONSUMERKEY, secret: CONSUMERSECRET },
            signature_method: 'HMAC-SHA1',
            hash_function(base_string, key) {
                return crypto
                    .createHmac('sha1', key)
                    .update(base_string)
                    .digest('base64')
            },
        })

        const authorization = oauth.authorize(request, {
            key: TOKENKEY,
            secret: TOKENSECRET,
        });

        return oauth.toHeader(authorization);

    }

    getTweets = async(topic, option) => {

        var config = {
            method: 'get',
            url: URL_GET_TWEETS+topic,
            headers: { 
              'Authorization': `Bearer ${process.env.TWITTER_AUTH_BEARER_TOKEN}`, 
              'Cookie': process.env.TWITTER_COOKIE
            }
          };
          
          let tweetsInfo = await axios(config)
          .then(function (response) {
              return response.data
            //console.log(JSON.stringify(response.data));
          })
          .catch(function (error) {
            console.log(error);
          });

          let tweetArray = tweetsInfo.data

          if (option == "like") {

            tweetArray.forEach(tweet => {
              console.log(tweet.id)
              let tweetret = this.likeTweets(tweet.id)
  
              console.log("Liked!")
  
            });  

            return "Liked!"
            
          }

          tweetArray.forEach(tweet => {
            console.log(tweet.id)
            let tweetret = this.reTweets(tweet.id)

            console.log("Retweeted!")

          });

          return "Retweeted!"
        
      }

      likeTweets = async(tweetId) => {

        const request = {
            url: URL_LIKE_TWEETS,
            method: 'POST',
            body: {
                "tweet_id": tweetId
            }
        };
        
        const authHeader = await this.getAuth(request);
        
        return await axios.post(
            request.url,
            request.body,
            { headers: authHeader });
          
      }

      reTweets = async(tweetId) => {

        const request = {
            url: URL_RETWEETS,
            method: 'POST',
            body: {
                "tweet_id": tweetId
            }
        };
        
        const authHeader = await this.getAuth(request);
        
        return await axios.post(
            request.url,
            request.body,
            { headers: authHeader });
          
      }

      cronTest = async() =>{

        console.log("In cron test.")

        return "okok";

      }

}

module.exports = twitBot