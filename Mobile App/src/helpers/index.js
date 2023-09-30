export const apiUrl = 'http://43.204.8.125:5002/api/v1/';

//firebase - google Web client ID
export const webClientId = "208119880030-knkjrcvo5mbrjn2m24uaegs3jkgk48ov.apps.googleusercontent.com"

//irebase - Web client secret
export const webSecretId = "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"

export const SHA1 = "06:1D:38:68:FC:3D:D1:09:FB:46:A3:27:8E:AD:B5:E9:88:73:C0:4A"

//get request
export const getMethod = async item => {
  try {
    const response = await fetch(apiUrl + item.url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${item.token}`,
      },
    });
    const json = await response.json();
    if (json.success == false) {
      if (json.message == 'Token Expired') {
        localStorage.clear();
        window.location.replace('/');
      }
    }
    return json;
  } catch (error) {
    return false;
  }
};

//post request
export const postMethod = async item => {
  try {
    const response = await fetch(apiUrl + item.url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${item.token}`,
      },
      body: JSON.stringify(item.payload),
    });
    const json = await response.json();
    if (json.success == false) {
      if (json.message == 'Token Expired') {
        localStorage.clear();
        window.location.replace('/');
      }
    }
    return json;
  } catch (error) {
    return false;
  }
};

//put request
export const putMethod = async item => {
  try {
    const response = await fetch(apiUrl + item.url, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${item.token}`,
      },
      body: JSON.stringify(item.payload),
    });
    const json = await response.json();
    if (json.success == false) {
      if (json.message == 'Token Expired') {
        localStorage.clear();
        window.location.replace('/');
      }
    }
    return json;
  } catch (error) {
    return false;
  }
};

export const deleteMethod = async item => {
  try {
    const response = await fetch(apiUrl + item.url, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${item.token}`,
      },
      body: JSON.stringify(item.payload),
    });
    const json = await response.json();
    if (json.success == false) {
      if (json.message == 'Token Expired') {
        localStorage.clear();
        window.location.replace('/');
      }
    }
    return json;
  } catch (error) {
    return false;
  }
};
