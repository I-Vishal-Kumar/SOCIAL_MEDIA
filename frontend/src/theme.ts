import { createTheme, ThemeOptions } from "@mui/material/styles";

const themeOption: ThemeOptions = {
    palette: {
        primary: {
            main: "#c084fc",
        },
        secondary: {
            main: "#eff6ff",
        },
    },
};
const theme = createTheme(themeOption);
export default theme;
