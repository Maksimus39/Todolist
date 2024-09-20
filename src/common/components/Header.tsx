import {changeThemeAC} from "../../app/app-reducer";
import {getTheme} from "../theme/theme";
import AppBar from "@mui/material/AppBar/AppBar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Switch from "@mui/material/Switch";
import Toolbar from "@mui/material/Toolbar";
import React from "react";
import {MenuButton} from "./MenuButton";
import {useAppDispatch} from "../hooks/useAppDispatch";
import {useAppSelector} from "../hooks/useAppSelector";
import {selectThemeMode} from "../../app/appSelectors";


export const Header = () => {
    const themeMode = useAppSelector(selectThemeMode)

    const dispatch = useAppDispatch()

    const theme = getTheme(themeMode)

    const changeModeHandler = () => {
        const newThemeMode = themeMode === 'light' ? 'dark' : 'light';
        dispatch(changeThemeAC({ themeMode: newThemeMode }));
    }

    return (
        <AppBar position="static" sx={{ mb: '30px' }}>
            <Toolbar sx={{display: 'flex', justifyContent: 'space-between'}}>
                <IconButton color="inherit">
                    <MenuIcon/>
                </IconButton>
                <div>
                    <MenuButton>Login</MenuButton>
                    <MenuButton>Logout</MenuButton>
                    <MenuButton background={theme.palette.primary.dark}>Faq</MenuButton>
                    <Switch color={'default'} onChange={changeModeHandler}/>
                </div>
            </Toolbar>
        </AppBar>
    )
}