import React, { useContext } from "react";
import { Table } from "../enums";

export const DBContext = React.createContext<Record<Table, any[]>>(null as any);

export const DBProvider = DBContext.Provider;
export const DBConsumer = DBContext.Consumer;

export const useDB = () => useContext(DBContext);
