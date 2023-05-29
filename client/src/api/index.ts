import ky from "ky";
export const strapiAPI = ky.create({
  prefixUrl: "http://localhost:1337/api",
});

export const getUserInfo = (token: any) => {
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

export const getUsers = () => {
  return strapiAPI.get("users").json();
};

export const getData = () => {
  return strapiAPI.get("data?populate=deep").json();
};
export const changeData = (data: any, id: number) => {
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

export const GetloginUser = (token: any, data: string, id: number) => {
  return strapiAPI
    .put(`users/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      json: {
        about: data,
      },
    })
    .json();
};

export const createQuestion = (data: any) => {
  return strapiAPI.post("questions", {
    json: {
      data,
    },
  });
};

export const findAnswer = () => {
  return strapiAPI.get("otveties").json();
};

export const findQuestionCategory = () => {
  return strapiAPI.get("question-categories").json();
};
