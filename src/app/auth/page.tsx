'use client';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import Head from 'next/head';
import * as React from 'react';
import { FaCopy, FaIdCard, FaTelegram } from 'react-icons/fa6';
import useLocalStorage from 'use-local-storage';

export default function HomePage() {
  const [session, setSession] = useLocalStorage("session", "");
  const [authData, setAuthData] = useLocalStorage("authdata", {});
  const supabase = createClientComponentClient();

  const [authMode, setAuthMode] = React.useState(0);

  const [isClient, setIsClient] = React.useState(false)

  const [authCode1, setAuthCode1] = useLocalStorage("authreq", "0");
  const [authCode, setAuthCode2] = React.useState<any>("0");

  React.useEffect(() => {
    setAuthCode(authCode1);
    setIsClient(true)
  }, [])

  async function setAuthCode(code: any) {
    setAuthCode1(code);
    if (code != "0") {
      getPassID(code);
    }
    setAuthCode2(code);
  }

  supabase
    .channel('room1')
    .on('postgres_changes', { event: '*', schema: 'public', table: 'authReq' }, payload => {
      getPassID(authCode);
    })
    .subscribe()

  async function handleAuth(e: any) {
    if (e.target.value.length >= 6) {
      getPassID(e?.target?.value)
    }
  }

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

  function makeCode(length: any) {
    let result = '';
    const characters = '0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  }

  async function genCode() {
    const code: any = makeCode(6);
    setAuthCode(code);
    let { error: a1 } = await supabase
      .from('authReq')
      .insert({ code: code })
    console.log("AUTH CODE GEN COMPLETE! code: " + code)
  }

  async function genSession(passID: any, authID: any) {
    if (passID == null) return;
    setAuthCode("0");
    let sess = makeid(256);
    const { error } = await supabase
      .from('sessions')
      .insert({ passid: passID, session: sess })
    setSession(sess);
    if (authMode == 0) {
      const a = await supabase
        .from('authReq')
        .delete()
        .eq('code', authID)
    }
    if (authMode == 1) {
      const a = await supabase
        .from('authcodes')
        .delete()
        .eq('code', authID)
    }
    getProfile(passID);
  }

  async function getProfile(passID: any) {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('passid', passID)
      .single()
    setAuthData(data)
    window.open("/home", "_self");
  }

  async function getPassID(authID: any) {
    if (authMode == 1) {
      const { data, error } = await supabase
        .from('authcodes')
        .select('*')
        .eq('code', authID)
        .single()
      if (data != null) {
        genSession(data?.passid, authID);
      }
    }
    if (authMode == 0) {
      const { data, error } = await supabase
        .from('authReq')
        .select('*')
        .eq('code', authID)
        .single()
      if (data != null) {
        genSession(data?.passid, authID);
      }
    }
  }

  return (
    <main className='bg-dark'>
      <Head>
        <title>Hi</title>
      </Head>
      <section className='bg-dark min-w-screen min-h-screen py-4 mx-auto text-white xl:w-[1280px] flex flex-col justify-center items-center text-center'>
        <div className='flex flex-col gap-6 bg-dark2 h-[70vh] rounded-2xl items-center py-8 px-2 md:w-1/2'>
          <div className='text-2xl font-bold text-center'>Авторизация</div>
          <div className='grid grid-cols-2 w-full select-none'>
            <div className={'rounded-l-2xl cursor-pointer p-2 ' + (authMode == 1 ? "bg-dark5 hover:bg-dark4" : "bg-blue-500 hover:bg-blue-500")} onClick={() => setAuthMode(0)}>Новый способ</div>
            <div className={'rounded-r-2xl cursor-pointer p-2 ' + (authMode == 0 ? "bg-dark5 hover:bg-dark4" : "bg-blue-500 hover:bg-blue-500")} onClick={() => setAuthMode(1)}>Старый способ</div>
          </div>
          {authMode == 0 &&
            <div className='flex flex-col justify-between h-full md:pt-8 gap-2 md:gap-4 w-full'>
              <div className='flex flex-col'>
                <div className='mb-1 font-bold text-lg'>Ваш код авторизации</div>
                <div className='mb-8'>Вставьте его в чат с Telegram ботом, чтобы авторизоваться на сайте</div>
                {authCode != null && (isClient && authCode.length > 5) ?
                  <div className='flex gap-2 justify-center select-none'>
                    <div className='bg-dark4 md:text-4xl text-2xl p-2 rounded-md flex justify-center items-center md:w-14 md:h-14 w-10 h-10'>{String([authCode[0]])}</div>
                    <div className='bg-dark4 md:text-4xl text-2xl p-2 rounded-md flex justify-center items-center md:w-14 md:h-14 w-10 h-10'>{authCode[1]}</div>
                    <div className='bg-dark4 md:text-4xl text-2xl p-2 rounded-md flex justify-center items-center md:w-14 md:h-14 w-10 h-10'>{authCode[2]}</div>
                    <div className='bg-dark4 md:text-4xl text-2xl p-2 rounded-md flex justify-center items-center md:w-14 md:h-14 w-10 h-10'>{authCode[3]}</div>
                    <div className='bg-dark4 md:text-4xl text-2xl p-2 rounded-md flex justify-center items-center md:w-14 md:h-14 w-10 h-10'>{authCode[4]}</div>
                    <div className='bg-dark4 md:text-4xl text-2xl p-2 rounded-md flex justify-center items-center md:w-14 md:h-14 w-10 h-10'>{authCode[5]}</div>
                  </div> :
                  <div className='flex gap-2 justify-center select-none'>
                    <div className='bg-dark4 md:text-4xl text-2xl p-2 rounded-md flex justify-center items-center md:w-14 md:h-14 w-10 h-10'></div>
                    <div className='bg-dark4 md:text-4xl text-2xl p-2 rounded-md flex justify-center items-center md:w-14 md:h-14 w-10 h-10'></div>
                    <div className='bg-dark4 md:text-4xl text-2xl p-2 rounded-md flex justify-center items-center md:w-14 md:h-14 w-10 h-10'></div>
                    <div className='bg-dark4 md:text-4xl text-2xl p-2 rounded-md flex justify-center items-center md:w-14 md:h-14 w-10 h-10'></div>
                    <div className='bg-dark4 md:text-4xl text-2xl p-2 rounded-md flex justify-center items-center md:w-14 md:h-14 w-10 h-10'></div>
                    <div className='bg-dark4 md:text-4xl text-2xl p-2 rounded-md flex justify-center items-center md:w-14 md:h-14 w-10 h-10'></div>
                  </div>
                }
              </div>
              <div className='flex flex-col gap-2 w-full select-none'>
                {authCode == "0" ?
                  <div className='p-4 rounded-2xl bg-dark5 flex items-center justify-center gap-2 hover:bg-dark4 cursor-pointer w-full' onClick={() => genCode()}><FaIdCard /> Сгенерировать</div>
                  :
                  <div className='p-4 rounded-2xl bg-dark5 flex items-center justify-center gap-2 hover:bg-dark4 cursor-pointer w-full' onClick={() => {
                    navigator.clipboard.writeText(authCode);
                    alert("Скопировано!")
                  }}><FaCopy /> Скопировать</div>}
                <div onClick={() => {
                  window.open("https://t.me/avinesiabot")
                }} className='p-4 rounded-2xl bg-[#1c93e3] flex items-center justify-center gap-2 hover:bg-[#1a8ad5] cursor-pointer w-full'><FaTelegram /> Telegram-бот</div>
              </div>
            </div>
          }
          {authMode == 1 &&
            <div className='flex flex-col justify-center h-full gap-4 w-full'><div className='flex justify-center w-full'>
              <input placeholder='Укажите код авторизации' type='text' className='inputg w-full bg-dark border-none rounded-md p-2 text-sm w-full' onChange={(e) => handleAuth(e)} />
            </div>
              <div className='flex justify-center gap-2'>
                <div><a className='text-blue-500 cursor-pointer hover:text-blue-600' href='https://t.me/avinesiabot'>Telegram-бот</a> или обратитесь к правительству</div>
              </div></div>}
        </div>
      </section>
    </main >
  );
}
