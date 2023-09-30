import React, { useEffect } from "react";
import { GoogleLogin, googleLogout } from "@react-oauth/google";

import { postMethod } from "../../helpers";
import toast, { Toaster } from "react-hot-toast";

const google = (props) => {
  let { handleClose } = props;
  let json = localStorage.getItem("@USER");
  let User = JSON.parse(json);
  const googleSignin = async (data) => {
    console.log("suucces data=", data);
    try {
      let url = "customers/social/google";
      var payload = {
        clientId: data?.clientId,
        credential: data?.credential,
        select_by: data?.select_by,
      };
      let response = await postMethod({ url, payload });
      if (response.success) {
        localStorage.setItem("@token", response.data.token);
        let user = JSON.stringify(response.data.user);
        localStorage.setItem("@USER", user);
        toast.success(response.message);
        handleClose();
      } else {
        toast.success(response.error);
      }
    } catch (e) {
      console.log("register err", e);
      toast.success(e.response.message);
    }
  };

  const logOut = () => {
    console.log("logout clicked")
    googleLogout();
  };
  return (
    <>
      <Toaster
        position="bottom-center"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          // Define default options
          className: "",
          duration: 5000,
          style: {
            background: "#363636",
            color: "#fff",
          },

          // Default options for specific types
          success: {
            duration: 3000,
            theme: {
              primary: "green",
              secondary: "black",
            },
          },
        }}
      />
      {/* {User ? (
        <button onClick={logOut} className="btn btn-secondary">
          LogOut
        </button>
      ) : ( */}
        <GoogleLogin
          onSuccess={(credentialResponse) => {
            console.log("credentialResponse=", credentialResponse);
            if (credentialResponse) {
              googleSignin(credentialResponse);
            }
          }}
          onError={() => {
            console.log("Login Failed");
          }}
        />
      {/* )} */}
    </>
  );
};

export default google;
