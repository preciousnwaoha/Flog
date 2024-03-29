const light = {
    "--primary": "#ffffff",
    "--primary-two": "#0e0f18",
    "--secondary": "#229774",
    "--secondary-two": "red",
    "--text-dark": "#0e0f18",
    "--text-light": "#ffffff",
    "--ul-bg-color": "#1c1c21",
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
    "--white": "#f4f5f5",
    "--glass": "rgba(255, 255, 255, 0.01)",
    "--soft-dark": "#222222",
};
let theme = 1;
const root = document.querySelector(":root");
export const changeTheme = () => {
    let loopTheme;
    if (theme === 1) {
        loopTheme = dark;
        theme = 2;
    }
    else if (theme === 2) {
        loopTheme = darkTrue;
        theme = 3;
    }
    else {
        loopTheme = light;
        theme = 1;
    }
    for (const key in loopTheme) {
        root.style.setProperty(`${key}`, loopTheme[key]);
    }
};
