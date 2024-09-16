import './App.css';
import CssBaseline from "@mui/material/CssBaseline";
import {ThemeProvider} from '@mui/material/styles';
import React from "react";
import {useSelector} from "react-redux";
import {RootState} from "./store";
import {getTheme} from "../common/theme";
import {Header} from "../Header";
import {Main} from "../Main";


type ThemeMode = 'dark' | 'light'

function App() {

    const themeMode = useSelector<RootState, ThemeMode>(state => state.app.themeMode)

    return (
        <ThemeProvider theme={getTheme(themeMode)}>
            <CssBaseline/>
                <Header/>
                <Main/>
        </ThemeProvider>
    );
}

export default App;
