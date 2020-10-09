# Translations

We use [Crowdin](htts://www.crowdin.com) to manage our translation. Our project repo is: https://crowdin.com/project/arasaac

## Add new strings to translate

We use english as the default language. New language strings in code should be extracted to a json file (app/translations/en.json) for Crowding service.

```
npm run extract-intl
git add app/translations/en.json
git commit -m "update translations"
git push
```

Once new translation file is pushed to GitHub it will get sync with Crowding service

## Download translations from Crowding

Crowding updates get syn with our branch l10n_master. We should review the changes and merge it with our master branch:

Step 1:

- From our project repo, bring in the changes and test.

```
git fetch origin
git checkout -b l10n_master origin/l10n_master
git merge master
```

If we get some conflicts we should normally get crowding changes:

git checkout --theirs app/translations/[locale].json

Step 2:

- Merge the changes and update on GitHub.

```
git checkout master
git merge --no-ff l10n_master
git push origin master
```
