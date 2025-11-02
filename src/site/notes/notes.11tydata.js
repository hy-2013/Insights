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
      return meta ? meta.permalink : data.permalink;
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
