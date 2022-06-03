interface Theme {
  "--primary": string;
  "--primary-two": string;
  "--secondary": string;
  "--secondary-two": string,
  "--text-color": string;
  "--text-color-two": string,
  "--ul-bg-color": string;
  "--white": string;
  "--glass": string;
  "--soft-dark": string;
}
const light: Theme = {
  "--primary": "#fdfdfd",
  "--primary-two": "#0e0f18",
  "--secondary": "#229774",
  "--secondary-two": "red",
  "--text-color":"#0e0f18",
  "--text-color-two": "#fdfdfd",
  "--ul-bg-color": "#0e0f18",
  "--white": "#f4f5f5",
  "--glass": "rgba(255, 255, 255, 0.05)",
  "--soft-dark": "#ebebeb",
};
const dark: Theme = {
  "--primary": "#0e0f18",
  "--primary-two": "#fdfdfd",
  "--secondary": "#229774",
  "--secondary-two": "red",
  "--text-color":"#fdfdfd",
  "--text-color-two": "#0e0f18",
  "--ul-bg-color": "#fdfdfd",
  "--white": "#f4f5f5",
  "--glass": "transparent",
  "--soft-dark": "rgb(35, 37, 39)",
};
const darkTrue: Theme = {
  "--primary": "#050505",
  "--primary-two": "#050505",
  "--secondary": "#229774",
  "--secondary-two": "red",
  "--text-color":"#fdfdfd",
  "--text-color-two": "#fdfdfd",
  "--ul-bg-color": "#020202",
  "--white": "#f4f5f5",
  "--glass": "rgba(255, 255, 255, 0.01)",
  "--soft-dark": "#222222",
};

let theme: number = 1;
const root = document.querySelector(":root") as HTMLElement;

export const changeTheme = () => {
  let loopTheme: any;
  if (theme === 1) {
    loopTheme = dark
    theme = 2
  } else if(theme === 2) {
    loopTheme = darkTrue;
    theme = 3;
  } else {
    loopTheme = light;
    theme = 1;
  }
  for(const key in loopTheme) {
    root.style.setProperty(`${key}`, loopTheme[key])
  }
  
}

