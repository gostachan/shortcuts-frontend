"use client";

import React, { useContext, useEffect, useState } from "react";

import ShortcutTableRecord from "./shortcutTableRecord/shortcutTableRecord";
import "./shortcutTable.scss";
import { Context } from "@/utils/context";

export default function ShortcutTable() {
  // 下の行に削除すべき項目あり
  const { editBtnClicked ,shortcutValues } = useContext(Context);
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    if (editBtnClicked) {
      setColumns(["remove", "keybinding", "command", "when", "environment"]);
    } else {
      setColumns(["favorite", "keybinding", "command", "when", "environment"]);
    }
  }, [editBtnClicked])

  return (
    <div className="shortcut-table">
      <div className="record record-first">
        {columns.map((column, index) => {
          return (
            <React.Fragment key={index}>
              <div className={`column column-${index + 1}`}>
                <h5>{column}</h5>
              </div>
            </React.Fragment>
          );
        })}
      </div>
      {shortcutValues.map((valueSet, index) => {
        return (
          <React.Fragment key={valueSet.id}>
            <ShortcutTableRecord value={valueSet}
                                 className={((index === shortcutValues.length - 1) ? "record-last" : "")} />
          </React.Fragment>
        );
      })}
    </div>
  );
}