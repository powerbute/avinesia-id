'use client';

import Head from 'next/head';
import * as React from 'react';

import useLocalStorage from "use-local-storage";
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export default function HomePage({ params }: { params: { id: string } }) {
  const authID = params.id;
  const [session, setSession] = useLocalStorage("session", "");
  const [authData, setAuthData] = useLocalStorage("authdata", {});
  const supabase = createClientComponentClient();
  const [a, setA] = React.useState(false);

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

  async function getPassID() {
    if (a == true) return;

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
      <section className='bg-dark w-screen h-screen flex justify-center items-center'>
        <div className='flex flex-col gap-2'>
          <img src='/logo.png' className='animate-pulse' width={256} />
          <div className='text-3xl text-fond text-center text-white'>Авторизация...</div>
          <div className='bg-zinc-700 hover:bg-zinc-600 cursor-pointer text-white p-2 flex justify-center rounded-2xl' onClick={() => {
            if (a == false) {
              getPassID();
              setA(true);
            }
          }}>
            <div className='text-lg'>Я не робот</div>
          </div>
        </div>
      </section>
    </main>
  );
}
