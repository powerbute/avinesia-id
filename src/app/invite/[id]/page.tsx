'use client';

import Head from 'next/head';
import * as React from 'react';

import useLocalStorage from "use-local-storage";
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import NextImage from '@/components/NextImage';
import { IoMdCheckmarkCircleOutline } from 'react-icons/io';

export default function HomePage({ params }: { params: { id: string } }) {
  const inviteID = params.id;
  const [session, setSession] = useLocalStorage("session", "");
  const [authData, setAuthData] = useLocalStorage("authdata", {});
  const supabase = createClientComponentClient();
  const [a, setA] = React.useState(false);
  const [loaded, setLoaded] = React.useState(false);
  const [inviterData, setInviterData] = React.useState<any>({});

  const [input1, setInput1] = React.useState<any>();
  const [input2, setInput2] = React.useState<any>();
  const [input3, setInput3] = React.useState<any>();
  const [input4, setInput4] = React.useState<any>();
  const [input5, setInput5] = React.useState<any>();
  const [input6, setInput6] = React.useState<any>();
  const [input7, setInput7] = React.useState<any>();

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

  function makeid2(length: any) {
    let result = '';
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  }

  const [gID, setGID] = React.useState<any>();

  async function createAccount() {
    const passIDt = "LGS-" + makeid2(6);
    const Data = new Date();
    let issdata = Data.getDate() + "." + Data.getMonth() + "." + Data.getFullYear();
    if (input4 == "" || input3 == "" || input2 == "" || input1 == "") {
      alert("Все поля должны быть заполнены!")
      return;
    }
    const { data: data1 } = await supabase
      .from('users')
      .select('*')
      .eq('nickname', input1)
      .single()
    if (data1 != null) {
      alert("Никнейм занят!")
      return;
    }
    const { data: data2 } = await supabase
      .from('users')
      .select('*')
      .eq('tg', input4)
      .single()
    if (data2 != null) {
      alert("На один ТГ не может быть привязано больше 1 аккаунта")
      return;
    }
    let { error: a1 } = await supabase
      .from('users')
      .insert({ tg: input4, passid: passIDt, invitedby: inviterData?.nickname, nickname: input1, rating: 0, surname: input2, issuedby: "Правительство Авинесии", dateofissue: issdata, validuntil: "10.06.2025", status: 0, birthdate: input3 })
    setInput1("");
    setInput2("");
    setInput3("");
    setInput4("");
    setInput5("");
    setInput6("");
    setInput7("");
    //getUserData();
    setGID(passIDt)
    genSession(passIDt);
    alert("Успех!");
  }

  React.useEffect(() => {
    if (!loaded) {
      setLoaded(true);
      getInviter();
    }
  })

  async function getInviter() {
    const { data: data1 } = await supabase
      .from('invites')
      .select('*')
      .eq('code', inviteID)
      .single()
    const { data: data2 } = await supabase
      .from('users')
      .select('*')
      .eq('passid', data1?.passid)
      .single()
    setInviterData(data2);
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

    /*const { data, error } = await supabase
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
    }*/
  }

  return (
    <main className='bg-dark'>
      <Head>
        <title>Hi</title>
      </Head>
      <section className='bg-dark w-screen h-screen flex justify-center items-center'>
        <div className='flex flex-col gap-2 items-center'>
          <NextImage onError={(e) => {
            e.currentTarget.srcset = "/Steve.webp";
          }} width={128} height={128} alt='profile avatar' src={'https://visage.surgeplay.com/face/512/' + (inviterData?.nickname)} />
          <div className='text-3xl text-fond text-center text-white'>Вас приглашает {inviterData?.nickname}</div>
          <div className='md:w-[105%] mb-12 flex flex-col px-4 sm:px-8 py-4 sm:py-6 bg-dark2 rounded-2xl h-fit text-white'>
            <div className='flex justify-between items-center mb-4 select-none flex-col md:flex-row'>
              <div className='text-3xl font-bold flex items-center gap-2'>Анкета</div>
            </div>
            <div className='grid grid-cols-1 gap-2 md:gap-0 md:grid-cols-2 mb-4'>
              <div className='flex flex-col gap-0.5'>
                <div className='text-lg text-zinc-400'>Никнейм</div>
                <div className='flex gap-2'>
                  <input className='bg-dark2 border-dark3 border rounded-2xl' value={input1} onChange={(e) => {
                    setInput1(e.target.value)
                  }} />
                </div>
              </div>
              <div className='flex flex-col gap-0.5'>
                <div className='text-lg text-zinc-400'>Псевдоним</div>
                <div className='flex gap-2'>
                  <input className='bg-dark2 border-dark3 border rounded-2xl' value={input2} onChange={(e) => {
                    setInput2(e.target.value)
                  }} />
                </div>
              </div>
            </div>
            <div className='grid grid-cols-1 gap-2 md:gap-0 md:grid-cols-2 mb-4'>
              <div className='flex flex-col gap-0.5'>
                <div className='text-lg text-zinc-400'>Дата рождения</div>
                <div className='flex gap-2'>
                  <input className='bg-dark2 border-dark3 border rounded-2xl' value={input3} onChange={(e) => {
                    setInput3(e.target.value)
                  }} />
                </div>
              </div>
              <div className='flex flex-col gap-0.5'>
                <div className='text-lg text-zinc-400'>Telegram</div>
                <div className='flex gap-2'>
                  <input className='bg-dark2 border-dark3 border rounded-2xl' value={input4} onChange={(e) => {
                    setInput4(e.target.value)
                  }} />
                </div>
              </div>
            </div>
            <div className='flex justify-end'>
              <div className='w-10 h-10 bg-white rounded-2xl flex justify-center items-center hover:bg-gray-200 cursor-pointer' onClick={() => {
                createAccount();
              }}><IoMdCheckmarkCircleOutline color='black' size={28} /></div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
