const axios = require('axios');
const crypto = require('crypto');
const oauth1a = require('oauth-1.0a');

const { response } = require('express');

class twitBot
{

    getAuth = async(request) => {

        const CONSUMERKEY = 'ztzQhyRma6T2KJJAmV2xex03X';
        const CONSUMERSECRET = '21nVsMdwqgDlzA0qO1ahfZajBZP6niZY8ptjoo844Tfw2kuWxP';
        const TOKENKEY = '1454352311334027267-M9IDKLJRWiYZ9l0nkcIojhiAvMvWDg';
        const TOKENSECRET = 'HSE1TFI6rGmeMYoq5aCGglxxcss0KcMhbP5m3aJLtdjvp';

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

    getTweets = async() => {

        var config = {
            method: 'get',
            url: 'https://api.twitter.com/2/tweets/search/recent?query=datascience',
            headers: { 
              'Authorization': 'Bearer AAAAAAAAAAAAAAAAAAAAAAMUVQEAAAAAGnPR1%2BbS1cP%2F525ZAfzRzhJ66do%3DmqGW2gARYQ8T4CYGRWBaOf50xvBCDZDugCy2BGW66HwzdR95eF', 
              'Cookie': 'guest_id=v1%3A163558036256170269; personalization_id="v1_+Eh1tkzLE3sfM/VJArfnPA=="'
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

          tweetArray.forEach(tweet => {
            console.log(tweet.id)
            let tweetret = this.reTweets(tweet.id)

            console.log("Retweeted!")
          });
        
      }

      reTweets = async(tweetId) => {

        const request = {
            url: 'https://api.twitter.com/2/users/1454352311334027267/retweets',
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

}

module.exports = twitBot