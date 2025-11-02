require("dotenv").config();
const settings = require("../../helpers/constants");

const { registerFromData } = require("../../helpers/articleId");

const allSettings = settings.ALL_NOTE_SETTINGS;

module.exports = {
  eleventyComputed: {
    layout: (data) => {
      if (data.tags.indexOf("gardenEntry") != -1) {
        return "layouts/index.njk";
      }
      return "layouts/note.njk";
    },
    articleId: (data) => {
      const meta = registerFromData(data);
      return meta ? meta.articleId : undefined;
    },
    permalink: (data) => {
      const meta = registerFromData(data);
      if (process.env.DEBUG_PERMALINKS === "true") {
        console.log("COMPUTED PERMALINK", data.page?.filePathStem, {
          meta,
          tags: data.tags,
          rawTags: data.page?.data?.tags,
        });
      }
      if (meta) {
        if (meta.isHome) {
          return "index.html";
        }
        return `${meta.articleId}/index.html`;
      }
      if (typeof data.permalink === "string") {
        return data.permalink;
      }
      return data.page?.url;
    },
    settings: (data) => {
      const noteSettings = {};
      allSettings.forEach((setting) => {
        let noteSetting = data[setting];
        let globalSetting = process.env[setting];

        let settingValue =
          noteSetting || (globalSetting === "true" && noteSetting !== false);
        noteSettings[setting] = settingValue;
      });
      return noteSettings;
    },
  },
};
