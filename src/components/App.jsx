import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import ResetCss from "../styles/resetCss";
import GlobalStyle from "../styles/globalStyles";
import UserProvider from "../contexts/UserContext.jsx";
import BalanceProvider from "../contexts/BalanceContext.jsx";
import Login from "./Login.jsx";
import SignUp from "./SignUp.jsx";
import Home from "./Home.jsx";
import Alteration from "./resources/Alteration.jsx";

export default function App() {
  return (
    <>
      <ResetCss />
      <GlobalStyle />
      <Container>
        <UserProvider>
          <BalanceProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/cadastro" element={<SignUp />} />
                <Route path="/home" element={<Home />} />
                <Route
                  path="/novaentrada"
                  element={<Alteration mode="newEntry" />}
                />
                <Route
                  path="/novasaida"
                  element={<Alteration mode="newSpent" />}
                />
                <Route
                  path="/editarentrada"
                  element={<Alteration mode="alterEntry" />}
                />
                <Route
                  path="/editarsaida"
                  element={<Alteration mode="alterSpent" />}
                />
              </Routes>
            </BrowserRouter>
          </BalanceProvider>
        </UserProvider>
      </Container>
    </>
  );
}

const Container = styled.div`
  height: 100vh;
  width: 100%;
`;
