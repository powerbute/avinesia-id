import NextImage from "@/components/NextImage";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import React, { useEffect } from "react";
import { useState } from "react"
import { AiOutlineHistory, AiOutlineLoading } from "react-icons/ai";
import { MdOutlinePolicy, MdOutlinePlayCircle, MdOutlinePauseCircle } from "react-icons/md";

export default function Passport({ passport }: { passport: { authData: any, userID: any } }) {
  const supabase = createClientComponentClient();
  const [loaded, setLoaded] = React.useState(false);
  const [userData, setUserData] = React.useState<any>({});

  async function getUser(id: any) {
    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq("id", id)
      .single();
    setUserData(user);
  }

  useEffect(() => {
    if (loaded) return;
    getUser(passport.userID);
    if (userData?.id != null) {
      setLoaded(true);
    }
  })

  function makeid(length: any) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  }

  async function applyRating(rating1: any) {
    if (rating1 > 1000 || rating1 < -1000) {
      alert("Минимальный и максимальный рейтинг: -1000 и 1000!!")
      return;
    }
    const { error: a1 } = await supabase
      .from('users')
      .update({ rating: rating1 })
      .eq('id', userData?.id);
    getUser(passport.userID);
  }

  function renderRating(rating: any) {
    if (rating > 1000) return 100;
    if (rating < -1000) return 100;
    return rating
  }

  return (
    <>
      {!loaded ?
        <div className='bg-dark2 rounded-2xl px-4 py-6 select-none'>
          <div className='text-3xl font-bold text-transparent bg-dark4 animate-pulse rounded-2xl w-fit'>Соц. рейтинг</div>
          <div className={'mt-2 text-lg mb-1 text-start font-bold text-transparent bg-dark4 animate-pulse rounded-2xl w-fit'}>1000</div>
          <div className='flex w-full bg-dark4 animate-pulse rounded-2xl h-2'>
          </div>
        </div>
        :
        <div className={'bg-dark2 rounded-2xl px-4 py-6 select-none' + (userData?.dateofissue?.substring(userData?.dateofissue?.length - 4) == "2021" ? "" : "")}>
          <div className='text-3xl font-bold'>Соц. рейтинг</div>
          <div className={'mt-2 text-lg text-start font-bold' + (userData?.rating > 0 ? " text-green-500" : " text-red-500")}>{userData?.rating}</div>
          <div className='flex w-full bg-dark4 rounded-2xl h-2'>
            <div className='flex w-full justify-start'><div className={'h-2 rounded-2xl w-[' + (renderRating(Math.abs(userData?.rating) / 10)) + "%] " + (userData?.rating > 0 ? "bg-green-500" : "bg-red-500")}></div></div>
          </div>
          {passport.authData?.roles?.includes(1) ?
            <div className='grid grid-cols-6 w-full gap-2 mt-2'>
              <div className='bg-green-500 rounded-md p-1 cursor-pointer flex justify-center' onClick={() => {
                applyRating(userData?.rating + 1)
              }}>+1</div>
              <div className='bg-green-500 rounded-md p-1 cursor-pointer flex justify-center' onClick={() => {
                applyRating(userData?.rating + 5)
              }}>+5</div>
              <div className='bg-green-500 rounded-md p-1 cursor-pointer flex justify-center' onClick={() => {
                applyRating(userData?.rating + 10)
              }}>+10</div>
              <div className='bg-green-500 rounded-md p-1 cursor-pointer flex justify-center' onClick={() => {
                applyRating(userData?.rating + 20)
              }}>+20</div>
              <div className='bg-green-500 rounded-md p-1 cursor-pointer flex justify-center' onClick={() => {
                applyRating(userData?.rating + 50)
              }}>+50</div>
              <div className='bg-green-500 rounded-md py-1 cursor-pointer flex justify-center' onClick={() => {
                applyRating(userData?.rating + 100)
              }}>+100</div>
            </div>
            : null}
          {passport.authData?.roles?.includes(1) ?
            <div className='grid grid-cols-6 w-full gap-2 mt-2'>
              <div className='bg-red-500 rounded-md p-1 cursor-pointer flex justify-center' onClick={() => {
                applyRating(userData?.rating - 1)
              }}>-1</div>
              <div className='bg-red-500 rounded-md p-1 cursor-pointer flex justify-center' onClick={() => {
                applyRating(userData?.rating - 5)
              }}>-5</div>
              <div className='bg-red-500 rounded-md p-1 cursor-pointer flex justify-center' onClick={() => {
                applyRating(userData?.rating - 10)
              }}>-10</div>
              <div className='bg-red-500 rounded-md p-1 cursor-pointer flex justify-center' onClick={() => {
                applyRating(userData?.rating - 20)
              }}>-20</div>
              <div className='bg-red-500 rounded-md p-1 cursor-pointer flex justify-center' onClick={() => {
                applyRating(userData?.rating - 50)
              }}>-50</div>
              <div className='bg-red-500 rounded-md py-1 cursor-pointer flex justify-center' onClick={() => {
                applyRating(userData?.rating - 100)
              }}>-100</div>
            </div>
            : null}
        </div>
      }

    </>
  )
}