import React from "react";
import "./Login.scss";
import { Button } from "@mui/material";
import { auth, provider } from "../../firebase";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useStateValue } from "../../StateProvider";
import { actionTypes } from "../../reducer";

const Login = () => {
  const [state, dispatch] = useStateValue();
  const signIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result);
        dispatch({
          type: actionTypes.SET_USER,
          user: result.user,
        });
        // This gives you a Google Access Token. You can use it to access the Google API.
        // const credential = GoogleAuthProvider.credentialFromResult(result);
        // const token = credential.accessToken;
        // // The signed-in user info.
        // const user = result.user;
        // ...
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="login">
      <div className="login-container">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/1021px-WhatsApp.svg.png"
          alt="whatsapp"
        />
        <div className="login-text">
          <h1>Sign in to Whatsapp</h1>
        </div>
        <Button
          type="submit"
          onClick={signIn}
          sx={{
            marginTop: "50px",
            textTransform: "inherit",
            backgroundColor: "#0a8d48",
            color: "#fff",
            "&:hover": {
              backgroundColor: "#fff",
              color: "#0a8d48",
            },
          }}
        >
          Sign in with Google
        </Button>
      </div>
    </div>
  );
};

export default Login;
