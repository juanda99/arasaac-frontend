// need translatos: true -> We need translators in your language. Contact us if you want to collaborate with ARASAAC project.

const languages = [
  {
    code: 'es',
    text: 'Español',
    translated: true,
    needTranslators: false,
  },
  {
    code: 'en',
    text: 'English',
    translated: true,
    needTranslators: false,
  },
  // AR
  // FEB: web 87%, admin 70%, pictos 2%
  // MARCH: web 95%,  admin: 96%  pictos: 2.5%
  // APRIL:  =
  // SEP: web 99%, admin: 96%,  pictos: 2,6%
  // DIC: web 99%, admin: 96%,  pictos: 2,8%
  {
    code: 'ar',
    text: 'عربى',
    translated: false,
    needTranslators: false,
  },
  // AN
  // FEB: web 90%,  admin 100%, pictos 0%
  // MARCH: web 99%,  admin 99%, pictos 26%
  // APRI: web 99%,  admin 99%, pictos 53%
  // JUNE: web 99%,  admin 99%, pictos 72%
  // SEP: web 98%,  admin 99%, pictos 88%
  // DIC: web 99%, admin: 99%,  pictos: 100%
  {
    code: 'an',
    text: 'Aragonés',
    translated: false,
    needTranslators: false,
  },
  // BG
  // FEB: web 100%, admin 100%, pictos  3%
  // MARCH: web 99%, admin 100%, pictos 10.5%
  // MARCH: web 100%, admin 100%, pictos 13%
  // JUNE: web 100%, admin 100%, pictos 21%
  // SEP: web 99%,  admin 99%, pictos 23%
  // DEC: web 99%,  admin 99%, pictos 59%
  {
    code: 'bg',
    text: 'български',
    translated: false,
    needTranslators: true,
  },
  // BR
  // FEB: web 98%, admin 96%, pictos 0%
  // MARCH: // web 99%, admin 99%, pictos 28%
  // APRIL:  web 99%, admin 99%, pictos 100%
  // SEP: web 99%,  admin 99%, pictos 99%
  // DEC: web 99%,  admin 99%, pictos 97%
  {
    code: 'br',
    text: 'Português do Brasil',
    translated: true,
    needTranslators: false,
  },
  // CA
  // FEB: web 100%, admin 100%, pictos 95%
  // MARCH: web 99%, admin 99%, pictos 99%
  // APRIL: web 99%, admin 99%, pictos 99%
  // SEP: =
  // DEC: =
  {
    code: 'ca',
    text: 'Català',
    translated: true,
    needTranslators: false,
  },
  // DE
  // FEB: web 44%, admin 0%, pictograms 0%
  // MARCH: // web 77%, admin 90%, pictograms 0%
  // APRIL: // web 77%, admin 90%, pictograms 0%
  // SEP:  =
  // DEC: web 99%,  admin 89%, pictos 25%
  {
    code: 'de',
    text: 'Deutsche',
    translated: false,
    needTranslators: false,
  },
  // ET - Estonian
  // FEB: web 56%, admin 100%, pictos 16%
  // MARCH: web 98%, admin 99%, pictos 19%
  // APRIL: web 97%, admin 99%, pictos 19%
  // SEP: web 96%,  admin 99%, pictos 19%
  // DEC: web 95%,  admin 99%, pictos 19%
  {
    code: 'et',
    text: 'Eestlane',
    translated: false,
    needTranslators: true,
  },
  // EU
  // FEB: web 92%, admin 99%, pictos 65%
  // MARCH: web 95%, admin 99%, pictos 77%
  // APRIL: web 97%, admin 99%, pictos 83%
  // JUNE: web 97%, admin 99%, pictos 85%
  // SEP: =
  // DEC: =
  {
    code: 'eu',
    text: 'Euskal',
    translated: false,
    needTranslators: false,
  },
  // FA - PERSIAN:
  // MARCH: web 25%, admin 0%, pictos 0%
  // APRIL: web 25%, admin 0%, pictos 0%
  {
    code: 'fa',
    text: 'فارسی',
    translated: false,
    needTranslators: true,
  },
  // FR
  // FEB: web 98%, admin 100%, pictos 1%
  // MARCH: web 99%, admin 99%, pictos 8.6%
  // APRIL: web 99%, admin 99%, pictos 23%
  // JUNE: web 99%, admin 99%, pictos 33%
  // SEP: web 99%,  admin 100%, pictos 99%
  // DEC: =
  {
    code: 'fr',
    text: 'Français',
    translated: true,
    needTranslators: false,
  },
  // GL
  // FEB: web 98%, admin 100%, pictos 85%
  // MARCH: web 99%, admin 99%, pictos 90%
  // APRIL: =
  // JUN: =
  // DEC: web 100%, admin 100%, pictos 89%
  {
    code: 'gl',
    text: 'Galego',
    translated: false,
    needTranslators: false,
  },
  // HE
  // FEB: web 98%, admin 99%, pictos 95%
  // MARCH: web 99%, admin 100%, pictos 99%
  // APRIL: =
  // SEP: =
  // DEC: web 100%, admin 100%, pictos 100%
  {
    code: 'he',
    text: 'עברי', // hebreo
    translated: true,
    needTranslators: false,
  },
  // HR
  // FEB: web 39%, admin 45%, pictos 1%
  // MARCH: web 47%, admin 46%, pictos 1%
  // APRIL: =
  // JUNE: web 96%, admin 99%, pictos 30%
  // DEC: web 97%, admin 99%, pictos 54%
  {
    code: 'hr',
    text: 'Hrvatski',
    translated: false,
    needTranslators: true,
  },
  // HU
  // FEB: web 90%, admin 99%, pictos 41%
  // MARCH: web 89%, admin 99%, pictos 47%
  // APRIL: web 99%, admin 100%, pictos 49%
  // JUNE: =
  // DEC: web 97%, admin 100%, pictos 53%
  {
    code: 'hu',
    text: 'Magyar',
    translated: false,
    needTranslators: true,
  },
  // IT
  // FEB: web 98%,  admin 99%, pictos 44%
  // MARCH: web 99%,  admin 99%, pictos 73%
  // APRIL: web 99%,  admin 99%, pictos 88%
  // JUNE: web 100%,  admin 100%, pictos 100%
  // DEC: web 100%, admin 100%, pictos 97%
  {
    code: 'it',
    text: 'Italiano',
    translated: true,
    needTranslators: false,
  },
  // KO
  // DEC: web 96%, admin 70%, pictos 0%
  {
    code: 'ko',
    text: '한국어',
    translated: false,
    needTranslators: true,
  },
  // LT - Lithuanian
  // DEC:
  {
    code: 'lt',
    text: 'Lietuvių',
    translated: false,
    needTranslators: true,
  },
  // -LV - Letón
  // first on March 2022
  {
    code: 'lv',
    text: 'Latviski',
    translated: false,
    needTranslators: true,
  },
  // MK
  // FEB: web 100%, admin 100%, pictos 18%
  // MARCH: web 99%, admin 100%, pictos 33%
  // APRIL: =
  // JUNE: =
  // DEC: =
  {
    code: 'mk',
    text: 'Македонски',
    translated: false,
    needTranslators: false,
  },
  // EL
  // FEB: web 50%, admin 0%, pictos 0%
  // MARCH: web 57%, admin 47%, pictos 0%
  // APRIL: =
  // DEC: =
  {
    code: 'el',
    text: 'Ελληνικά',
    translated: false,
    needTranslators: true,
  },
  // NL
  // FEB: web 7%,  admin 0%, pictos 0%
  // MARCH: web 11%, admin 45%, pictos 0%
  // APRIL: web 99%, admin 99%, pictos 0%
  // JUNE: web 100%, admin 100%, pictos 2%
  // DEC: web 100%, admin 100%, pictos 8%
  {
    code: 'nl',
    text: 'Nederlands',
    translated: false,
    needTranslators: false,
  },
  // PL
  // FEB: web 97%, admin 99%, pictos 99%
  // MARCH: web 99%, admin 100%, pictos 99%
  // APRIL: =
  // DEC: =
  {
    code: 'pl',
    text: 'Polski',
    translated: true,
    needTranslators: false,
  },
  // PT
  // FEB:  web 98%, admin 96%, pictos 99%
  // MARCH: web 99%, admin 99%, pictos 99%
  // APRIL: =
  // DEC: web 100%, admin 100%, pictos 96%
  {
    code: 'pt',
    text: 'Português',
    translated: true,
    needTranslators: false,
  },
  // RO
  // FEB:  web 37%, admin 6%, pictos 0%
  // MARCH: web 37%, admin 6%, pictos 0%
  // APRIL: web 47%, admin 6%, pictos 19%
  // JUNE: web 47%, admin 6%, pictos 21%
  // DEC: =
  {
    code: 'ro',
    text: 'Română',
    translated: false,
    needTranslators: true,
  },
  // RU
  // FEB:  web 95%, admin 95%, pictos 17%
  // MARCH: web 99%, admin 99%, pictos 21%
  // APRIL: =
  // JUNE: web 99%, admin 99%, pictos 25%
  // SEP: web 99%, admin 99%, pictos 27%
  // DEC: web 100%, admin 99%, pictos 29%
  {
    code: 'ru',
    text: 'Pусский',
    translated: false,
    needTranslators: false,
  },
  // SK
  // FEB:  web 0%, admin 0%, pictos  0%
  // MARCH: web 0%, admin 0%, pictos  0%
  // APRIL: =
  // JUNE: web 19%, admin 0%, pictos  0%
  // DEC: =
  {
    code: 'sk',
    text: 'Slovenský',
    translated: false,
    needTranslators: true,
  },
  // SQ -  ALBANIAN
  // FEB: web 98%, admin 95%, pictos 0%
  // MARCH: web 98%, admin 95%, pictos 0%
  // APRIL: =
  // DEC: web 94%, admin 94%, pictos 0%
  {
    code: 'sq',
    text: 'Shqip',
    translated: false,
    needTranslators: true,
  },
  // SV - SWEDISH
  // FEB:  web 0%, admin 0%, pictos  0%
  // MARCH: web 0%, admin 0%, pictos  0%
  // APRIL: =

  // SR  - SERBIAN
  // FEB:  web 0%, admin 0%, pictos  0%
  // MARCH: web 19%, admin 0%, pictos  0%
  // APRIL: web 18%, admin 0%, pictos 0%
  // SEP: web 99%, admin 71%, pictos 0%
  // DEC: =
  {
    code: 'sr',
    text: 'Српски',
    translated: false,
    needTranslators: true,
  },
  // Ukranian

  {
    code: 'uk',
    text: 'Yкраїнська',
    translated: false,
    needTranslators: true,
  },
  // VAL
  // FEB:  web 44%, admin  84%, pictos 96%
  // MARCH: web 77%, admin 95%, pictos  95%
  // APRIL:  =
  // DEC: web 74%, admin 95%, pictos 90%
  {
    code: 'val',
    text: 'Valencia',
    translated: false,
    needTranslators: true,
  },
  // ZH
  // FEB:  web 15%, admin 0%, pictos  0%
  // MARCH: web 14%, admin 0%, pictos  0%
  // APRIL: =
  // DEC: web 31%, admin 0%, pictos 0%
  {
    code: 'zh',
    text: '简体中文）',
    translated: false,
    needTranslators: true,
  },
]

export default languages
