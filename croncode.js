const reTwit = require('./controller/twit')


console.log("This is cron job test here.")

cronjobtest = () => {

    console.log("Inside function")

    const getResponse = new reTwit()

    const mainResponse = getResponse.getTweets("100daysofcode", "retweet")

    console.log("Retweeted!")

}

cronjobtest()