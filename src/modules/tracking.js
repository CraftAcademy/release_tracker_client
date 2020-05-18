import axios from "axios";

const addToTracked = async (id) => {
  let headers = sessionStorage.getItem("credentials");
  headers = JSON.parse(headers);
  headers = {
    ...headers,
    "Content-type": "application/json",
    Accept: "application/json"
  }

  try {
    let response = await axios.post(
      "/user_selection",
      { headers: headers },
      { person_id: id }
    );
    return { successful: true, response };
  } catch (error) {
    let errorMessage
    error.response.data.errors ? errorMessage = error.response.data.errors[0] : errorMessage = "Something went wrong"
    return { successful: false, error: errorMessage  }
  }
};

const removeFromTracked = async (id) => {
  let headers = sessionStorage.getItem("credentials");
  headers = JSON.parse(headers);

  try {
    let response = await axios.delete(
      "/user_selection",
      { headers: headers },
      { person_id: id }
    );
    return { successful: true };
  } catch (error) {
    let errorMessage
    error.response.data.errors ? errorMessage = error.response.data.errors[0] : errorMessage = "Something went wrong"
    return { successful: false, error: errorMessage  }
  }
};

const getUserSelection = async () => {
  let headers = sessionStorage.getItem("credentials");
  headers = JSON.parse(headers);

  try {
    let response = await axios.get("/user_selection", {
      headers: headers,
    });
    return { response: response.data.user_selection };
  } catch (error) {
    return { response: [], error: "Unable to get your selection" };
  }
};

export { addToTracked, removeFromTracked, getUserSelection };
