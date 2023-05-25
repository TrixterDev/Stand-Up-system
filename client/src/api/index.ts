import Cookie from 'js-cookie';
import ky from "ky";
import { User } from "../components/UserPage";
export const strapiAPI = ky.create({
  prefixUrl: "http://localhost:1337/api",
});

export const getUserInfo = (token) => {
  return strapiAPI
    .get("users/me?populate=*", {
      headers: { Authorization: `Bearer ${token}` },
    })
    .json();
};

export const loginUser = (data) => {
  return strapiAPI.post("auth/local", { json: data }).json();
};

export const RegUser = (data) => {
  return strapiAPI.post("auth/local/register", { json: data }).json();
};

export const getData = () => {
  return strapiAPI.get("data?populate=deep").json();
};

export const getUsers = () => {
  return strapiAPI.get("users").json();
};

export const changeData = (data) => {
  return strapiAPI
    .put("stand-up?populate=deep", {
      json: {
        data: {
          Products: data,
        },
      },
    })
    .json();
};

export const changeUserInfo = async (data: User, id: number) => {
  return await strapiAPI.put(`users/${id}`, {json: data, headers: {
    Authorization: `Bearer ${Cookie.get('key')}`
  }}).json()
};

export const uploadImage = async (data: FormData) => {
  return await strapiAPI.post('upload', {body: data, headers: {
    Authorization: `Bearer ${Cookie.get('key')}`
  } }).json()
}