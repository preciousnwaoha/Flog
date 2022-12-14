"use strict";
const light = {
    "--primary": "#ffffff",
    "--primary-two": "#0e0f18",
    "--secondary": "#229774",
    "--secondary-two": "red",
    "--text-dark": "#0e0f18",
    "--text-light": "#ffffff",
    "--ul-bg-color": "#1c1c21",
    "--theme-color": "#0e0f18",
    "--white": "#f4f5f5",
    "--glass": "rgba(255, 255, 255, 0.05)",
    "--soft-dark": "#ebebeb",
};
const dark = {
    "--primary": "#0e0f18",
    "--primary-two": "#f1f1f1",
    "--secondary": "#229774",
    "--secondary-two": "red",
    "--text-dark": "#f1f1f1",
    "--text-light": "#0e0f18",
    "--ul-bg-color": "#f1f1f1",
    "--theme-color": "#ffffff",
    "--white": "#f4f5f5",
    "--glass": "transparent",
    "--soft-dark": "rgb(35, 37, 39)",
};
const darkTrue = {
    "--primary": "#1a1a1a",
    "--primary-two": "#121212",
    "--secondary": "#229774",
    "--secondary-two": "red",
    "--text-light": "#ffffff",
    "--text-dark": "#ffffff",
    "--ul-bg-color": "#121212",
    "--theme-color": "#ffffff",
    "--white": "#f4f5f5",
    "--glass": "rgba(255, 255, 255, 0.01)",
    "--soft-dark": "#222222",
};
// Theme
const themeElement = document.querySelector(".theme");
const getThemeFromLocalStorage = () => {
    if (localStorage.getItem("fin-log-theme")) {
        const themeInJSON = localStorage.getItem("fin-log-theme");
        const theme = JSON.parse(themeInJSON);
        return theme;
    }
    localStorage.setItem("fin-log-theme", JSON.stringify(1));
    return 1;
};
let theme = getThemeFromLocalStorage();
const root = document.querySelector(":root");
const setTheme = () => {
    let loopTheme;
    if (theme === 1) {
        loopTheme = light;
    }
    else if (theme === 2) {
        loopTheme = dark;
    }
    else if (theme === 3) {
        loopTheme = darkTrue;
    }
    else {
        loopTheme = light;
    }
    for (const key in loopTheme) {
        root.style.setProperty(`${key}`, loopTheme[key]);
    }
};
setTheme();
const nextTheme = () => {
    if (theme < 3) {
        theme += 1;
        localStorage.setItem("fin-log-theme", JSON.stringify(theme));
    }
    else {
        theme = 1,
            localStorage.setItem("fin-log-theme", JSON.stringify(theme));
    }
    setTheme();
};
themeElement.addEventListener("click", nextTheme);
