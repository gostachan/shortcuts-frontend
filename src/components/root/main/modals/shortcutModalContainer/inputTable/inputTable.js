"use client";

import React, { useEffect, useState } from "react";

import "./inputTable.scss"
import CustomSelect from "@/components/layout/customSelect/customSelect";
import apiClient from "@/utils/apiClient";


export default function InputTable({shortcutInfo, setShortcutInfo}) {
  let columns = ["keybinding", "command", "when", "environment"]

  const [options, setOptions] = useState([]);
  const [selectedEnvId, setSelectedEnvId] = useState(0);

  function onUpdate(element) {
    setShortcutInfo({
      ...shortcutInfo,
      [element.target.name]: element.target.value
    });
  }


  // FIXME: useEffect使わないでいけそう
  useEffect(() => {
    setShortcutInfo({
      ...shortcutInfo,
      environment_id: selectedEnvId
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedEnvId])


  useEffect(() => {
    apiClient.get(`/environments`)
    .then(function (response) {
      const tmp_options = [];
      for (const env of response.data.environments) {
        // FIXME: valueとlavelを二つに分ける必要はない
        const tmp_option = { id: env.id, value: env.name, label: env.name }
        tmp_options.push(tmp_option);
      }
      setOptions(tmp_options);
    })
    .catch(function (error) {
      console.log(error);
    });
  }, []); 



  return (
    <div className="input-table">
      <div className="record record-first">
        {columns.map((column, index) => {
          return (
            <React.Fragment key={index}>
              <div className={`column column-${index + 1}`}>
                <h5>{column}</h5>
              </div>
            </React.Fragment>
          )
        })}
      </div> 


      {/* HACK: valueに値を持たせるフォームの方が良い？ */}
      <div className="record record-last">
        <div className="column column-1">
          <input type="text" 
                 autoComplete="off"
                 name="keybinding"
                 onChange={onUpdate}/>
        </div>
        <div className="column column-2">
          <input type="text" 
                 autoComplete="off"
                 name="command"
                 onChange={onUpdate}/>
        </div>
        <div className="column column-3">
          <input type="text" 
                 autoComplete="off"
                 name="when"
                 onChange={onUpdate}/>
        </div>
        <div className="column column-4">
          <div className="center">
            <CustomSelect options={options} 
                          placeholder="Option" 
                          setSelectedEnvId={setSelectedEnvId}
                          className="sources" />
          </div>
        </div>
      </div>
    </div>
  );
}