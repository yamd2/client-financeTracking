import axios from "axios";

const rootUrl = "http://localhost:8000/api/v1";
const userUrl = rootUrl + "/user";
const transUrl = rootUrl + "/transaction";

const getUserIdFromStorage = () => {
  const user = sessionStorage.getItem("user");

  if (user) {
    const userObj = JSON.parse(user);

    return userObj?._id;
  }
  return;
};

// ====== user section
//send datat to server to add to db
export const postUser = (formData) => {
  try {
    return axios.post(userUrl, formData);
  } catch (error) {
    console.log(error);
    return {
      status: "error",
      message: error.message,
    };
  }
};

// login user

export const loginUser = (formData) => {
  try {
    return axios.post(userUrl + "/login", formData);
  } catch (error) {
    console.log(error);
    return {
      status: "error",
      message: error.message,
    };
  }
};

// ======= transaction section
//post transaction
export const postTrans = async (formData) => {
  try {
    const userId = getUserIdFromStorage();

    if (!userId) {
      return {
        status: "error",
        message: "you must be logged In",
      };
    }

    const { data } = await axios.post(transUrl, formData, {
      headers: {
        Authorization: userId,
      },
    });
    return data;
  } catch (error) {
    return {
      status: "error",
      message: error.message,
    };
  }
};

//get user specific transactions
export const fetchTrans = async () => {
  try {
    const userId = getUserIdFromStorage();

    if (!userId) {
      return {
        status: "error",
        message: "you must be logged In",
      };
    }

    const { data } = await axios.get(transUrl, {
      headers: {
        Authorization: userId,
      },
    });
    return data;
  } catch (error) {
    return {
      status: "error",
      message: error.message,
    };
  }
};

//get user specific transactions
export const deleteTrans = async (ids) => {
  try {
    const userId = getUserIdFromStorage();

    if (!userId) {
      return {
        status: "error",
        message: "you must be logged In",
      };
    }

    const { data } = await axios.delete(transUrl, {
      data: ids,
      headers: {
        Authorization: userId,
      },
    });
    console.log(data, "lkjhgsdfgb");
    return data;
  } catch (error) {
    return {
      status: "error",
      message: error.message,
    };
  }
};
