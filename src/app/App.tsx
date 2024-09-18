import {getTheme} from "../common/theme/theme";
import CssBaseline from "@mui/material/CssBaseline";
import React from "react";
import {Header} from "../common/components/Header";
import {Main} from "./Main";
import {ThemeProvider} from "@mui/material";
import {useAppSelector} from "../common/hooks/useAppSelector";


function App() {

    const themeMode = useAppSelector(state => state.app.themeMode)

    return (
        <ThemeProvider theme={getTheme(themeMode)}>
            <CssBaseline/>
                <Header/>
                <Main/>
        </ThemeProvider>
    );
}

export default App;
