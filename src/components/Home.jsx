import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  AiOutlinePlusCircle,
  AiOutlineMinusCircle,
  AiOutlineClose,
} from "react-icons/ai";
import { RiLogoutBoxRLine } from "react-icons/ri";
import axios from "axios";
import { useUser } from "../contexts/UserContext.jsx";
import { useBalance } from "../contexts/BalanceContext.jsx";
import styled from "styled-components";

export default function Home() {
  const { userInfo, setUserInfo } = useUser();
  const [reload, setReload] = useState([]);
  const { setSelect, balance, setBalance, saldo } = useBalance();
  const navigate = useNavigate();

  const list = () => {
    const items = balance.map((item) => {
      return (
        <Item cor={item.operation}>
          <h5>{item.data}</h5>
          <h4
            onClick={() => {
              setSelect(item.id);
              const URL = item.operation ? "/editarentrada" : "/editarsaida";
              navigate(URL);
            }}
          >
            {item.name}
          </h4>
          <span>{parseFloat(item.value).toFixed(2)}</span>
          <AiOutlineClose
            className="close"
            onClick={async () => {
              const config = {
                headers: { Authorization: `Bearer ${userInfo.token}` },
              };
              const URL = `https://projeto13-backend.herokuapp.com/balance/${item.id}/delete`;
              try {
                await axios.delete(URL, config);
                setReload([]);
              } catch (e) {}
            }}
          />
        </Item>
      );
    });

    return <Items>{items}</Items>;
  };

  const logout = async () => {
    const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
    const URL = "https://projeto13-backend.herokuapp.com/sign-out";
    try {
      await axios.post(URL, {}, config);
      localStorage.removeItem("userInfo");
      setUserInfo({});
      setBalance([]);
      navigate("/");
    } catch (e) {
      localStorage.removeItem("userInfo");
      setUserInfo({});
      setBalance([]);
      navigate("/");
    }
  };

  useEffect(() => {
    const verifyLogin = async () => {
      const infoSerializado = localStorage.getItem("userInfo");
      let token = "";
      if (userInfo.token !== undefined) {
        token = userInfo.token;
      } else if (infoSerializado) {
        const user = JSON.parse(infoSerializado);
        token = user.token;
        setUserInfo(user);
      } else {
        setUserInfo({});
        setBalance([]);
        localStorage.removeItem("userInfo");
        navigate("/");
      }

      const config = { headers: { Authorization: `Bearer ${token}` } };
      const URL = "https://projeto13-backend.herokuapp.com/balance";
      try {
        const promise = await axios.get(URL, config);
        const { data } = promise;
        setBalance(data);
      } catch (e) {
        console.log(e.message);
      }
    };
    verifyLogin();
  }, [reload]);

  return (
    <Container>
      <Top>
        <Name>Olá, {userInfo.name}</Name>
        <RiLogoutBoxRLine className="logout" onClick={logout} />
      </Top>
      <Balance>
        {list()}
        <Total>
          <h3>SALDO</h3>
          <span>{parseFloat(saldo).toFixed(2)}</span>
        </Total>
      </Balance>
      <Buttons>
        <Button
          onClick={() => {
            navigate("/novaentrada");
          }}
        >
          <AiOutlinePlusCircle className="icons" />
          <h6>Nova entrada</h6>
        </Button>
        <Button
          onClick={() => {
            navigate("/novasaida");
          }}
        >
          <AiOutlineMinusCircle className="icons" />
          <h6>Nova saída</h6>
        </Button>
      </Buttons>
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

  .icons {
    color: var(--white);
    font-size: 20px;
  }

  .logout {
    font-size: 30px;
    color: var(--white);
  }
`;

const Name = styled.h1`
  width: auto;
  color: var(--white);
  font-size: 26px;
  font-weight: 700;
`;

const Top = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Balance = styled.div`
  width: 100%;
  height: 100%;
  margin: 20px 0 15px 0;
  padding: 20px 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  background-color: var(--white);
  border-radius: 5px;
  border: none;
`;

const Items = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  overflow-y: scroll;
  margin-bottom: 15px;
`;

const Item = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 15px;

  h4 {
    color: var(--black);
    font-size: 16px;
    font-weight: 400;
  }

  h5 {
    color: var(--grey);
    font-size: 16px;
    font-weight: 400;
    margin-right: 10px;
  }

  span {
    color: ${(props) => (props.cor ? "var(--green)" : "var(--red)")};
    font-size: 17px;
    font-weight: 400;
    margin-left: auto;
  }

  .close {
    font-size: 15px;
    color: var(--grey);
    margin-left: 10px;
  }
`;

const Total = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  h3 {
    color: var(--black);
    font-size: 17px;
    font-weight: 700;
  }

  span {
    color: var(--green);
    font-size: 17px;
    font-weight: 400;
  }
`;

const Buttons = styled.div`
  width: 100%;
  height: 115px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 15px;
`;

const Button = styled.button`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  background-color: var(--purple);
  border: none;
  border-radius: 5px;
  padding: 7px 15px;

  h6 {
    width: 50px;
    text-align: start;
    font-weight: 700;
    font-size: 15px;
    color: var(--white);
  }
`;
