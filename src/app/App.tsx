import React, { useCallback, useEffect } from "react";
import "./App.css";
import logo from "../assets/img/logo.png";
import { TodolistsList } from "../features/TodolistsList/TodolistsList";
import { ErrorSnackbar } from "../components/ErrorSnackbar/ErrorSnackbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  AppBar,
  Button,
  CircularProgress,
  Container,
  IconButton,
  LinearProgress,
  Toolbar,
} from "@mui/material";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { selectIsLoggedIn } from "../features/auth/auth.selectors";
import { selectAppStatus, selectIsInitialized } from "./app.selectors";
import { useSelector } from "react-redux";
import { logoutTC } from "../features/auth/auth.reducer";
import { initializeAppTC } from "./app.reducer";
import { Login } from "../features/auth/Login";

type PropsType = {
  demo?: boolean;
};

function App({ demo = false }: PropsType) {
  const status = useSelector(selectAppStatus);
  const isInitialized = useSelector(selectIsInitialized);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initializeAppTC());
  }, []);

  const logoutHandler = useCallback(() => {
    dispatch(logoutTC());
  }, []);

  if (!isInitialized) {
    return (
      <div
        style={{
          position: "fixed",
          top: "50%",
          textAlign: "center",
          width: "100%",
        }}
      >
        <CircularProgress />
      </div>
    );
  }

  return (
    <BrowserRouter>
      <div className="App">
        <ErrorSnackbar />
        <AppBar position="static">
          <Toolbar
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <IconButton edge="start" color="inherit" aria-label="menu">
              <img src={logo} alt="Logo" style={{ width: "50px" }} />
            </IconButton>
            {isLoggedIn && (
              <Button color="inherit" onClick={logoutHandler}>
                Log out
              </Button>
            )}
          </Toolbar>
          {status === "loading" && <LinearProgress />}
        </AppBar>
        <Container fixed>
          <Routes>
            <Route path={"/"} element={<TodolistsList demo={demo} />} />
            <Route path={"/login"} element={<Login />} />
          </Routes>
        </Container>
      </div>
    </BrowserRouter>
  );
}

export default App;
