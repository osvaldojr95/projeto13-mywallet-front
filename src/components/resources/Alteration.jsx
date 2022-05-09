import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { useUser } from "../../contexts/UserContext.jsx";
import { useBalance } from "../../contexts/BalanceContext.jsx";
import Input from "./Input.jsx";
import Button from "./Button.jsx";

export default function Login(props) {
  const [value, setValue] = useState("");
  const [description, setDescription] = useState("");
  const [mode, setMode] = useState({});
  const { userInfo } = useUser();
  const { select, balance } = useBalance();
  const navigate = useNavigate();

  useEffect(() => {
    switch (props.mode) {
      case "newEntry":
        setMode({
          title: "Nova entrada",
          button: "Salvar entrada",
          callback: async (e, _value, _desc) => {
            e.preventDefault();
            const URL = "http://localhost:5002/balance?operation=true";
            const config = {
              headers: { Authorization: `Bearer ${userInfo.token}` },
            };
            const obj = { name: _desc, value: _value };
            try {
              await axios.post(URL, obj, config);
              navigate("/home");
            } catch (e) {
              console.log(e.message);
            }
          },
        });
        break;

      case "newSpent":
        setMode({
          title: "Nova saída",
          button: "Salvar saída",
          callback: async (e, _value, _desc) => {
            e.preventDefault();
            const URL = "http://localhost:5002/balance?operation=false";
            const config = {
              headers: { Authorization: `Bearer ${userInfo.token}` },
            };
            const obj = { name: _desc, value: _value };
            try {
              await axios.post(URL, obj, config);
              navigate("/home");
            } catch (e) {
              console.log(e.message);
            }
          },
        });
        break;

      case "alterEntry":
        setMode({
          title: "Editar entrada",
          button: "Atualizar entrada",
          callback: async (e, _value, _desc) => {
            e.preventDefault();
            const URL = `http://localhost:5002/balance/${select}/update`;
            const config = {
              headers: { Authorization: `Bearer ${userInfo.token}` },
            };
            const obj = { value: _value };
            try {
              await axios.put(URL, obj, config);
              navigate("/home");
            } catch (e) {
              console.log(e.message);
            }
          },
        });
        setDescription(balance.find((b) => b.id === select).name);
        setValue(balance.find((b) => b.id === select).value);
        break;

      case "alterSpent":
        setMode({
          title: "Editar saída",
          button: "Atualizar saída",
          callback: async (e, _value, _desc) => {
            e.preventDefault();
            const URL = `http://localhost:5002/balance/${select}/update`;
            const config = {
              headers: { Authorization: `Bearer ${userInfo.token}` },
            };
            const obj = { value: _value };
            try {
              await axios.put(URL, obj, config);
              navigate("/home");
            } catch (e) {
              console.log(e.message);
            }
          },
        });
        setDescription(balance.find((b) => b.id === select).name);
        setValue(balance.find((b) => b.id === select).value);
        break;

      default:
        break;
    }
  }, []);

  return (
    <Container>
      <h1>{mode.title}</h1>
      <form>
        <Input
          type="input"
          value={value}
          setValue={setValue}
          placeholder="Valor"
        />
        <Input
          type="input"
          value={description}
          setValue={setDescription}
          placeholder="Descrição"
        />
        <Button
          type="submit"
          obj={{ value, description }}
          callback={mode ? mode.callback : () => {}}
        >
          {mode.button}
        </Button>
      </form>
    </Container>
  );
}

const Container = styled.div`
  font-family: "Raleway";
  height: 100vh;
  width: 100%;
  padding: 40px 40px 20px 40px;
  background: var(--background);
  display: flex;
  flex-direction: column;

  h1 {
    font-size: 26px;
    font-weight: 700;
    margin-bottom: 40px;
    color: var(--white);
  }
`;
