// @flow
export type BayesClassifier = {
  trainAsync: (string, string) => string
}

export type Category = string

type TwitText = string
type UrlText = string
type Lang = 'en' | 'de'

export type Twitts = Array<TwitText>

export type Twitt = {
  created_at: Date, // 'Wed Nov 15 16:30:08 +0000 2017',
  id: number, // 930835318353297400,
  id_str: string, // '930835318353297408',
  text: TwitText, // 'App Center: Build, Test, Distribute and Monitor Apps in the Cloud https://t.co/B6Zz91mVOk (https://t.co/8v255fBGXw)',
  truncated: boolean, // false,
  entities: Array<mixed>, // [Object],
  metadata: Array<mixed>, // [Object],
  source: UrlText, // '<a href="http://news.ycombinator.com" rel="nofollow">newsyc</a>',
  in_reply_to_status_id: mixed, // null,
  in_reply_to_status_id_str: mixed, // null,
  in_reply_to_user_id: mixed, // null,
  in_reply_to_user_id_str: mixed, // null,
  in_reply_to_screen_name: mixed, // null,
  user: Array<mixed>, // [Object],
  geo: mixed, // null,
  coordinates: mixed, // null,
  place: mixed, // null,
  contributors: mixed, // null,
  is_quote_status: boolean, // false,
  retweet_count: number, // 0,
  favorite_count: number, // 1,
  favorited: boolean, // false,
  retweeted: boolean, // false,
  possibly_sensitive: boolean, // false,
  lang: Lang // 'en'
}

export type TwitterSearchMetadata = { completed_in: 0.162,
  max_id: number, // 931148088961413100,
  max_id_str: string, // '931148088961413125',
  next_results: UrlText, // '?max_id=930952678078808063&q=learning%20to%20code%20-RT&count=100&include_entities=1',
  query: string, // 'learning+to+code+-RT',
  refresh_url: UrlText, // '?since_id=931148088961413125&q=learning%20to%20code%20-RT&include_entities=1',
  count: number, // 100,
  since_id: number, // 0,
  since_id_str: string, // '0'
}

export type TwitterResponse = {
  statuses: [Array<Twitt>],
  search_metadata: TwitterSearchMetadata,
}
