const Twit = require("twit");
/**
 * Creates an interface to connect to twitter api stream
 */
class TwitterStreamInterface {
        // @include : takes in the Twitter api token keys
        constructor(
                consumer_key = "",
                consumer_secret = "",
                token = "",
                token_secret = "",
                keyword = []
        ) {
                this.consumer_key = consumer_key;
                this.consumer_secret = consumer_secret;
                this.token = token;
                this.token_secret = token_secret;
                this.keyword = keyword;
        }

        // @include : create a twitter stream instance
        Twitter() {
                return new Twit({
                        consumer_key: this.consumer_key,
                        consumer_secret: this.consumer_secret,
                        access_token: this.token,
                        access_token_secret: this.token_secret,
                        timeout_ms: 60 * 1000,
                        strictSSL: true
                });
        }
}


module.exports = TwitterStreamInterface;