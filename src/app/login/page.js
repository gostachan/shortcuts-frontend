"use client";

// FIXME: フォント崩れてる

import { useState } from "react";
import { useRouter } from "next/navigation";

import "./page.scss";
import apiClient from "@/utils/apiClient";

export default function Login() {
  const router = useRouter();
  const [form, setForm]       = useState({ email:     "",
                                           password:  "" })
  const [isChecked, setCheck] = useState(false);

  function handleForm(element) {
    setForm({
      ...form,
      [element.target.name]: element.target.value
    });
  };

  function handleCheckboxChange() {
    setCheck(!isChecked);
  }

  function handleClick() {
    const login_info = { "login_info": { "email":      form.email,
                                         "password":   form.password,
                                         "isChecked":  isChecked }}

    apiClient.post("/login", login_info)
    .then(function (response) {
      if (response.status == 200) router.push('/');
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  return (

    // TODO: コンポーネント化してログインフォームと統合
    <div className="container">
      <div className="login-form">
        <div className="content">
          <form>
            <h1 className="form-title">log in</h1>
            <div className="form-group">
              <input
                type=       "text"
                id=         "email"
                name=       "email"
                placeholder="email"
                required
                onChange={handleForm}
                value=   {form.email}
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
                value=   {form.password}
              />
            </div>
            <p className="remember-box">
              <input 
                autoComplete="off"
                type="checkbox" 
                checked={isChecked} 
                onChange={handleCheckboxChange} 
              />
              ログイン情報を保存する
            </p>
            <div className="forgot-pass">
              <a href="#">パスワードを忘れた</a>
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