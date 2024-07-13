"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";


import "./page.scss"
import apiClient from "@/utils/apiClient";

export default function Signup() {
  const router = useRouter();
  const [form, setForm] = useState({email:                "",
                                    password:             "",
                                    passwordConfirmation: ""})

  function handleForm(element) {
    setForm({
      ...form,
      [element.target.name]: element.target.value
    })
  }

  function handleClick() {
    const singup_info = {"signup_info": {
      "email":                form.email,
      "password":             form.password,
      "psssword_confirmation": form.passwordConfirmation
    }} 

    // TODO: エラーコンポーネントを作成して，エラーメッセージを表示する
    apiClient.post("/users", singup_info)
    .then(function (response) {
      if (response.status === 201) router.push('/');
    })
    .catch(function (error) {
    });
  }

  return (

    // TODO: コンポーネント化してログインフォームと統合
    // TODO: flashを作成する
    <div className="container">
      <div className="login-form">
        <div className="content">
          <form>
            <h1 className="form-title">sign up</h1>
            <div className="form-group">
              <input
                autoComplete="off"
                type=       "text"
                id=         "email"
                name=       "email"
                placeholder="email"
                required
                onChange={handleForm}
                value=   {form.value}
              />
            </div>
            <div className="form-group">
              <input
                autoComplete="off"
                type=       "password"
                id=         "password"
                name=       "password"
                placeholder="password"
                required
                onChange={handleForm}
                value=   {form.value}
              />
            </div>
            <div className="form-group">
              <input
                autoComplete="off"
                type=       "password"
                id=         "password-confirmation"
                name=       "passwordConfirmation"
                placeholder="password confirmation"
                required
                onChange={handleForm}
                value=   {form.value}
              />
            </div>
          </form>
        </div>
        <button className="form-button" 
                onClick={handleClick}>
          submit
        </button>
      </div>
    </div>

  )
}