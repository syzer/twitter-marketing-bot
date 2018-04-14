// @flow
export type BayesClassifier = {
  trainAsync: (string, string) => string
}

export type Category = string

type TwitText = string
type UrlText = string
type Color = string
type Lang = 'en' | 'de'

export type Twitts = Array<TwitText>

export type User = {
  id: number, // 1926743677,
  id_str: string, // '1926743677',
  name: string, // 'Alain Frapolli',
  screen_name: string, // 'AlainFrapolli',
  location: string, // 'Zurich, Switzerland',
  description: string, // '',
  url: UrlText, // 'https://t.co/loio2bkLLU',
  entities: Array<mixed>, // [Object],
  protected: boolean, // false,
  followers_count: number, // 46,
  friends_count: number, // 288,
  listed_count: number, // 6,
  created_at: Date, // 'Wed Oct 02 12:25:28 +0000 2013',
  favourites_count: number, // 407,
  utc_offset: mixed, // null,
  time_zone: mixed, // null,
  geo_enabled: boolean, // false,
  verified: boolean, // false,
  statuses_count: number, // 165,
  lang: Lang, // 'en',
  contributors_enabled: boolean, // false,
  is_translator: boolean, // false,
  is_translation_enabled: boolean, // false,
  profile_background_color: Color, // 'FFFFFF',
  profile_background_image_url: UrlText, // 'http://pbs.twimg.com/profile_background_images/378800000126035460/YaQoCVF5.jpeg',
  profile_background_image_url_https: UrlText, // 'https://pbs.twimg.com/profile_background_images/378800000126035460/YaQoCVF5.jpeg',
  profile_background_tile: boolean, // false,
  profile_image_url: UrlText, // 'http://pbs.twimg.com/profile_images/378800000537851274/efbf709e4912060868824bc2b652b85a_normal.jpeg',
  profile_image_url_https: UrlText, // 'https://pbs.twimg.com/profile_images/378800000537851274/efbf709e4912060868824bc2b652b85a_normal.jpeg',
  profile_banner_url: UrlText, // 'https://pbs.twimg.com/profile_banners/1926743677/1399361677',
  profile_link_color: Color, // '2080E6',
  profile_sidebar_border_color: Color, // 'FFFFFF',
  profile_sidebar_fill_color: Color, // 'DDEEF6',
  profile_text_color: Color, // '333333',
  profile_use_background_image: boolean, // true,
  has_extended_profile: boolean, // false,
  default_profile: boolean, // false,
  default_profile_image: boolean, // false,
  following: boolean, // true,
  follow_request_sent: boolean, // false,
  notifications: boolean, // false,
  translator_type: string, // 'none'
}

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
  user: Array<User> | mixed, // [Object],
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

export type TwitterSearchMetadata = {
  completed_in: number, // 0.162,
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

export type UserHandle = string
