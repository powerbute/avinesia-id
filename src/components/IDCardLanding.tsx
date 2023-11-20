import NextImage from "@/components/NextImage";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import React, { useEffect } from "react";
import { useState } from "react"
import { AiOutlineHistory, AiOutlineLoading } from "react-icons/ai";
import { IoMdHeartEmpty } from "react-icons/io";
import { IoHeartOutline } from "react-icons/io5";
import { MdOutlinePolicy, MdOutlinePlayCircle, MdOutlinePauseCircle } from "react-icons/md";
import { CiHeart } from "react-icons/ci";
import dynamic from 'next/dynamic'

const LikeCompoennt = dynamic(() => import('@/components/LikeComponent'), { ssr: false })

export default function Passport({ passport }: { passport: { authData: any, userID: any } }) {
  const supabase = createClientComponentClient();
  const [loaded, setLoaded] = React.useState(false);
  const [userData, setUserData] = React.useState<any>({});
  const [rolesData, setRolesData] = React.useState<any>({});

  async function getUser(id: any) {
    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq("id", id)
      .single();
    setUserData(user);
  }

  async function getRolesData() {
    const { data: roles, error } = await supabase
      .from('roles')
      .select('*');
    setRolesData(roles);
  }

  useEffect(() => {
    if (loaded) return;
    getUser(passport.userID);
    getRolesData();
    if (userData?.id != null && rolesData?.length > 0) {
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

  return (
    <>
      {!loaded ?
        <div className='bg-dark2 shadow-inner shadow-dark3 rounded-2xl md:w-1/3 px-4 py-6'>
          <div className='flex flex-col gap-2'>
            <div className="flex justify-between">
              <div className='flex gap-2 md:gap-0 md:flex-col'>
                <div className="w-32 h-32 animate-pulse bg-dark4 rounded-2xl" />
                <div className='flex flex-col mt-2 gap-[2px]'>
                  <div className='font-bold text-3xl text-transparent bg-dark4 rounded-2xl animate-pulse w-fit'>DisplayName</div>
                  <div className='font-medium text-transparent bg-dark4 rounded-2xl animate-pulse w-fit'>Nickname</div>
                  <div className='text-transparent bg-dark4 rounded-2xl animate-pulse w-fit'>@userID</div>
                </div>
              </div>
              <div>
                <div className={"flex justify-center relative items-center text-transparent bg-dark4 w-fit animate-pulse pt-[1px] h-10 px-2 rounded-2xl "}>
                  <CiHeart size={32} className="relative text-dark3" />
                  <div>666</div>
                </div>
              </div>
            </div>
            <div className='flex flex-wrap gap-1 select-none'>
              <div className={'rounded-md px-2 py-0.5 bg-dark3 animate-pulse rounded-2xl text-transparent'}>Example role</div>
              <div className={'rounded-md px-2 py-0.5 bg-dark3 animate-pulse rounded-2xl text-transparent'}>Example role</div>
              <div className={'rounded-md px-2 py-0.5 bg-dark3 animate-pulse rounded-2xl text-transparent'}>Example role</div>
            </div>
          </div>
        </div>
        :
        <div className={'bg-dark2 shadow-inner shadow-dark3 rounded-2xl md:w-1/3 px-4 py-6' + (userData?.dateofissue?.substring(userData?.dateofissue?.length - 4) == "2021" ? "" : "")}>
          <div className={'flex flex-col gap-2' + (userData?.dateofissue?.substring(userData?.dateofissue?.length - 4) == "2021" ? "" : "")}>
            <div className="flex justify-between flex-col md:flex-row">
              <div className='flex gap-2 md:gap-0 md:flex-col'>
                <div className="relative w-fit">
                  <NextImage onError={(e) => {
                    e.currentTarget.srcset = "/Steve.webp";
                  }} width={128} height={128} alt='profile avatar' src={'https://visage.surgeplay.com/face/512/' + (userData?.nickname)} />
                  <span className="absolute bottom-0 right-0 flex justify-center items-center rounded-full h-6 w-6 bg-dark2">
                    <span className="inline-flex rounded-full h-4 w-4 bg-green-500"></span>
                  </span>
                </div>
                <div className='flex flex-col mt-2'>
                  <div className='font-bold text-3xl'>{userData?.surname}</div>
                  <div className='font-medium text-zinc-400 text-xl'>{userData?.nickname}</div>
                  <div className='text-zinc-500'>@user{passport.userID}</div>
                </div>
              </div>
              <div className="mt-1.5 md:mt-0">
                <div className={"flex justify-center bg-white hover:bg-gray-200 cursor-pointer relative items-center pt-[1px] h-10 px-2 rounded-2xl "}>
                  <CiHeart size={32} className="relative text-dark3" />
                  <div></div>
                </div>
              </div>
            </div>
            <div className='flex flex-wrap gap-1 select-none'>
              {userData?.roles?.map((e: any) =>
                <div key={makeid(5)} className={'rounded-md px-2 py-0.5 bg-' + (rolesData[e - 1]?.color)}>{rolesData[e - 1]?.name}</div>
              )}
            </div>
          </div>
        </div>
      }

    </>
  )
}