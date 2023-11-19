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
  const [rolesData, setRolesData] = React.useState<any>({});

  async function getUser(id: any) {
    let { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq("id", id)
      .single();
    setUserData(user);
  }

  async function getRolesData() {
    let { data: roles, error } = await supabase
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
        <div className='bg-dark2 rounded-2xl md:w-1/3 px-4 py-6'>
          <div className='flex flex-col gap-2'>
            <div className='flex gap-2 md:gap-0 md:flex-col'>
              <div className="w-32 h-32 animate-pulse bg-dark4 rounded-2xl" />
              <div className='flex flex-col mt-2 gap-[2px]'>
                <div className='font-bold text-3xl text-transparent bg-dark4 rounded-2xl animate-pulse w-fit'>DisplayName</div>
                <div className='font-medium text-transparent bg-dark4 rounded-2xl animate-pulse w-fit'>Nickname</div>
                <div className='text-transparent bg-dark4 rounded-2xl animate-pulse w-fit'>@userID</div>
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
        <div className='bg-dark2 rounded-2xl md:w-1/3 px-4 py-6'>
          <div className='flex flex-col gap-2'>
            <div className='flex gap-2 md:gap-0 md:flex-col'>
              <NextImage onError={(e) => {
                e.currentTarget.srcset = "/Steve.webp";
              }} width={128} height={128} alt='profile avatar' src={'https://visage.surgeplay.com/face/512/' + (userData?.nickname)} />
              <div className='flex flex-col mt-2'>
                <div className='font-bold text-3xl'>{userData?.surname}</div>
                <div className='font-medium text-zinc-400 text-xl'>{userData?.nickname}</div>
                <div className='text-zinc-500'>@user{passport.userID}</div>
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