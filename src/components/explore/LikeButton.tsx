"use client";

import classNames from "classnames";
import { useLayoutEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { set } from "zod";

export default function LikeButton(props: { instrument: string; id: number }) {
  const { instrument, id } = props;

  const [liked, setLiked] = useState(false);

  useLayoutEffect(() => {
    if (!window) return;
    const likedItems = window.localStorage.getItem("likedItems");
    if (!likedItems) return setLiked(false);
    const parsedLikedItems = JSON.parse(likedItems);
    if (!parsedLikedItems) return setLiked(false);
    const isLiked = !!parsedLikedItems[`${instrument}-${id}`];
    setLiked(isLiked);
  }, [setLiked, instrument, id]);

  const toggleLiked = () => {
    const likedKey = `${instrument}-${id}`;
    if (!window) return;
    const likedItems = window.localStorage.getItem("likedItems");
    setLiked((l) => !l);
    if (!likedItems)
      return window.localStorage.setItem(
        "likedItems",
        JSON.stringify({ [likedKey]: true })
      );
    const parsedLikedItems = JSON.parse(likedItems);
    if (!parsedLikedItems)
      return window.localStorage.setItem(
        "likedItems",
        JSON.stringify({ [likedKey]: true })
      );
    if (parsedLikedItems[likedKey]) {
      delete parsedLikedItems[likedKey];
      return window.localStorage.setItem(
        "likedItems",
        JSON.stringify(parsedLikedItems)
      );
    }
    parsedLikedItems[likedKey] = true;
    window.localStorage.setItem("likedItems", JSON.stringify(parsedLikedItems));
  };

  return (
    <button
      className={classNames(
        "btn btn-circle btn-sm border-[1px] border-primary-border text-base",
        "hover:border-red-600 hover:text-white hover:bg-red-600",
        "transition-colors duration-300",
        liked
          ? "border-red-600 bg-red-600 text-white"
          : "bg-transparent text-primary-border"
      )}
      onClick={toggleLiked}
    >
      <FaHeart />
    </button>
  );
}
