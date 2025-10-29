// @ts-check
import { defineConfig } from "astro/config";

import react from "@astrojs/react";
import mdx from "@astrojs/mdx";
import tailwindcss from "@tailwindcss/vite";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://ttymayor.com",
  integrations: [react({
    experimentalDisableStreaming: true,
  }), mdx(), sitemap({
    i18n: {
      defaultLocale: "zh-TW",
      locales: {
        "zh-TW": "zh-TW",
        en: "en",
      },
    },
  })],
  i18n: {
    defaultLocale: "zh-TW",
    locales: ["zh-TW", "en"],
    routing: {
      prefixDefaultLocale: false,
      redirectToDefaultLocale: true,
    },
  },

  vite: {
    plugins: [tailwindcss()],
  },
});
