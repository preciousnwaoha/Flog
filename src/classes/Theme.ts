interface Theme {
  "--primary": string;
  "--primary-two": string;
  "--secondary": string;
  "--secondary-two": string,
  "--white": string;
  "--glass": string;
  "--soft-dark": string;
}
const light: Theme = {
  "--primary": "#f3f3f3",
  "--primary-two": "#0e0f18",
  "--secondary": "#229774",
  "--secondary-two": "red",
  "--white": "#f4f5f5",
  "--glass": "rgba(255, 255, 255, 0.05)",
  "--soft-dark": "#bbbbbb",
};
const dark: Theme = {
  "--primary": "#0e0f18",
  "--primary-two": "#f3f3f3",
  "--secondary": "#229774",
  "--secondary-two": "red",
  "--white": "#f4f5f5",
  "--glass": "transparent",
  "--soft-dark": "rgb(35, 37, 39)",
};

let theme = "light"
const root = document.querySelector(":root") as HTMLElement;

export const changeTheme = () => {
  let loopTheme: any;
  if (theme === "light") {
    loopTheme = dark
    theme = "dark"
  } else {
    loopTheme = light;
    theme = "light";
  }
  for(const key in loopTheme) {
    root.style.setProperty(`${key}`, loopTheme[key])
  }
  
}

