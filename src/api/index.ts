import Cookie from "js-cookie";
import ky from "ky";

export const strapiAPI = ky.create({
  prefixUrl: "http://localhost:1337/api",
});

export interface User {
  // Типы данных для пользователя
}

export interface Question {
  // Типы данных для вопроса
}

export const getUserInfo = (token: string): Promise<User> => {
  return strapiAPI
    .get("users/me?populate=*", {
      headers: { Authorization: `Bearer ${token}` },
    })
    .json();
};

export const loginUser = (data: {
  username: string;
  password: string;
}): Promise<any> => {
  return strapiAPI.post("auth/local", { json: data }).json();
};

export const RegUser = (data: {
  username: string;
  email: string;
  password: string;
}): Promise<any> => {
  return strapiAPI.post("auth/local/register", { json: data }).json();
};

export const getData = (): Promise<any> => {
  return strapiAPI.get("data?populate=deep").json();
};

export const getUsers = (): Promise<any> => {
  return strapiAPI.get("users").json();
};

export const changeData = (data: any): Promise<any> => {
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

export const changeUserInfo = async (data: User, id: number): Promise<any> => {
  return await strapiAPI
    .put(`users/${id}`, {
      json: data,
      headers: {
        Authorization: `Bearer ${Cookie.get("key")}`,
      },
    })
    .json();
};

export const uploadImage = async (data: FormData): Promise<any> => {
  return await strapiAPI
    .post("upload", {
      body: data,
      headers: {
        Authorization: `Bearer ${Cookie.get("key")}`,
      },
    })
    .json();
};

export const getQuestions = async (): Promise<Question[]> => {
  return strapiAPI
    .get("questions?populate=*", {
      headers: {
        Authorization: `Bearer ${Cookie.get("key")}`,
      },
    })
    .json();
};

export const getCategories = async (): Promise<any> => {
  return strapiAPI
    .get("question-categories", {
      headers: {
        Authorization: `Bearer ${Cookie.get("key")}`,
      },
    })
    .json();
};

export const updateCategories = async (data: any[]): Promise<any> => {
  const requests = data.map((item) => {
    if (!item.id) {
      return strapiAPI.post(`question-categories`, {
        json: {
          data: {
            category_name: item.category_name,
          },
        },
        headers: {
          Authorization: `Bearer ${Cookie.get("key")}`,
        },
      });
    } else {
      return strapiAPI.put(`question-categories/${item.id}`, {
        json: {
          data: {
            ...item,
          },
        },
        headers: {
          Authorization: `Bearer ${Cookie.get("key")}`,
        },
      });
    }
  });

  // Wait for all requests to finish
  return Promise.all(requests).then((responses) => {
    return responses.map((response) => response.json());
  });
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

export const getCategory = async (cateogory_name: string) => {
  return await strapiAPI
    .get(`question-categories?filters[category_name][$eq]=${cateogory_name}`, {
      headers: {
        Authorization: `Bearer ${Cookie.get("key")}`,
      },
    })
    .json();
};

export const updateQuestions = async (data: any[]): Promise<any> => {
  const requests = data.map((item) => {
    if (typeof item.id === "string") {
      if (!item.edit) {
        if (!item.category_id) {
          getCategory(item.category).then((resp) => {
            return strapiAPI.post(`questions`, {
              json: {
                data: {
                  title: item.title,
                  category: resp.data[0].id,
                },
              },
              headers: {
                Authorization: `Bearer ${Cookie.get("key")}`,
              },
            });
          });
        } else {
          return strapiAPI.post(`questions`, {
            json: {
              data: {
                title: item.title,
                category: item.category_id,
              },
            },
            headers: {
              Authorization: `Bearer ${Cookie.get("key")}`,
            },
          });
        }
      }
    } else {
      return strapiAPI.put(`questions/${item.id}`, {
        json: {
          data: {
            title: item.title,
          },
        },
        headers: {
          Authorization: `Bearer ${Cookie.get("key")}`,
        },
      });
    }
  });

  // Wait for all requests to finish
  return Promise.all(requests).then((responses) => {
    return responses.map((response) => response.json());
  });
};

export const removeQuestions = (data: any[]): Promise<any> => {
  const requests = data.map((item) => {
    return strapiAPI.delete(`questions/${item.id}`, {
      headers: {
        Authorization: `Bearer ${Cookie.get("key")}`,
      },
    });
  });

  return Promise.all(requests).then((responses) => {
    return responses.map((response) => response.json());
  });
};
