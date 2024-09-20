import {getTheme} from "../common/theme/theme";
import CssBaseline from "@mui/material/CssBaseline";
import React from "react";
import {Header} from "../common/components/Header";
import {Main} from "./Main";
import {ThemeProvider} from "@mui/material";
import {useAppSelector} from "../common/hooks/useAppSelector";
import {selectThemeMode} from "./appSelectors";


function App() {

    const themeMode = useAppSelector(selectThemeMode)

    return (
        <ThemeProvider theme={getTheme(themeMode)}>
            <CssBaseline/>
            <Header/>
            <Main/>
        </ThemeProvider>
    );
}

export default App;
