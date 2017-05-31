import { fromJS } from 'immutable'

export const initialState = fromJS({
  activity: {
    1: 'picaa',
    2: 'animation',
    3: 'software',
    4: 'araBoard',
    5: 'board',
    6: 'bingo',
    7: 'song',
    8: 'notebook',
    9: 'story',
    10: 'multimedia',
    11: 'domino',
    12: 'game',
    13: 'group',
    14: 'exercise',
    15: 'jClic',
    16: 'goose',
    17: 'book',
    18: 'image',
    19: 'video',
    20: 'pictodroidLite',
    21: 'digitalBoard',
    22: 'slide',
    23: 'protocol',
    24: 'routine',
    25: 'signalling',
    26: 'sequence',
    27: 'smartNotebook',
    28: 'tico',
    29: 'test',
    30: 'socialHistory',
    31: 'lim'
  },
  area: {
    1: 'visualdiscrimination',
    2: 'auditorydiscrimination',
    3: 'language',
    4: 'phonology',
    5: 'morphosyntax',
    6: 'semantics',
    7: 'pragmatics',
    8: 'reading',
    9: 'writing',
    10: 'literature',
    11: 'languages',
    12: 'math',
    13: 'numeration',
    14: 'basicOperations',
    15: 'problems',
    16: 'geometry',
    17: 'naturalSciences',
    18: 'socialSciences',
    19: 'music',
    20: 'art',
    21: 'physicalEducation',
    22: 'religion',
    23: 'health',
    24: 'leisure',
    25: 'signalling',
    26: 'selfawareness'
  },
  language: {
    da: 'Dansk',
    nl: 'Nederlands',
    en: 'English',
    fi: 'Suomi',
    fr: 'Français',
    de: 'Deutsch',
    hu: 'Magyar',
    it: 'Italiano',
    nb: 'Norsk',
    pt: 'Português',
    ro: 'Român',
    ru: 'Русский язык',
    es: 'Español',
    sv: 'svenska',
    tr: 'Türkçe',
    ara: 'جزائري',
    prs: 'درى',
    pes: ' فارسى',
    urd: 'اردو',
    zhs: '简体中文',
    zht: '繁體中文',
    bg: 'български',
    br: 'Brasileiro',
    ca: 'Català',
    va: 'Valencià',
    ga: 'Galego',
    eu: 'Euskal',
    pl: 'Polski'
  },
  license: {
    1: 'reuseMofified',
    2: 'reuse',
    3: 'nonCommercialModified',
    4: 'nonCommercial'
  },
  size: {
    1: 'large',
    2: 'medium',
    3: 'small'
  }
})

function activityReducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state
  }
}

export default activityReducer
