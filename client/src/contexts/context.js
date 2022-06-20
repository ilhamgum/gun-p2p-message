import React from "react";

const Context = React.createContext();

export function ContextProvider({ children }) {
  const [selected, setSelected] = React.useState({});
  const [alias, setAlias] = React.useState("");
  const [pub, setPub] = React.useState("");

  return (
    <Context.Provider
      value={{ selected, setSelected, alias, setAlias, pub, setPub }}
    >
      {children}
    </Context.Provider>
  );
}

export default Context;
