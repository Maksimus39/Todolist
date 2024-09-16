import {useDispatch} from "react-redux";
import {addTodolistAC} from "./model/todolists-reducer";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Unstable_Grid2";
import React from "react";
import {AddItemForm} from "./AddItemForm";
import {Todolists} from "./Todolists";

export const Main = () => {

    const dispatch = useDispatch()

    const addTodolist = (title: string) => {
        dispatch(addTodolistAC(title))
    }

    return (
        <div>
            <CssBaseline/>
            <AppBar position="static" sx={{mb: '30px'}}>

            </AppBar>
            <Container fixed>

                <Grid container sx={{mb: '30px'}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>

                <Grid container spacing={4}>
                    <Todolists/>
                </Grid>
            </Container>
        </div>
    )
}