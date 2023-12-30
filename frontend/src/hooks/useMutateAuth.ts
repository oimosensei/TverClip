import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import useStore from "../store";
import { Credential } from "../types";
import { useError } from "./useError";
import { User } from "../types";
import { useUser } from "../contexts/UserContext";
import { log } from "console";

export const useMutateAuth = () => {
  const navigate = useNavigate();
  const resetEditedTask = useStore((state) => state.resetEditedTask);
  const { switchErrorHandling } = useError();
  const { user, setUser } = useUser();
  const loginMutation = useMutation(
    async (user: Credential) =>
      await axios.post<User>(`${process.env.REACT_APP_API_URL}/login`, user),
    {
      onSuccess: (res) => {
        setUser(res.data);
        console.log(res.data);
        navigate("/clips");
      },
      onError: (err: any) => {
        if (err.response.data.message) {
          switchErrorHandling(err.response.data.message);
        } else {
          switchErrorHandling(err.response.data);
        }
      },
    }
  );
  const registerMutation = useMutation(
    async (user: Credential) =>
      await axios.post(`${process.env.REACT_APP_API_URL}/signup`, user),
    {
      onError: (err: any) => {
        if (err.response.data.message) {
          switchErrorHandling(err.response.data.message);
          console.log(`${process.env.REACT_APP_API_URL}/signup`);
        } else {
          switchErrorHandling(err.response.data);
          console.log(`${process.env.REACT_APP_API_URL}/signup`);
        }
      },
    }
  );
  const logoutMutation = useMutation(
    async () => await axios.post(`${process.env.REACT_APP_API_URL}/logout`),
    {
      onSuccess: () => {
        resetEditedTask();
        navigate("/");
        setUser(null);
      },
      onError: (err: any) => {
        if (err.response.data.message) {
          switchErrorHandling(err.response.data.message);
        } else {
          switchErrorHandling(err.response.data);
        }
      },
    }
  );
  const getUserMutation = useMutation(
    async () => {
      if (!user) {
        const response = await axios.get<User>(
          `${process.env.REACT_APP_API_URL}/session/user`
        );
        return response;
      }
    },
    {
      onSuccess: (data) => {
        if (data) setUser(data.data);
      },
      onError: (err: any) => {
        if (err.response.data.message) {
          if (err.response.data.message !== "missing or malformed jwt") {
            switchErrorHandling(err.response.data.message);
          }
        } else {
          switchErrorHandling(err.response.data);
        }
      },
    }
  );
  return { loginMutation, registerMutation, logoutMutation, getUserMutation };
};
