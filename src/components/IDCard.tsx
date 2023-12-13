import NextImage from "@/components/NextImage";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import React, { useEffect } from "react";
import { useState } from "react"
import { AiOutlineHistory, AiOutlineLoading } from "react-icons/ai";
import { IoMdHeartEmpty } from "react-icons/io";
import { IoHeartOutline } from "react-icons/io5";
import { MdOutlinePolicy, MdOutlinePlayCircle, MdOutlinePauseCircle, MdWork } from "react-icons/md";
import { CiHeart } from "react-icons/ci";
import dynamic from 'next/dynamic'

const LikeCompoennt = dynamic(() => import('@/components/LikeComponent'), { ssr: false })

export default function Passport({ passport }: { passport: { authData: any, userID: any, subsData: any, updatePage: any } }) {
  const supabase = createClientComponentClient();
  const [loaded, setLoaded] = React.useState(false);
  const [userData, setUserData] = React.useState<any>({});
  const [rolesData, setRolesData] = React.useState<any>({});
  const currentYear = 2023;

  function getColor() {
    if (currentYear - userData?.dateofissue?.substring(userData?.dateofissue?.length - 4) > 20) {
      return "bg-lime-600"
    }
    if (currentYear - userData?.dateofissue?.substring(userData?.dateofissue?.length - 4) > 10) {
      return "bg-indigo-600"
    }
    if (currentYear - userData?.dateofissue?.substring(userData?.dateofissue?.length - 4) > 5) {
      return "bg-amber-500"
    }
    if (currentYear - userData?.dateofissue?.substring(userData?.dateofissue?.length - 4) > 3) {
      return "bg-teal-600"
    }
    if (currentYear - userData?.dateofissue?.substring(userData?.dateofissue?.length - 4) > 1) {
      return "bg-cyan-600"
    }
    return "bg-dark4"
  }

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

  function checkSub() {
    if (passport.subsData?.includes(userData?.passid)) {
      return true;
    }
    return false;
  }

  async function sub() {
    if (userData?.passid == "LGS-P7nX10" || userData?.passid == "LGS-49fb3e") {
      alert("Нет прав")
      return;
    }
    let { data: users1 } = await supabase
      .from('subs')
      .select()
      .eq('passid1', passport.authData?.passid);
    if (users1 != null) {
      for (let g1 = 0; g1 < users1?.length; g1++) {
        if (users1[g1]?.passid2 == userData?.passid) {
          let { data: users2 } = await supabase
            .from('subs')
            .delete()
            .eq('id', users1[g1]?.id);
          alert("Подписка отменена!")
          getUser(passport.userID);
          passport.updatePage();
          return;
        }
      }
      let { data: users } = await supabase
        .from('subs')
        .insert({ passid1: passport.authData?.passid, passid2: userData?.passid })
      alert("Подписка оформлена!")
      getUser(passport.userID);
      passport.updatePage();
    }

  }

  return (
    <>
      {!loaded ?
        <div className={'bg-dark2 h-fit rounded-2xl px-4 py-6 w-fit'}>
          <div className={'flex flex-col gap-2'}>
            <div className="flex justify-between flex-col md:flex-row">
              <div className='flex gap-2 md:gap-0 md:flex-col'>
                <div className={"relative w-fit rounded-2xl " + getColor()}>
                  <div className="bg-dark2 animate-pulse w-[128px] h-[128px]"></div>
                </div>
                <div className='flex flex-col mt-2 gap-1'>
                  <div className='font-bold text-3xl text-transparent animate-pulse bg-dark4 rounded-2xl w-fit'>Displayname</div>
                  <div className='font-medium text-transparent animate-pulse bg-dark4 rounded-2xl text-xl w-fit'>Nickname</div>
                  <div className='text-transparent animate-pulse bg-dark4 rounded-2xl w-fit'>@userID</div>
                </div>
              </div>
              <div className="mt-1.5 md:mt-0 flex w-full gap-2 flex-col">
                <div className="flex justify-end">
                  <div className={"flex select-none w-fit justify-center relative items-center pt-[1px] h-10 px-2 rounded-2xl bg-dark4 animate-pulse text-transparent"}>
                    <CiHeart size={32} className="relative text-dark3 cursor-pointer" />
                    <div>1</div>
                  </div>
                  <div className="flex md:hidden bg-dark4 animate-pulse text-transparent p-2 rounded-2xl md:mt-4 flex justify-center text-lg font-bold">Подписан</div>
                </div>
              </div>
            </div>
            <div className='flex flex-wrap gap-1 select-none'>

              <div className={'rounded-md px-2 py-0.5 bg-dark3 animate-pulse text-transparent'}>Example role</div>
              <div className={'rounded-md px-2 py-0.5 bg-dark3 animate-pulse text-transparent'}>Example role</div>
              <div className={'rounded-md px-2 py-0.5 bg-dark3 animate-pulse text-transparent'}>Example role</div>
            </div>
            <div className="hidden md:flex bg-dark4 animate-pulse text-transparent p-2 rounded-2xl md:mt-4 flex justify-center text-lg font-bold">Подписан</div>
          </div>
        </div>
        :
        <div className={'bg-dark2 h-fit rounded-2xl px-4 py-6' + (userData?.dateofissue?.substring(userData?.dateofissue?.length - 4) == "2021" ? " shadow shadow-yellow-500" : "")}>
          <div className={'flex flex-col gap-2' + (userData?.dateofissue?.substring(userData?.dateofissue?.length - 4) == "2021" ? "" : "")}>
            <div className="flex justify-between flex-col md:flex-row">
              <div className='flex gap-2 md:gap-0 md:flex-col'>
                <div className={"relative w-fit rounded-2xl " + getColor()}>
                  <NextImage onError={(e) => {
                    e.currentTarget.srcset = "/Steve.webp";
                  }} width={128} height={128} alt='profile avatar' src={'https://visage.surgeplay.com/bust/512/' + (userData?.nickname)} />
                </div>
                <div className='flex flex-col mt-2'>
                  <div className='font-bold text-3xl'>{userData?.surname}</div>
                  <div className='font-medium text-zinc-400 text-xl'>{userData?.nickname}</div>
                  <div className='text-zinc-500'>@user{passport.userID}</div>
                </div>
              </div>
              <div className="mt-1.5 md:mt-0 flex w-full gap-2 flex-col">
                <div className="flex justify-end">
                  <LikeCompoennt passport={{ authData: passport.authData, userData: userData }} />
                  {passport.authData?.id != passport.userID && !(userData?.passid == "LGS-P7nX10" || userData?.passid == "LGS-49fb3e") ?
                    <>
                      {checkSub() == true ? <div className="flex md:hidden w-full bg-blue-500 hover:bg-blue-600 cursor-pointer p-1 rounded-2xl md:mt-4 flex justify-center text-lg font-bold" onClick={() => {
                        sub();
                      }}>Вы подписаны</div> :
                        <div className="flex md:hidden w-full bg-dark4 hover:bg-dark3 cursor-pointer p-1 rounded-2xl flex justify-center md:mt-4 text-lg font-bold" onClick={() => {
                          sub();
                        }}>Подписаться</div>}
                    </>
                    : null}
                  {(userData?.passid == "LGS-P7nX10" || userData?.passid == "LGS-49fb3e") ?
                    <div className="flex md:hidden w-full bg-blue-500 hover:bg-blue-600 cursor-pointer p-1 rounded-2xl md:mt-4 flex justify-center text-lg font-bold">Подписан</div>
                    : null}
                </div>
              </div>
            </div>
            <div className='flex flex-wrap gap-1 select-none'>
              {userData?.roles?.map((e: any) =>
                <div key={makeid(5)} className={'rounded-md px-2 py-0.5 bg-' + (rolesData[e - 1]?.color)}>{rolesData[e - 1]?.name}</div>
              )}
            </div>
            {passport.authData?.id != passport.userID && !(userData?.passid == "LGS-P7nX10" || userData?.passid == "LGS-49fb3e") ?
              <>
                {checkSub() == true ? <div className="hidden md:flex bg-blue-500 hover:bg-blue-600 cursor-pointer p-2 rounded-2xl md:mt-4 flex justify-center text-lg font-bold" onClick={() => {
                  sub();
                }}>Вы подписаны</div> :
                  <div className="hidden md:flex bg-dark4 hover:bg-dark3 cursor-pointer p-2 rounded-2xl flex justify-center md:mt-4 text-lg font-bold" onClick={() => {
                    sub();
                  }}>Подписаться</div>}
              </>
              : null}
            {(userData?.passid == "LGS-P7nX10" || userData?.passid == "LGS-49fb3e") ?
              <div className="hidden md:flex w-full bg-gradient-to-br from-[#FFD700] to-yellow-600 cursor-not-allowed p-1 rounded-2xl md:mt-4 flex justify-center text-lg font-bold">Вы подписаны</div>
              : null}
          </div>
        </div>
      }

    </>
  )
}