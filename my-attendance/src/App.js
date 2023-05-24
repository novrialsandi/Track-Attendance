import "./App.css";
import { Routes } from "react-router-dom";
import routes from "./routes/Routes";
import { useEffect, useState } from "react";
import { Center, Spinner } from "@chakra-ui/react";

function App(props) {
  return (
    <>
      {props.isLoading ? (
        <Center h={"100vh"}>
          <Spinner />
        </Center>
      ) : (
        <Routes>{routes.map((val) => val)}</Routes>
      )}
    </>
  );
}

export default App;
