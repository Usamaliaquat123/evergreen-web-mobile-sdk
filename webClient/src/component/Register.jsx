/* eslint-disable no-unused-vars */
import React, { useState, useRef } from "react";

import {NotificationContainer, NotificationManager} from 'react-notifications';

import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers";

import * as yup from "yup";

import AuthService from "../services/AuthService";

// import ValidationService from "./../services/ValidationService";



/* Validation starts here */
const schema = yup.object().shape({
  email: yup
    .string()
    .required(()=>{
    NotificationManager.warning("Email is required");
    })
    .email("Invalid email")
    // .test("Unique Email", "Email already in use", function (value) {
    //   ValidationService.validateEmail(value).then((data) => {
    //     const { message } = data;
    //     if (data.msgError) {
    //     NotificationManager.info(data.msgBody);
    //     }
    //   });
    // }),
,
  password: yup
    .string("Password must be string ")
    .required(()=>{
    NotificationManager.warning("Password is required");
    })
    .min(3, ()=>{
    NotificationManager.warning("Password  must be atleast 3 charachters");
    })
    .max(32, ()=>{
    NotificationManager.warning("Password  must atmost 32 chrachters");
    }),
  c_password: yup
    .string()
    .required(()=>{
    NotificationManager.warning("Confirm password is required");
    })
    .oneOf([yup.ref("password"), null], ()=>{
    NotificationManager.warning("Unmatched passwords");
    }),

  username: yup
    .string("Username must be string ")
    .required(()=>{
    NotificationManager.warning("Username is required ");
    })
    .min(3, ()=>{
    NotificationManager.warning("Username  must be atleast 3 charachters");
    })
    .max(32, ()=>{
    NotificationManager.warning("Username  must atmost 32 chrachters");
    }),
  // .test("Unique username", "Username already in taken", function (value) {
  //   return new Promise((resolve, reject) => {
  //     axios
  //       .post("http://localhost:3001/api/users/verify/username", {
  //         username: value,
  //       })
  //       .then((res) => {
  //         if (res.data.msg === "Username already been taken") {
  //         NotificationManager.error(res.data.msg);
  //           resolve(false);
  //         }
  //         resolve(true);
  //       });
  //   });
  // }),
});
/* Validation ends here */
/* Functional componennet starts here */

const Register = (props) => {
  const { register, handleSubmit } = useForm({
    resolver: yupResolver(schema),
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    criteriaMode: "firstError",
    shouldFocusError: true,
    shouldUnregister: true,
    defaultValues: {
      username: "",
      email: "",
      mobile: "",
      role: "",
      password: "",
      c_password: "",
    },
  });

  const [ setUser] = useState({ username: "", password: "", role: "" });
  let timerID = useRef(null);

  const resetForm = () => {
    setUser({ username: "", password: "", role: "" });
  };

  const onSubmit = (formData) => {
    AuthService.register(formData).then((data) => {
      const { message } = data;
    
      resetForm();
      if (!message.msgError) {
        timerID = setTimeout(() => {
          props.history.push("/login");
        }, 2000);
      }
    });
  };

  return (
    <div className="container-fluid h-100 container-register-form">
      <div className="row">
        <div className="mt-5 mb-5 col-md-4 col-sm-12 offset-sm-0 offset-md-4">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="p-0 m-0 card ">
            <div className="text-center card-header">
              <span>Sign In</span>
            </div>
            <div className="p-0 m-0 card-body ">
          
            <div className="flex-row mt-2 d-flex justify-content-center align-items-center">
              <label htmlFor="username" className="mr-2">
                Username
              </label>
              <input
                type="text"
                className="form-control form-control-sm custom-input-register"
                name="username"
                id="username"
                ref={register}
              />
            </div>
            <div className="flex-row mt-2 d-flex justify-content-center align-items-center">
              <label htmlFor="email" className="mr-2">
                Email
              </label>
              <input
                className="form-control form-control-sm custom-input-register"
                name="email"
                id="email"
                type="email"
                ref={register}
                required
              />
            </div>
            {/* <div className="flex-row mt-2 d-flex justify-content-center align-items-center">
              <label htmlFor="role" className="mr-2">
                Role
              </label>
              <input
                className="form-control form-control-sm custom-input-register"
                name="role"
                id="role"
                type="text"
                ref={register}
              />
            </div> */}
            <div className="flex-row mt-2 d-flex justify-content-center align-items-center">
              <label htmlFor="password" className="mr-2">
                Password
              </label>
              <input
                className="form-control form-control-sm custom-input-register"
                name="password"
                id="password"
                type="password"
                ref={register}
              />
            </div>
            <div className="flex-row mt-2 d-flex justify-content-center align-items-center">
              <label htmlFor="c_password" className="mr-2">
                Confirm password
              </label>
              <input
                className="form-control form-control-sm custom-input-register"
                name="c_password"
                id="c_password"
                type="password"
                ref={register}
              />
            </div>
            <div className="flex-row mt-2 d-flex justify-content-center align-items-center">
              <label htmlFor="mobile" className="mr-2">
                Mobile
              </label>
              <input
                className="form-control form-control-sm custom-input-register"
                name="mobile"
                id="mobile"
                type="number"
                ref={register}
              />
            </div>

           


         
            </div>
            <div className="text-center card-footer">
            <input className=" btn btn-success btn-sm custom-submit-btn" type="submit" />
            </div>
          </div>
          </form>
        </div>
    
      </div>
      <NotificationContainer />
    </div>
  );
};
export default Register;
