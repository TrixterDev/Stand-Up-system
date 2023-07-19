import { Question } from "./index";
import axios from "axios";
import Cookie from "js-cookie";
import { User } from "../components/UserPage";

const apiUrl = "http://localhost:1337/api";

const axiosInstance = axios.create({
  baseURL: apiUrl,
});

axiosInstance.interceptors.request.use(
  (config: { headers: { Authorization: string } }) => {
    const token = Cookie.get("key");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  }
);

export const getUserInfo = async (): Promise<User> => {
  const response = await axiosInstance.get<User>("users/me?populate=deep");
  return response.data;
};

export const getUserInfoByUsername = async (
  username: string
): Promise<User> => {
  const response = await axiosInstance.get<User>(
    `users?filters[username]=${username}&populate=deep`
  );
  return response.data;
};

export const loginUser = async (data: {
  identifier: string;
  password: string;
}): Promise<any> => {
  const response = await axiosInstance.post("auth/local", data);
  return response.data;
};

export const RegUser = async (data: {
  username: string;
  email: string;
  password: string;
}): Promise<any> => {
  const response = await axiosInstance.post("auth/local/register", data);
  return response.data;
};

export const getData = async (): Promise<any> => {
  const response = await axiosInstance.get("questions?populate=*");
  return response.data;
};

export const getUsers = async (): Promise<any> => {
  const response = await axiosInstance.get("users?populate=*");
  return response.data;
};

export const changeData = async (
  data: any,
  idUsers: number,
  createdDate: string
): Promise<any> => {
  const response = await axiosInstance.post("answers?populate=deep", {
    data: {
      createdDate: createdDate,
      answer: data.answer,
      category: data.category_id,
      question: data.id,
      users: idUsers,
    },
  });
  return response.data;
};

export const changeUserInfo = async (data: User, id: number): Promise<any> => {
  const response = await axiosInstance.put(`users/${id}`, data);
  return response.data;
};

export const changeUserOnline = async (
  data: User,
  id: number
): Promise<any> => {
  const response = await axiosInstance.put(`users/${id}`, data);
  return response.data;
};

export const uploadImage = async (data: FormData): Promise<any> => {
  const response = await axiosInstance.post("upload", data);
  return response.data;
};

export const changeImage = async (data: FormData, id: number): Promise<any> => {
  const response = await axiosInstance.post(`upload?id=${id}`, data);
  return response.data;
};

export const getQuestions = async (): Promise<Question[]> => {
  const response = await axiosInstance.get("questions?populate=deep");
  return response.data;
};

export const getCategories = async (): Promise<any> => {
  const response = await axiosInstance.get("question-categories");
  return response.data;
};

export const updateCategories = async (data: any[]): Promise<any> => {
  const requests = data.map((item) => {
    if (!item.id) {
      return axiosInstance.post("question-categories", {
        data: { category_name: item.category_name },
      });
    } else {
      return axiosInstance.put(`question-categories/${item.id}`, {
        data: item,
      });
    }
  });

  return Promise.all(requests);
};

export const GetloginUser = async (
  token: any,
  data: string,
  id: number
): Promise<any> => {
  const response = await axiosInstance.put(
    `users/${id}`,
    { about: data },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response.data;
};

export const getCategory = async (category_name: string): Promise<any> => {
  const response = await axiosInstance.get(
    `question-categories?filters[category_name][$eq]=${category_name}`
  );
  return response.data;
};

interface dataItem {
  title: string;
  category: string;
  edit: boolean;
  category_id: number;
}

export const updateQuestions = async (data: dataItem[]): Promise<any> => {
  const requests = data.map((item) => {
    if (typeof item.id === "string") {
      if (!item.edit) {
        if (!item.category_id) {
          return getCategory(item.category).then((resp) => {
            return axiosInstance.post("questions", {
              data: { title: item.title, category: resp.data[0].id },
            });
          });
        } else {
          return axiosInstance.post("questions", {
            data: { title: item.title, category: item.category_id },
          });
        }
      }
    } else {
      return axiosInstance.put(`questions/${item.id}`, {
        data: { title: item.title },
      });
    }
  });

  return Promise.all(requests);
};

export const removeQuestions = async (data: any[]): Promise<any> => {
  const requests = data.map((item) => {
    return axiosInstance.delete(`questions/${item.id}`);
  });

  return Promise.all(requests);
};

export const removeCategories = async (
  data: any[],
  questions: Question[]
): Promise<any> => {
  const requests = data.map((item) => {
    if (item.deleted) {
      questions.map((elem) => {
        if (elem.category === item.category_name) {
          console.log("ok");
          console.log(item, elem);
        }
      });
      return axiosInstance.delete(`question-categories/${item.id}`);
    }
  });

  return Promise.all(requests);
};

export const getAnswers = async () => {
  const response = await axiosInstance.get("answers?populate=deep");
  return response.data;
};

export const getAnswersByUser = async (
  username: string,
  time: string | undefined
): Promise<any> => {
  const response = await axiosInstance.get(
    `answers?populate=deep,3&filters[users][username]=${username}${
      time ? `&filters[createdDate]=${time}` : ``
    }`
  );
  return response.data;
};

export const getAnswersById = async (
  id: number | string,
  time: string | undefined
): Promise<any> => {
  const response = await axiosInstance.get(
    `answers?populate=deep,3&filters[id]=${id}${
      time ? `&filters[createdDate]=${time}` : ``
    }`
  );
  return response.data;
};

export const getAnswersByTitle = async (
  title: string,
  date: string
): Promise<any> => {
  const response = await axiosInstance.get(
    `answers?populate=deep&filters[answer]=${title}${
      date ? `&filters[createdDate]=${date}` : ``
    }`
  );
  return response.data;
};

export const updateQuestionById = async (
  questionData: Question,
  id: number
): Promise<any> => {
  const response = await axiosInstance.put(`questions/${id}?populate=deep`, {
    data: questionData,
  });
  return response.data;
};

export const getQuestionById = async (id: number): Promise<any> => {
  const response = await axiosInstance.get(`questions/${id}?populate=deep`);
  return response.data;
};

export const getUserByUsername = async (username: string): Promise<any> => {
  const response = await axiosInstance.get(
    `users?filters[username][$eq]=${username}`
  );
  return response.data;
};
