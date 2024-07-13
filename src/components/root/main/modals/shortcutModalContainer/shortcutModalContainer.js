"use client";

import { useContext, useState } from "react";

import { Context } from "@/utils/context";
import apiClient from "@/utils/apiClient";
import BasicButton from "@/components/root/layout/basicButton/basicButton";
import InputTable from "./inputTable/inputTable";
import Keyboard from "./keyboard/keyboard";
import "./shortcutModalContainer.scss";


export default function ShortcutModalContainer({closeModal}) {
  const { renderShortcutTable, shortcutValues } = useContext(Context);
  const [shortcutInfo, setShortcutInfo] = useState({ command:        "",
                                     keybinding:     "",
                                     when:           "",
                                     environment_id: 0 });

  function handleClick() {
    let conflicts_count = 0;
    let should_save = true;
    for (let shortcutValue of shortcutValues) {
      if (shortcutValue.key_binding === shortcutInfo.keybinding) {
        conflicts_count += 1;
      }
    }
    if (conflicts_count > 0) {
      should_save = window.confirm(`このショートカットキーは${conflicts_count}個の既存ショートカットと競合しています。\n ショートカットを登録しますか?`);
    }
    if (should_save) {
      const shortcut_info = { "shortcut_info": {
        ...shortcutInfo
      }}
      apiClient.post("/shortcuts", shortcut_info) 
        .then(function (response) {
          if (response.status == 201) {
            closeModal();
            renderShortcutTable();
          }
        })
        .catch(function (error) {
          console.log(error);
        })
    }
  }

  return (

    <div className="container">
      <div className="new-table">
        <InputTable shortcutInfo={shortcutInfo}
                    setShortcutInfo={setShortcutInfo} />
      </div>
      <div className="keyboard">
        <Keyboard/>
      </div>
        <BasicButton onclick={handleClick} 
                     value={"save"}/>
    </div>
  );
}