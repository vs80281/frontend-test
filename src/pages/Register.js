import React from "react";
import { useState, useEffect } from "react";
import styles from "../Styles/register.module.css";
import { useToasts } from "react-toast-notifications";
import Capture from "../Asset/Capture.jpg";
import { Navigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [fullname, setFullname] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [agree, setAgree] = useState(false);
  const { addToast } = useToasts();
  const [moving, setMoving] = useState(false);
  const [message, setMessage] = useState("");
  const [passwordmessage, setPasswordmessage] = useState("");
  const [numbermessage, setNumbermessage] = useState("");
  const [validemail, setValidemail] = useState(false);
  const [validpassword, setValidpassword] = useState(false);
  const [validphonenumber, setValidphonenumber] = useState(false);
  const validRegex = /^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/;
  const numvalidRegex = /^\d{10}$/;


  useEffect(() => {
    if (phonenumber) {
      if (phonenumber.match(numvalidRegex)) {
        setNumbermessage("valid number");
        setValidphonenumber(true);
      } else {
        setNumbermessage("invalid number");
        setValidphonenumber(false);
      }
    } else {
      setNumbermessage("");
    }
  }, [phonenumber]);

  useEffect(() => {
    if (password) {
      if (password === confirmpassword) {
        setPasswordmessage("password  matched");
        setValidpassword(true);
      } else {
        setPasswordmessage("password didn't  match");
        setValidpassword(false);
      }
    } else {
      setPasswordmessage("");
    }
  }, [confirmpassword, password]);

  useEffect(() => {
    if (email) {
      if (email.match(validRegex)) {
        setMessage("valid email");
        setValidemail(true);
      } else {
        setMessage("enter valid email");
        setValidemail(false);
      }
    } else {
      setMessage("");
    }
  }, [email]);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmpassword) {
      addToast("Make sure password and confirm password matches", {
        appearance: "error",
        autoDismiss: true,
      });
      setPassword();
    }
    if (phonenumber.length !== 0) {
      if (phonenumber.length > 10 || phonenumber.length < 10) {
        addToast("please enter valid phone number", {
          appearance: "error",
          autoDismiss: true,
        });
      } 
      setPhonenumber();
    }

    if (
      !email ||
      !password ||
      !confirmpassword ||
      !fullname ||
      !phonenumber ||
      !agree
    ) {
      addToast("Please fill all the fields", {
        appearance: "error",
        autoDismiss: true,
      });
    } else {
      if (validemail && validpassword && validphonenumber) {
        const userData = {
          email,
          password,
          confirmpassword,
          fullname,
          phonenumber,
          agree,
        };
        localStorage.setItem("token-info", JSON.stringify(userData));
        setMoving(true);
      }
    }
  };
  if (moving) {
    return <Navigate to="/barchart" />;
  }
  return (
    <>
      <div className={styles.container} style={{ padding: 0 }}>
        <div className={styles.left_div}>
          <div className={styles.image_div}>
            <img src={Capture} alt="" />
            <div className={styles.image_label}>
              <h3 style={{ margin: 0, textAlign: "center" }}>
                Choose the Date Range
              </h3>
              <p style={{ margin: 0, textAlign: "center" }}>
                lorem ipsum is dummy text
              </p>
              <p style={{ margin: 0 }}>
                lorem ipsum is dummy text for dummy text{" "}
              </p>
            </div>
          </div>
        </div>
        <div className={styles.right_div}>
          <div className={styles.inner_right_div}>
            <h3>Create an account</h3>

            <form onSubmit={handleFormSubmit}>
              <label>Your email address</label>
              <input
                className={styles.input}
                type="text"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {validemail ? (
                <h6 style={{ color: "green" }}>{message}</h6>
              ) : (
                <h6 style={{ color: "red" }}>{message}</h6>
              )}

              <label>Your Password</label>
              <input
                className={styles.input}
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <label>Confirm Your Password</label>
              <input
                className={styles.input}
                type="password"
                value={confirmpassword}
                onChange={(e) => setConfirmpassword(e.target.value)}
              />
              {validpassword ? (
                <h6 style={{ color: "green" }}>{passwordmessage}</h6>
              ) : (
                <h6 style={{ color: "red" }}>{passwordmessage}</h6>
              )}

              <label>Your Full Name</label>
              <input
                className={styles.input}
                type="text"
                name="full name"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
              />
              <label>Your phone number</label>
              <input
                className={styles.input}
                type="text"
                name="phone number"
                value={phonenumber}
                onChange={(e) => setPhonenumber(e.target.value)}
              />
              {validphonenumber ? (
                <h6 style={{ color: "green" }}>{numbermessage}</h6>
              ) : (
                <h6 style={{ color: "red" }}>{numbermessage}</h6>
              )}

              <label>
                <input
                  className={styles.input}
                  type="checkbox"
                  style={{ marginBottom: 15 }}
                  value={agree}
                  onChange={(e) => setAgree(!agree)}
                />
                I read and agree terms and condition
              </label>

              <div className={styles.clearfix}>
                <button type="submit" className={styles.signupbtn}>
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
