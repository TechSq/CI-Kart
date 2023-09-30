//get request
export const getMethod = async (item) => {
    try {
      const response = await fetch(process.env.REACT_APP_BACKEND_URL + item.url, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${item?.token}`,
        },
      });
      const json = await response.json();
      if (json.success == false) {
        if (json.message == "Token Expired") {
          localStorage.clear();
          window.location.replace("/");
        }
      }
      return json;
    } catch (error) {
      return false;
    }
  };
  
  //post request
  export const postMethod = async (item) => {
    try {
      const response = await fetch(process.env.REACT_APP_BACKEND_URL + item.url, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${item.token}`,
        },
        body: JSON.stringify(item.payload),
      });
      const json = await response.json();
      if (json.success == false) {
        if (json.message == "Token Expired") {
          localStorage.clear();
          window.location.replace("/");
        }
      }
      return json;
    } catch (error) {
      return false;
    }
  };
  
  //put request
  export const putMethod = async (item) => {
    try {
      const response = await fetch(process.env.REACT_APP_BACKEND_URL + item.url, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${item.token}`,
        },
        body: JSON.stringify(item.payload),
      });
      const json = await response.json();
      if (json.success == false) {
        if (json.message == "Token Expired") {
          localStorage.clear();
          window.location.replace("/");
        }
      }
      return json;
    } catch (error) {
      return false;
    }
  };