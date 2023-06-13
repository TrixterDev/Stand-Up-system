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

export const getUserInfo = async (): Promise<User> => {
  return await request<User>("users/me?populate=deep");
};

// export const loginUser = (data: {
//   username: string;
//   password: string;
// }): Promise<any> => {
//   return request("auth/local", { method: "post", json: data });
// };

export const loginUser = (data: {
  identifier: string;
  password: string;
}): Promise<any> => {
  return strapiAPI.post("auth/local?populate=*", { json: data }).json();
};

export const RegUser = (data: {
  username: string;
  email: string;
  password: string;
}): Promise<any> => {
  return request("auth/local/register", { method: "post", json: data });
};

export const getData = (): Promise<any> => {
  return request("questions?populate=*", {
    method: "get",
  });
};

export const getUsers = (): Promise<any> => {
  return request("users?populate=*", {
    method: "get",
  });
};

export const changeData = (data: any, idUsers: number): Promise<any> => {
  return request("answers?populate=deep", {
    method: "post",
    json: {
      data: {
        answer: data.answer,
        category: data.category_id,
        question: data.id,
        users: idUsers,
      },
    },
  });
};

export const changeUserInfo = (data: User, id: number): Promise<any> => {
  return request(`users/${id}`, { method: "put", json: data });
};
export const changeUserOnline = (data: User, id: number): Promise<any> => {
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

export const getAnswers = async () => {
  return await strapiAPI.get("answers?populate=deep").json();
};

export const getAnswersByUser = async (username: string): Promise<any> => {
  return await strapiAPI
    .get(`answers?populate=deep&filters[username]=${username}`)
    .json();
};

export const getAnswersById = async (id: number): Promise<any> => {
  return await strapiAPI
    .get(
      `answers?populate=deep&filter[users[data[attributes[username]]]]=${id}`
    )
    .json();
};

export const getAnswersByTitle = async (
  title: string,
  date: string
): Promise<any> => {
  return await strapiAPI
    .get(`answers?populate=deep&filters[answer]=${title}`)
    .json();
};
