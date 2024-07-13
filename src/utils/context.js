"use client";

import { createContext, useEffect, useState } from "react";
import apiClient from "@/utils/apiClient";

export const Context = createContext();

export default function ContextComponent({ children }) {
  const [shortcutValues, setShortcutValues] = useState([]);
  const [environments,   setEnvironments]   = useState([]);
  const [editBtnClicked, toggleEditBtn]     = useState(false);
  const [envBtnsClickStates, setEnvBtnsClickStates] = useState([]);

  useEffect(() => {
    renderShortcutTable();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [envBtnsClickStates]);

  function renderShortcutTable() {
    const env_ids = { "env_ids": [...envBtnsClickStates] };
    apiClient.get(`/shortcuts`, { params: env_ids })
      .then(function (response) {
        console.log(response);
        setShortcutValues(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function renderEnvBtns() {
    apiClient.get(`/environments`)
    .then(function (response) {
      const tmp_envs = [];
      for (const env of response.data.environments) {
        tmp_envs.push(env);
      }
      setEnvironments(tmp_envs);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  return (
    <Context.Provider value={{ shortcutValues, 
                               environments,
                               editBtnClicked, 
                               envBtnsClickStates,
                               toggleEditBtn,
                               renderShortcutTable,
                               setEnvBtnsClickStates,
                               renderEnvBtns }}>
      {children}
    </Context.Provider>
  );
}