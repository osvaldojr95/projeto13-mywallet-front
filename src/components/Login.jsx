import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { useUser } from "../contexts/UserContext";
import Input from "./resources/Input.jsx";
import Button from "./resources/Button.jsx";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setUserInfo } = useUser();

  const showError = () => {
    if (!error) {
      return <></>;
    }

    let text;
    switch (parseInt(error.response.status)) {
      case 422:
        text = "Dados insuficientes";
        break;

      case 404:
        text = "Usuário não encontrado";
        break;

      case 401:
        text = "Senha incorreta";
        break;

      case 500:
        text = "Erro inesperado";
        break;

      default:
        text = "Erro inesperado";
        break;
    }
    return <Aviso>{text}</Aviso>;
  };

  const login = async (e) => {
    e.preventDefault();
    setError("");
    const URL = "https://projeto13-backend.herokuapp.com/sign-in";
    const obj = { password };
    const config = {
      headers: { User: email },
    };
    try {
      const response = await axios.post(URL, obj, config);
      const { data } = response;
      const { name, token } = data;
      setUserInfo({ name, token });
      localStorage.setItem("userInfo", JSON.stringify({ name, token }));
      navigate("/home");
    } catch (err) {
      setError(err);
    }
  };

  useEffect(() => {
    const verifyLogin = async () => {
      const infoSerializado = localStorage.getItem("userInfo");
      if (infoSerializado) {
        const user = JSON.parse(infoSerializado);
        setUserInfo(user);
        navigate("/home");
      } else {
        localStorage.removeItem("userInfo");
      }
    };
    verifyLogin();
  }, []);

  return (
    <Container>
      <Logo>MyWallet</Logo>
      <form>
        <Input
          type="input"
          value={email}
          setValue={setEmail}
          placeholder="E-mail"
        />
        <Input
          type="password"
          value={password}
          setValue={setPassword}
          placeholder="Senha"
        />
        {showError()}
        <Button type="submit" callback={login}>
          Entrar
        </Button>
      </form>
      <Cadastro
        onClick={() => {
          navigate("/cadastro");
        }}
      >
        Primeira vez? Cadastre-se!
      </Cadastro>
    </Container>
  );
}

const Container = styled.div`
  height: 100vh;
  width: 100%;
  padding: 0 40px;
  background: var(--background);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  form {
    width: 100%;
  }
`;

const Logo = styled.h1`
  font-family: "Saira Stencil One", cursive;
  font-size: 32px;
  color: var(--white);
  margin-bottom: 30px;
`;

const Aviso = styled.h5`
  width: 100%;
  font-family: "Raleway";
  font-size: 15px;
  font-weight: 700;
  color: var(--red);
  margin-bottom: 20px;
`;

const Cadastro = styled.h4`
  font-family: "Raleway";
  font-size: 15px;
  font-weight: 700;
  color: var(--white);
  margin-top: 30px;
`;
