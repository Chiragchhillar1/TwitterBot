const reTwit = require('./controller/twit')


console.log("This is cron job test here.")

cronjobtest = () => {

    console.log("Inside function")

    const getResponse = new reTwit()

    const mainResponse = getResponse.getTweets("python", "like")

    console.log("Retweeted!")

}

cronjobtest()