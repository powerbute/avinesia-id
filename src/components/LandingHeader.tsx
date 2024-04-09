import NextImage from "@/components/NextImage";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import React, { useEffect, useState } from "react";
import { IoMdSearch, IoMdNotificationsOutline } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import { MdLogin, MdLogout, MdOutlineAdminPanelSettings } from "react-icons/md";
import useLocalStorage from "use-local-storage";

export default function Passport({ passport }: { passport: { authData: any } }) {
  const supabase = createClientComponentClient();
  const [authData, setAuthData] = useLocalStorage<any>("authdata", {})
  const [session, setSession] = useLocalStorage("session", "");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!loaded) {
      setLoaded(true);
    }
  })

  return (
    <>
      {!loaded ?
        <header className='px-4 flex h-[56px] items-center justify-between'>
          <a className='hidden lg:flex items-end translation-transform hover:scale-105 text-lg gap-2' href='/'><img src='/AvinesiaFlag.png' className='w-14' /> <span className='font-bold bg-green-500 rounded-md px-[5px] py-[1px]'>ID</span></a>
          <div className='flex gap-4 justify-center w-full sm:w-fit sm:justify-start items-center select-none'>
            <div className='bg-dark4 animate-pulse rounded-2xl w-10 h-10 flex justify-center items-center'></div>
          </div>
        </header>
        :
        <header className='px-4 flex h-[56px] items-center justify-between'>
          <a className='hidden lg:flex items-end translation-transform hover:scale-105 text-lg gap-2' href='/'><img src='/AvinesiaFlag.png' className='w-14' /> <span className='font-bold bg-green-500 rounded-md px-[5px] py-[1px]'>ID</span></a>
          <div className='flex gap-4 justify-center w-full sm:w-fit sm:justify-start items-center select-none'>
            {session != "" ?
              <>
                {(passport.authData?.roles?.includes(1) || passport.authData?.roles?.includes(2) || passport.authData?.roles?.includes(6)) ? <div className='bg-white hover:bg-gray-200 rounded-2xl w-10 h-10 flex justify-center items-center cursor-pointer' onClick={() => window.open("/admin", "_self")}><MdOutlineAdminPanelSettings color='black' size={28} /></div> : null}
                <div className='bg-white hover:bg-gray-200 rounded-2xl w-10 h-10 flex justify-center items-center cursor-pointer' onClick={() => window.open("/settings", "_self")}><IoSettingsOutline color='black' size={28} /></div>
                <div className='bg-white hover:bg-gray-200 rounded-2xl w-10 h-10 flex justify-center items-center cursor-pointer'><IoMdNotificationsOutline color='black' size={28} /></div>
                <div className='bg-red-500 hover:bg-red-600 rounded-2xl w-10 h-10 flex justify-center items-center cursor-pointer' onClick={() => {
                  setSession("");
                  setAuthData({});
                  alert("Выход успешно выполнен!")
                  window.open("/", "_self")
                }}><MdLogout color='white' size={28} /></div></>
              : <div className='bg-green-500 hover:bg-green-600 rounded-2xl w-10 h-10 flex justify-center items-center cursor-pointer' onClick={() => {
                window.open("/auth", "_self")
              }}><MdLogin color='white' size={28} /></div>}
            {session != "" ? <div className='w-14 h-14 cursor-pointer' onClick={() => {
              window.open("/home", "_self")
            }}>
              <NextImage onError={(e) => {
                e.currentTarget.srcset = "/Steve.webp";
              }} width={56} height={56} alt='profile avatar' src={'https://avatar.spworlds.ru/face/512/' + (passport.authData?.nickname)} />
            </div> : null}
          </div>
        </header>
      }
    </>
  )
}