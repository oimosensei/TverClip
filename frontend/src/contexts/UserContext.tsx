import React, {
  FC,
  ReactNode,
  createContext,
  useContext,
  useState,
} from "react";
import { User } from "../types";

interface UserContext {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}
// ユーザー情報のためのコンテキストを作成
export const UserCtx = createContext({} as UserContext);
type UserProviderProps = {
  children: React.ReactNode;
};
// ユーザー情報を提供するコンポーネント
export const UserContextProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  return (
    <UserCtx.Provider value={{ user, setUser }}>{children}</UserCtx.Provider>
  );
};

// ユーザーコンテキストを使用するためのカスタムフック
export const useUser = () => {
  return useContext(UserCtx);
};
