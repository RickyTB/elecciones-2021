import { Remote } from "comlink";
import React, { useContext } from "react";

export const DBContext = React.createContext<Remote<SqlJs.Database>>(
  null as any
);

export const DBProvider = DBContext.Provider;
export const DBConsumer = DBContext.Consumer;

export const useDB = () => useContext(DBContext);
