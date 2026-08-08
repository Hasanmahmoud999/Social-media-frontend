import React, { useState } from "react";
import "./Auth.css";
import { login, signUp } from "../../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(true);
  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    username: "",
    password: "",
    confirmPass: "",
  });
  const [confirmPass, setConfirmPass] = useState(true);
  const { isFetching } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  const handleInputs = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignUp) {
      data.password === data.confirmPass ?
        signUp(dispatch, data)
      : setConfirmPass(false);
    } else {
      login(dispatch, data);
    }
  };

  const resetForm = () => {
    setConfirmPass(true);
    setData({
      firstname: "",
      lastname: "",
      username: "",
      password: "",
      confirmPass: "",
    });
  };

  return (
    <div className="auth">
      {/* LEFT SIDE */}
      <div className="a-left">
        <img
          src="/images/logo.png"
          alt=""
        />
        <div className="webName">
          <h1>Fluxid Media</h1>
          <h6>Explore the ideas throughout the world</h6>
        </div>
      </div>
      {/* RIGHT SIDE */}
      <div className="a-right">
        <form
          className="infoForm authForm"
          onSubmit={handleSubmit}
        >
          <h3>{isSignUp ? "Sign Up" : "Log In"}</h3>
          {isSignUp && (
            <div>
              <input
                type="text"
                placeholder="First Name"
                className="infoInput"
                name="firstname"
                onChange={handleInputs}
                value={data.firstname}
              />
              <input
                type="text"
                placeholder="Last Name"
                className="infoInput"
                name="lastname"
                onChange={handleInputs}
                value={data.lastname}
              />
            </div>
          )}
          <div>
            <input
              type="text"
              placeholder="User Name"
              className="infoInput"
              name="username"
              onChange={handleInputs}
              value={data.username}
            />
          </div>
          <div>
            <input
              type="password"
              className="infoInput"
              placeholder="Password"
              name="password"
              onChange={handleInputs}
              value={data.password}
            />
            {isSignUp && (
              <input
                type="password"
                className="infoInput"
                placeholder="Confirm Password"
                name="confirmPass"
                onChange={handleInputs}
                value={data.confirmPass}
              />
            )}
          </div>
          <span
            style={{
              display: confirmPass ? "none" : "block",
              color: "red",
              fontSize: "12px",
              alignSelf: "flex-start",
            }}
          >
            *The Password is not same{" "}
          </span>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <span
              style={{ fontSize: "12px", cursor: "pointer" }}
              onClick={() => {
                setIsSignUp(!isSignUp);
                resetForm();
              }}
            >
              {isSignUp ?
                <>
                  Already have an account.{" "}
                  <span
                    style={{
                      marginLeft: "5px",
                      backgroundColor: "red",
                      backgroundImage: "var(--buttonBg)",
                      backgroundSize: "100%",
                      backgroundRepeat: "repeat",
                      webkitBackgroundClip: "text",
                      webkitTextFillColor: "transparent",
                    }}
                  >
                    Login!
                  </span>
                </>
              : <>
                  Don't have an account.{" "}
                  <span
                    style={{
                      marginLeft: "5px",
                      backgroundColor: "red",
                      backgroundImage: "var(--buttonBg)",
                      backgroundSize: "100%",
                      backgroundRepeat: "repeat",
                      webkitBackgroundClip: "text",
                      webkitTextFillColor: "transparent",
                    }}
                  >
                    Sign up!
                  </span>
                </>
              }
            </span>
            <button
              disabled={isFetching}
              className="button infoButton"
            >
              {isFetching ?
                "Loading..."
              : isSignUp ?
                "Sginup"
              : "Login"}
            </button>
          </div>
        </form>
      </div>

      {/* <SignUp /> */}
      {/* <Login /> */}
    </div>
  );
};

// function SignUp() {
//     return (
//         <div className="a-right">
//             <form className="infoForm authForm">
//                 <h3>Sign up</h3>
//                 <div>
//                     <input
//                         type="text"
//                         placeholder="First Name"
//                         className="infoInput"
//                         name="firstName"
//                     />
//                     <input
//                         type="text"
//                         placeholder="Last Name"
//                         className="infoInput"
//                         name="lastName"
//                     />
//                 </div>
//                 <div>
//                     <input
//                         type="text"
//                         placeholder="User Name"
//                         className="infoInput"
//                         name="useName"
//                     />
//                 </div>
//                 <div>
//                     <input
//                         type="password"
//                         className="infoInput"
//                         placeholder="Password"
//                         name="password"
//                     />
//                     <input
//                         type="password"
//                         className="infoInput"
//                         placeholder="Confirm Password"
//                         name="confirmPass"
//                     />
//                 </div>
//                 <div
//                     style={{ display: "flex", justifyContent: "space-between" }}
//                 >
//                     <span style={{ fontSize: "12px" }}>
//                         Already have an account. Login!
//                     </span>
//                     <button className="button infoButton">Sginup</button>
//                 </div>
//             </form>
//         </div>
//     );
// }
// function Login() {
//   return (
//     <div className="a-right">
//       <form className="infoForm authForm">
//         <h3>Login</h3>
//         <div>
//           <input
//             type="text"
//             placeholder="User Name"
//             className="infoInput"
//             name="useName"
//           />
//         </div>
//         <div>
//           <input
//             type="password"
//             className="infoInput"
//             placeholder="Password"
//             name="password"
//           />
//         </div>
//         <div style={{ display: "flex", justifyContent: "space-between" }}>
//           <span style={{ fontSize: "12px" }}>
//             Don't have an account. Sign up!
//           </span>
//           <button className="button infoButton">Sginup</button>
//         </div>
//       </form>
//     </div>
//   );
// }

export default Auth;
