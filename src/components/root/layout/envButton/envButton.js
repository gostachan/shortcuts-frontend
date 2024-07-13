"use client";
import { Context } from "@/utils/context";
import "./envButton.scss";
import { useContext, useState } from "react";

export default function EnvButton({env, className}) {
  const { envBtnsClickStates, setEnvBtnsClickStates } = useContext(Context);
  // HACK: 計算量がまーまー多い O(n * n)
  const [clicked, setClicked] = useState(envBtnsClickStates.includes(env.id) ? true : false);


  function toggleClicked() {
    setClicked(!clicked);
    if (clicked) {
      setEnvBtnsClickStates(envBtnsClickStates.filter(item => item !== env.id));
    } else {
      setEnvBtnsClickStates([...envBtnsClickStates, env.id]);
    }
  }


  return (
    <button className={`env-button ${clicked ? "env-on" : "env-off"} ${className}`}
            onClick={toggleClicked}>
      {env.name}
    </button>
  );
} 