// @ts-check
import { defineConfig } from "astro/config";

import react from "@astrojs/react";
import mdx from "@astrojs/mdx";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  integrations: [
    react({
      experimentalDisableStreaming: true,
    }),
    mdx(),
  ],
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
