'use client';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import Head from 'next/head';
import { useSearchParams } from 'next/navigation';
import * as React from 'react';
import { FaCopy, FaIdCard, FaTelegram } from 'react-icons/fa6';
import useLocalStorage from 'use-local-storage';

export default function HomePage() {
  const [session, setSession] = useLocalStorage("session", "");
  const [authData, setAuthData] = useLocalStorage<any>("authdata", {});
  const [loaded, setLoaded] = React.useState(false);
  const supabase = createClientComponentClient();

  const searchParams = useSearchParams()

  const search = searchParams.get('app')

  const vote = searchParams.get('vote')

  React.useEffect(() => {
    if (!loaded) {
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

  return (
    <main className='bg-dark'>
      <Head>
        <title>Hi</title>
      </Head>
      <section className='bg-dark min-w-screen min-h-screen py-4 mx-auto text-white xl:w-[1280px] flex flex-col justify-center items-center text-center'>
        {(loaded && session != "") &&
          <div className='flex flex-col gap-6 bg-dark2 h-[70vh] rounded-2xl justify-between items-center py-8 px-2 md:w-1/2'>
            <div className='flex flex-col gap-4'>
              <div className='text-2xl font-bold text-center'>Авторизация</div>
              <div className='flex flex-col items-center'>
                <div>Сайт {search} получит доступ к следующим данным аккаунта {authData?.nickname}:</div>
                <ul className='list-disc text-start'>
                  <li>Никнейм</li>
                  <li>PassID</li>
                  <li>Информация о гражданстве или турвизе</li>
                  <li>Telegram и Discord</li>
                  <li>Информация вашего профиля</li>
                </ul>
              </div>
            </div>
            <div className='p-4 rounded-2xl bg-dark5 flex items-center justify-center gap-2 hover:bg-dark4 cursor-pointer w-full' onClick={() => {
              if (vote != null) {
                window.open("https://" + search + "/auth?key=" + session + "&vote=" + vote, "_self")
              } else {
                window.open("https://" + search + "/auth?key=" + session, "_self")
              }
            }}><FaIdCard /> Продолжить</div>

          </div>}
      </section>
    </main >
  );
}
