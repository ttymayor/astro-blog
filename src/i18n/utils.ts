import { ui, defaultLang, type UIKeys } from "./ui";

export function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.split("/");
  if (lang in ui) return lang as keyof typeof ui;
  return defaultLang;
}

export function useTranslations(lang: keyof typeof ui) {
  return function t(key: UIKeys) {
    return ui[lang][key] || ui[defaultLang][key];
  };
}

export function getLocalizedPath(path: string, lang: keyof typeof ui) {
  if (lang === defaultLang) {
    return path;
  }
  return `/${lang}${path}`;
}

export function getCurrentLocale(url: URL): keyof typeof ui {
  return getLangFromUrl(url);
}

