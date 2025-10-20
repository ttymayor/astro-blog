export const languages = {
  "zh-TW": "繁體中文",
  en: "English",
};

export const defaultLang = "zh-TW";

export const ui = {
  "zh-TW": {
    "nav.about": "關於",
    "nav.posts": "文章",
    "nav.contact": "聯絡我",
    "site.title": "市長 / tantuyu 的技術網誌",
    "site.description": "從競程到網頁開發的那個人",
    "menu.title": "選單",
    "theme.toggle": "切換主題",
    "theme.current.auto": "自動",
    "theme.current.light": "淺色",
    "theme.current.dark": "深色",
  },
  en: {
    "nav.about": "About",
    "nav.posts": "Posts",
    "nav.contact": "Contact",
    "site.title": "tantuyu's Tech Blog",
    "site.description": "From competitive programming to web development",
    "menu.title": "Menu",
    "theme.toggle": "Toggle theme",
    "theme.current.auto": "Auto",
    "theme.current.light": "Light",
    "theme.current.dark": "Dark",
  },
} as const;

export type UIKeys = keyof (typeof ui)[typeof defaultLang];

