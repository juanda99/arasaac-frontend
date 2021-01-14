// status 0, no message
// status 1 warning: 'AAC symbols are just only partial translated to your language. You should change your search language from the advanced options or from your user profile to improve searches.'
// status 2 error: 'AAC symbols aren't fully translated to your language. Change your default search language from the advanced options or from your user profile to improve searches.'
// need translatos: true -> We need translators in your language. Contact us if you want to collaborate with ARASAAC project.

const languages = [
  {
    code: 'es',
    text: 'Español',
    translated: true,  // web 100%,  admin 100%, pictos 100%
    needTranslators: false
  },
  {
    code: 'en',
    text: 'English',
    translated: true,
    needTranslators: false
  },
  {
    code: 'ar',
    text: 'عربى',
    translated: false, // web 87%, admin 70%, pictos 2%
    needTranslators: false
  },
  {
    code: 'an',
    text: 'Aragonés',
    translated: false, // web 90%,  admin 100%, pictos 0%
    needTranslators: false
  },
  {
    code: 'bg',
    text: 'български',
    translated: false, // web 100%, admin 100%, pictos  3%
    needTranslators: true
  },
  {
    code: 'br',
    text: 'Português do Brasil',
    translated: false, // web 98%, admin 96%, pictos 0%
    needTranslators: true
  },
  {
    code: 'ca',
    text: 'Català',
    translated: true, // web 100%, admin 100%, pictos 95%
    needTranslators: false
  }, 
  {
    code: 'de',
    text: 'Deutsche',
    translated: false, // web 44%, admin 0%, pictograms 0%
    needTranslators: true
  },
  // {
  //   code: 'ess',
  //   text: 'Estonio',
  //   translated: 2, // web 56%, admin 100%, pictos 16%
  //   needTranslators: false
  // },
  {
    code: 'eu',
    text: 'Euskal',
    translated: false, // web 92%, admin 99%, pictos 65%
    needTranslators: false
  },
  {
    code: 'fr',
    text: 'Français',
    translated: false, // web 98%, admin 100%, pictos 1%
    needTranslators: true
  },
  {
    code: 'gl',
    text: 'Galego',
    translated: true, // web 98%, admin 100%, pictos 85%
    needTranslators: false
  },
  {
    code: 'he',
    text: 'עברי', // hebreo
    translated: true, // web 98%, admin 99%, pictos 95%
    needTranslators: false
  },
  {
    code: 'hr',
    text: 'Hrvatski',
    translated: false, // web 39%, addmin 45%, pictos 1%
    needTranslators: true
  },
  {
    code: 'hu',
    text: 'Magyar',
    translated: false, // web 90%, admin 99%, pictos 41%
    needTranslators: true
  },
  {
    code: 'it',
    text: 'Italiano',
    translated: false, // web 98%,  admin 99%, pictos 44%
    needTranslators: false
  },
  {
    code: 'mk',
    text: 'Македонски',
    translated: false, // web 100%, admin 100%, pictos 18%
    needTranslators: false
  },
  {
    code: 'el',
    text: 'Ελληνικά',
    translated: false, // web 50%, admin 0%, pictos 0%
    needTranslators: true
  },
  {
    code: 'nl',
    text: 'Nederlands',
    translated: false, // web 7%,  admin 0%, pictos 0%
    needTranslators: true
  },
  {
    code: 'pl',
    text: 'Polski',
    translated: true, // web 97%, admin 99%, pictos 99%
    needTranslators: false
  },
  {
    code: 'pt',
    text: 'Português',
    translated: true, // web 98%, admin 96%, pictos 99%
    needTranslators: false
  },
  {
    code: 'ro',
    text: 'Română',
    translated: false, // web 37%, admin 6%, pictos 0%
    needTranslators: true
  },
  {
    code: 'ru',
    text: 'Pусский',
    translated: false, // web 95%, admin 95%, pictos 17%
    needTranslators: false
  },
  {
    code: 'sk',
    text: 'Slovenský',
    translated: false, // web 0%, admin 0%, pictos  0%
    needTranslators: true
  },
  {
    code: 'sq',
    text: 'Shqip',
    status: false, // web 98%, admin 95%, pictos 0%
    needTranslators: true
  },
  {
    code: 'val',
    text: 'Valencia',
    status: false, // web 44%, admin  84%, pictos 96%
    needTranslators: true
  },
  {
    code: 'zh',
    text: '简体中文）',
    status: 2, // web 15%,  admin 0%, pictos 0%
    needTranslators: true
  }
]

export default languages
