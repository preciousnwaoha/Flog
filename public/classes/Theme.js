const light = {
    "--primary": "#f3f3f3",
    "--primary-two": "#0e0f18",
    "--secondary": "#229774",
    "--white": "#f4f5f5",
    "--glass": "rgba(255, 255, 255, 0.05)",
    "--soft-dark": "bbbbbb",
};
const dark = {
    "--primary": "#0e0f18",
    "--primary-two": "#f3f3f3",
    "--secondary": "#229774",
    "--white": "#f4f5f5",
    "--glass": "transparent",
    "--soft-dark": "rgb(35, 37, 39)",
};
let theme = "light";
const root = document.querySelector(":root");
export const changeTheme = () => {
    let loopTheme;
    if (theme === "light") {
        loopTheme = dark;
        theme = "dark";
    }
    else {
        loopTheme = light;
        theme = "light";
    }
    for (const key in loopTheme) {
        root.style.setProperty(`${key}`, loopTheme[key]);
    }
};
