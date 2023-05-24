import { useDispatch } from "react-redux";
import { auth_types } from "../redux/types";
import { useEffect, useState } from "react";
import axios from "axios";

export default function AuthProvider({ children }) {
  const child = { children };

  const dispatch = useDispatch();
  async function refreshReader() {
    const token = JSON.parse(localStorage.getItem("token"));

    console.log(token);
    if (token) {
      const userData = await axios
        .get("http://localhost:2000/Users/token2", {
          params: {
            token,
          },
        })
        .then((res) => res.data);

      await dispatch({
        type: auth_types.login,
        payload: userData,
      });
    }
  }
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    new Promise((resolve) => {
      setTimeout(() => {
        resolve(setIsLoading(false));
      }, 1000);
    });
  }, []);
  useEffect(() => {
    refreshReader();
  }, []);
  child.isLoading = isLoading;
  return children;
}
