"use client";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

import "./garbageButton.scss"
import apiClient from '@/utils/apiClient';
import { useContext } from 'react';
import { Context } from '@/utils/context';

export default function GarbageButton({id}) {
  const { renderShortcutTable } = useContext(Context);

  function handleClick() {
    console.log("clicked");
    apiClient.delete(`/shortcuts/${id}`)
    .then(function(response) {
      console.log(response);
      if (response.status === 200) {
        renderShortcutTable();
      }
    })
    .catch(function(error) {
      console.log(error);
    })
  }

  return (
    <FontAwesomeIcon icon={faTrash} 
                      onClick={handleClick}
                      className='trash' />
  );
}