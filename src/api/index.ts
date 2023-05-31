import Cookie from "js-cookie";
import ky, { ResponsePromise } from "ky";

export interface User {
  // Типы данных для пользователя
}

export interface Question {
  // Типы данных для вопроса
}

const strapiAPI = ky.create({
  prefixUrl: "http://localhost:1337/api",
});

const request = <T>(
  url: string,
  options?: Record<string, any>
): Promise<any> => {
  const token = Cookie.get("key");
  const headers = token ? { Authorization: `Bearer ${token}` } : {};

  return strapiAPI(url, { ...options, headers }).json();
};

export const getUserInfo = (token: string): Promise<User> => {
  return request<User>("users/me?populate=*");
};

export const loginUser = (data: {
  username: string;
  password: string;
}): Promise<any> => {
  return request("auth/local", { method: "post", json: data });
};

export const RegUser = (data: {
  username: string;
  email: string;
  password: string;
}): Promise<any> => {
  return request("auth/local/register", { method: "post", json: data });
};

export const getData = (): Promise<any> => {
  return request("data?populate=deep");
};

export const getUsers = (): Promise<any> => {
  return request("users");
};

export const changeData = (data: any): Promise<any> => {
  return request("stand-up?populate=deep", {
    method: "put",
    json: { data: { Products: data } },
  });
};

export const changeUserInfo = (data: User, id: number): Promise<any> => {
  return request(`users/${id}`, { method: "put", json: data });
};

export const uploadImage = (data: FormData): Promise<any> => {
  return request("upload", { method: "post", body: data });
};

export const getQuestions = (): Promise<Question[]> => {
  return request("questions?populate=*");
};

export const getCategories = (): Promise<any> => {
  return request("question-categories");
};

export const updateCategories = (data: any[]): Promise<any> => {
  console.log("Update working");
  const requests = data.map((item) => {
    if (!item.id) {
      return request("question-categories", {
        method: "post",
        json: { data: { category_name: item.category_name } },
      });
    } else {
      return request(`question-categories/${item.id}`, {
        method: "put",
        json: { data: item },
      });
    }
  });

  return Promise.all(requests);
};

export const GetloginUser = (
  token: any,
  data: string,
  id: number
): Promise<any> => {
  return request(`users/${id}`, {
    method: "put",
    headers: { Authorization: `Bearer ${token}` },
    json: { about: data },
  });
};

export const getCategory = (category_name: string): Promise<any> => {
  return request(
    `question-categories?filters[category_name][$eq]=${category_name}`
  );
};

export const updateQuestions = (data: any[]): Promise<any> => {
  console.log("Update working");
  const requests = data.map((item) => {
    if (typeof item.id === "string") {
      if (!item.edit) {
        if (!item.category_id) {
          return getCategory(item.category).then((resp) => {
            return request("questions", {
              method: "post",
              json: { data: { title: item.title, category: resp.data[0].id } },
            });
          });
        } else {
          return request("questions", {
            method: "post",
            json: { data: { title: item.title, category: item.category_id } },
          });
        }
      }
    } else {
      return request(`questions/${item.id}`, {
        method: "put",
        json: { data: { title: item.title } },
      });
    }
  });

  return Promise.all(requests);
};

export const removeQuestions = (data: any[]): Promise<any> => {
  console.log("Remove working");
  const requests = data.map((item) => {
    return request(`questions/${item.id}`, { method: "delete" });
  });

  return Promise.all(requests);
};