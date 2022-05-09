import React, { createContext, useState, useContext, useEffect } from "react";

const BalanceContext = createContext();

export default function BalanceProvider({ children }) {
  const [balance, setBalance] = useState([]);
  const [saldo, setSaldo] = useState(0);
  const [select, setSelect] = useState("");

  useEffect(() => {
    if (balance.length !== 0) {
      let total = 0;
      balance.forEach((b) => {
        const valor = parseFloat(b.value);
        total += b.operation ? valor : -valor;
      });
      setSaldo(total);
    }
  }, [balance]);

  return (
    <BalanceContext.Provider
      value={{
        select,
        balance,
        setSelect,
        setBalance,
        saldo,
      }}
    >
      {children}
    </BalanceContext.Provider>
  );
}
export function useBalance() {
  const context = useContext(BalanceContext);
  const { select, setSelect, balance, setBalance, saldo } = context;
  return { select, setSelect, balance, setBalance, saldo };
}
