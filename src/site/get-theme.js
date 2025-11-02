require("dotenv").config();
const axios = require("axios");
const fs = require("fs");
const crypto = require("crypto");
const {globSync} = require("glob");

const themeCommentRegex = /\/\*[\s\S]*?\*\//g;

function shouldRetryWithoutProxy(error) {
  const codes = new Set(["EPERM", "ECONNREFUSED", "EHOSTUNREACH", "ENETUNREACH", "ECONNRESET", "ETIMEDOUT"]);
  const code = error?.code || error?.errno || error?.cause?.code;
  return codes.has(code);
}

async function fetchThemeCSS(url) {
  const attempts = [
    { options: {} },
    { options: { proxy: false } },
  ];
  let lastError;
  for (const attempt of attempts) {
    try {
      return await axios.get(url, {
        timeout: 15000,
        responseType: "text",
        ...attempt.options,
      });
    } catch (error) {
      lastError = error;
      if (!shouldRetryWithoutProxy(error) || attempt.options.proxy === false) {
        break;
      }
    }
  }
  throw lastError;
}

async function getTheme() {
  let themeUrl = process.env.THEME;
  if (themeUrl) {
    //https://forum.obsidian.md/t/1-0-theme-migration-guide/42537
    //Not all themes with no legacy mark have a theme.css file, so we need to check for it
    try {
      await fetchThemeCSS(themeUrl);
    } catch {
      if (themeUrl.indexOf("theme.css") > -1) {
        themeUrl = themeUrl.replace("theme.css", "obsidian.css");
      } else if (themeUrl.indexOf("obsidian.css") > -1) {
        themeUrl = themeUrl.replace("obsidian.css", "theme.css");
      }
    }

    const res = await fetchThemeCSS(themeUrl);
    try {
      const existing = globSync("src/site/styles/_theme.*.css");
      existing.forEach((file) => {
        fs.rmSync(file);
      });
    } catch {}
    let skippedFirstComment = false;
    const data = res.data.replace(themeCommentRegex, (match) => {
      if (skippedFirstComment) {
        return "";
      } else {
        skippedFirstComment = true;
        return match;
      }
    });
    const hashSum = crypto.createHash("sha256");
    hashSum.update(data);
    const hex = hashSum.digest("hex");
    fs.writeFileSync(`src/site/styles/_theme.${hex.substring(0, 8)}.css`, data);
  }
}

getTheme();
