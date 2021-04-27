class Model {
  constructor(
    tweet_id,
    source,
    retweeted,
    retweeted_count,
    created_at,
    username,
    user_id,
    profile_img_url,
    followers,
    tweet
  ) {
    this.source = source;
    this.retweeted = retweeted;
    this.retweeted_count = retweeted_count;
    this.created_at = created_at;
    this.username = username;
    this.profile_img_url = profile_img_url;
    this.followers = followers;
    this.user_id = user_id;
    this.tweet_id = tweet_id;
    this.tweet = tweet;
  }

  objectify() {
    return {
      tweet_id: this.tweet_id,
      source: this.source,
      retweeted: this.retweeted,
      retweeted_count: this.retweeted_count,
      created_at: this.created_at,
      username: this.username,
      profile_img_url: this.profile_img_url,
      followers: this.followers,
      user_id: this.user_id,
      tweet: this.tweet,
    };
  }
}

module.exports = Model;
