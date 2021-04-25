const TwitterStreamInterface = require("./helpers/twitter.js");
var userModel = require("./models/model");
const { keyword } = require("./search/tags");
const producer = require("./helpers/kafka-producer");

var tw_api = new TwitterStreamInterface(
  "dz9XC0e99nHqlneDA1n4JiNsd",
  "W2FuRyg3GDwrHLx6v1OMzMNwL3lL5lmkPLfVsGHtR4y91bR8su",
  "3159540323-9IprnZmDCtgZ1xfQkGaVxNV5xJDyvDknY0nbdRE",
  "cpHgAPsfz0jmBCybmfuu88E8JFZG7hgAnlLMha2Re3xkq"
);

tw_api
  .Twitter()
  .stream("statuses/filter", { track: keyword })
  .on("tweet", (tweet) => {
    var temp = new userModel(
      tweet.user.id,
      tweet.source,
      tweet.retweeted,
      tweet.retweet_count,
      tweet.created_at,
      tweet.user.name,
      tweet.id_str,
      tweet.profile_image_url,
      tweet.followers_count,
      tweet.text
    );
    // setting the host  and options
    var kafkaHost = {
      kafkaHost: "52.19.199.252:9092,52.19.199.252:9093,52.19.199.252:9094",
    };
    var kafka_production = producer(kafkaHost);

    const payload = [
      {
        topic: "caleb_twitter_stream_topic",
        messages: JSON.stringify(temp.objectify()),
      },
    ];

    kafka_production.sendPayload(payload);
  });
