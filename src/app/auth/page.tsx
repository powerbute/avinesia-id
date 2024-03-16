'use client';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import Head from 'next/head';
import * as React from 'react';
import useLocalStorage from 'use-local-storage';

export default function HomePage() {
  const [session, setSession] = useLocalStorage("session", "");
  const [authData, setAuthData] = useLocalStorage("authdata", {});
  const supabase = createClientComponentClient();

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

  async function genSession(passID: any) {
    let sess = makeid(256);
    const { error } = await supabase
      .from('sessions')
      .insert({ passid: passID, session: sess })
    setSession(sess);
    getProfile(passID);
  }

  async function getProfile(passID: any) {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('passid', passID)
      .single()
    setAuthData(data)
    location.replace("/user/" + data?.id);
  }

  async function getPassID(authID: any) {

    const { data, error } = await supabase
      .from('authcodes')
      .select('*')
      .eq('code', authID)
      .single()
    if (data != null) {
      genSession(data?.passid);
      const a = await supabase
        .from('authcodes')
        .delete()
        .eq('code', authID)
    } else {
      alert("Код недействительный!")
    }
  }

  return (
    <main className='bg-dark'>
      <Head>
        <title>Hi</title>
      </Head>
      <section className='bg-dark min-w-screen min-h-screen py-4 mx-auto text-white xl:w-[1280px] flex flex-col justify-center items-center text-center'>
        <div className='flex flex-col gap-6 bg-dark2 rounded-2xl justify-around items-center p-8 w-1/2'>
          <div className='text-2xl font-bold text-center'>Авторизация</div>
          <div className='flex justify-center w-full'>
            <input placeholder='Укажите код авторизации' type='text' className='inputg bg-dark border-none rounded-md p-2 text-sm w-full' onChange={(e) => handleAuth(e)} />
          </div>
          <div className='flex justify-center gap-2'>
            <div><a className='text-blue-500 cursor-pointer hover:text-blue-600' href='https://t.me/avinesiabot'>Telegram-бот</a> или обратитесь к правительству</div>
          </div>
        </div>
        <div className='hidden flex-col'>
          <div className='text-8xl font-bold text-center'>Авторизация</div>
          <div className='flex mt-4 justify-center w-full mb-2 items-center border border-dark3 rounded-md select-none px-2'>
            <input maxLength={6} type='number' placeholder='Код авторизации' className='bg-dark border-none focus:ring-transparent py-2 text-sm w-full' onChange={(e) => handleAuth(e)} />
          </div>
        </div>
        <div className='hidden text-4xl'>Для авторизации на сайте воспользуйтесь <span className='text-blue-500 hover:text-blue-600 cursor-pointer' onClick={() => {
          window.open('https://t.me/avinesiabot', '_blank');
        }}>нашим Telegram ботом</span> или обратитесь к Правительству</div>
      </section>
    </main>
  );
}
