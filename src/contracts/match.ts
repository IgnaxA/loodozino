export interface IMatch extends Document {
  match_ident: String;
  board_ident: String;
  user_count: Number;
  users: Array<String>;
  actions: Array<Action>;
  match_results: Array<MatchResult>;
}

export interface Action {
  user_ident: String,
  action_type: String,
  bet_size: Number,
}

export interface MatchResult {
  user_ident: String;
  chips_difference: Number;
}