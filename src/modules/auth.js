import axios from "axios";

const authenticate = async (email, password) => {
  try {
    const response = await axios.post("/auth/sign_in", {
      email: email,
      password: password,
    });
    await storeAuthCredentials(response.headers);
    return { authenticated: true };
  } catch (error) {
    return { authenticated: false, message: error.response.data.errors[0] };
  }
};

const storeAuthCredentials = (headers) => {
  const credentials = {
    "uid": headers["uid"],
    "client": headers["client"],
    "access-token": headers["access-token"],
    "expiry": headers["expiry"],
    "token-type": "Bearer",
  };
  sessionStorage.setItem("credentials", JSON.stringify(credentials));
};

const register = async (email, password, password_confirmation) => {
  try {
    const response = await axios.post("/auth", {
      email: email,
      password: password,
      password_confirmation: password_confirmation,
    });
    await storeAuthCredentials(response.headers);
    return { authenticated: true };
  } catch (error) {
    return {
      authenticated: false,
      message: error.response.data.error,
    };
  }
};

const logOut = async () => {
  let headers = sessionStorage.getItem("credentials");
  headers = JSON.parse(headers);
  headers = {
    ...headers,
    "Content-type": "application/json",
    Accept: "application/json",
  };

  try {
    await axios.delete("/auth/sign_out", { headers: headers });
    window.sessionStorage.removeItem("credentials");
    return { authenticated: false };
  } catch (error) {
    return error;
  }
};

export { authenticate, register, logOut };
