import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Header } from "./components/Header";
import { Auth } from "./components/Auth";
import { Todo } from "./components/Todo";
import axios from "axios";
import { CsrfToken } from "./types";
import { UserContextProvider } from "./contexts/UserContext";
import { User } from "./types";

function App() {
  useEffect(() => {
    document.title = "TverClip";
    axios.defaults.withCredentials = true;
    const getCsrfToken = async () => {
      const { data } = await axios.get<CsrfToken>(
        `${process.env.REACT_APP_API_URL}/csrf`
      );
      axios.defaults.headers.common["X-CSRF-Token"] = data.csrf_token;
    };
    //getCsrfToken()
  }, []);
  return (
    <UserContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="/clips" element={<Todo />} />
        </Routes>
      </BrowserRouter>
    </UserContextProvider>
  );
}

export default App;
