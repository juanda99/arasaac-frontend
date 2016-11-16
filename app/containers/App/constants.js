/*
 * AppConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

// export const LOAD_REPOS = 'boilerplate/App/LOAD_REPOS';
// export const LOAD_REPOS_SUCCESS = 'boilerplate/App/LOAD_REPOS_SUCCESS';
// export const LOAD_REPOS_ERROR = 'boilerplate/App/LOAD_REPOS_ERROR';
export const DEFAULT_LOCALE = 'en'
export const INITIAL_LAYOUT = 'modules'
export const PICTOGRAMS_LAYOUT = 'PICTOGRAMS_LAYOUT'

export const CHANGE_PICTOGRAMS_KEYWORD = 'CHANGE_PICTOGRAMS_KEYWORD'

export const PICTOGRAMS_REQUEST = 'PICTOGRAMS_REQUEST'
export const PICTOGRAMS_SUCCESS = 'PICTOGRAMS_SUCCESS'
export const PICTOGRAMS_FAILURE = 'PICTOGRAMS_FAILURE'

export const LOCALE_CHANGE = 'LOCALE_CHANGE'

export const KEYWORDS_REQUEST = 'KEYWORDS_REQUEST'
export const KEYWORDS_SUCCESS = 'KEYWORDS_SUCCESS'
export const KEYWORDS_FAILURE = 'KEYWORDS_FAILURE'

export const SHOW_FILTER = 'SHOW_FILTER'
export const TOGGLE_FILTER = 'TOGGLE_FILTER'
