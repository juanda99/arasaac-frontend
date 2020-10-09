import {
  CHANGE_LOCALE,
  START_TRANSLATION,
  STOP_TRANSLATION,
  changeLocale,
  startTranslation,
  stopTranslation,
} from "../actions";

describe("LanguageProvider actions", () => {
  it("changeLocale action", () => {
    expect(changeLocale("es")).toEqual({ type: CHANGE_LOCALE, locale: "es" });
  });
  it("startTranslation action", () => {
    expect(startTranslation()).toEqual({ type: START_TRANSLATION });
  });
  it("stopTranslation action", () => {
    expect(stopTranslation()).toEqual({ type: STOP_TRANSLATION });
  });
});
