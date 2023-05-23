import ky from "ky";
import { json } from "react-router";
export const strapiAPI = ky.create({
  prefixUrl: "http://localhost:1337/api",
});

export const getUserInfo = (token: string) => {
  return strapiAPI
    .get("users/me?populate=role", {
      headers: { Authorization: `Bearer ${token}` },
    })
    .json();
};

export const loginUser = (data: any) => {
  return strapiAPI.post("auth/local", { json: data }).json();
};

export const RegUser = (data: any) => {
  return strapiAPI.post("auth/local/register", { json: data }).json();
};

export const getUser = () => {
  return strapiAPI.post(`users`).json();
};

export const getData = () => {
  return strapiAPI.get("questions").json();
};
export const changeData = (data: any, id: number) => {
  return strapiAPI
    .put(`questions/${id}`, {
      json: {
        data: {
          answer: data,
        },
      },
    })
    .json();
};
