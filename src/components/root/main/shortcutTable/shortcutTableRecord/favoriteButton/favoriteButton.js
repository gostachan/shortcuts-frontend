"use client";

import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

import "./favoriteButton.scss"
import apiClient from '@/utils/apiClient';

export default function FavoriteButton({id, favoriteVal}) {

  const [favorite, setFavorite] = useState(favoriteVal);


  function toggleFavorite() {
    setFavorite(!favorite);

    // SEARCH: 下のオブジェクトのfavoriteの値が !favorite になるのはなぜ？
    //   多分stateが更新されるのは関数が処理されたあとだから
    const shortcut_info = { "shortcut_info": { "favorite": !favorite } }
    apiClient.put(`/shortcuts/${id}`, shortcut_info)
  };

  return (
    <FontAwesomeIcon 
      icon={faHeart} 
      className={favorite ? "favorite" : "non-favorite"}
      onClick={toggleFavorite} 
    />
  );
}
