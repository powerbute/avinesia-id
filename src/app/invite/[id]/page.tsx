'use client';

import Head from 'next/head';
import * as React from 'react';

import useLocalStorage from "use-local-storage";
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import NextImage from '@/components/NextImage';
import { IoMdCheckmarkCircleOutline } from 'react-icons/io';
import moment from 'moment';

export default function HomePage({ params }: { params: { id: string } }) {
  const inviteID = params.id;
  const [session, setSession] = useLocalStorage("session", "");
  const [authData, setAuthData] = useLocalStorage("authdata", {});
  const supabase = createClientComponentClient();
  const [a, setA] = React.useState(false);
  const [loaded, setLoaded] = React.useState(false);
  const [inviterData, setInviterData] = React.useState<any>({});

  const [step, setStep] = React.useState(0);

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
    let issdata = Data.getDate() + "." + (Data.getMonth() + 1) + "." + Data.getFullYear();
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
    let date = moment().add(7, "days").format();
    let { error: a1 } = await supabase
      .from('users')
      .insert({ tg: input4, discord: input5, passid: passIDt, invitedby: inviterData?.passid, nickname: input1, surname: input2, issuedby: "Правительство Авинесии", status: 4, birthdate: input3, validuntil: date })
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

  const [started, setStarted] = React.useState(false);

  async function runReg() {
    if (started) return;
    setStarted(true);
    setTimeout(() => {
      setStep(1);
    }, 2000)
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

  const [region, setRegion] = React.useState(0);
  const [_hst_rgclose, set_hst_rgclose] = React.useState(false);

  const [inoagent, setInoagent] = React.useState(true);
  const [state, setState] = React.useState(0);//VIZA
  const [_vit_vzclose, set_vit_vzclose] = React.useState(false);//VIZA

  //sobrania
  const today = new Date();
  const daysUntilNextThursday = (4 - today.getDay() + 7) % 7;
  const daysUntilNextSaturday = (6 - today.getDay() + 7) % 7;

  const nextThursday = new Date(today.getFullYear(), today.getMonth(), today.getDate() + daysUntilNextThursday);
  const nextSaturday = new Date(today.getFullYear(), today.getMonth(), today.getDate() + daysUntilNextSaturday);

  const [surname, setSurname] = React.useState<any>("");
  const [nickname, setNickname] = React.useState<any>("");
  const [birthdate, setBirthdate] = React.useState<any>("");
  const [telegram, setTelegram] = React.useState<any>("");
  const [discord, setDiscord] = React.useState<any>("");
  const [cid, setCID] = React.useState<any>("");

  const [passIDStep, setPassIDStep] = React.useState(0);
  const [passID, setPassID] = React.useState<any>("");

  async function checkNickname() {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('nickname', nickname)
      .single()
    if (data != null) {
      return false;
    } else {
      return true;
    }
  }

  async function checkTelegram() {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('tg', telegram)
      .single()
    if (data != null) {
      return false;
    } else {
      return true;
    }
  }

  async function checkDiscord() {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('discord', discord)
      .single()
    if (data != null) {
      return false;
    } else {
      return true;
    }
  }

  async function checkCID() {
    const { data, error } = await supabase
      .from('cid')
      .select('*')
      .eq('name', cid)
      .single()
    if (data != null) {
      return false;
    } else {
      return true;
    }
  }

  async function genPassID() {
    setPassID("");
    setPassIDStep(0);
    setPassIDStep(1);
    setTimeout(() => {
      const passIDt = "LGS-" + makeid2(6);
      setPassID(passIDt)
      setPassIDStep(2);
    }, 2300)
  }

  async function regAcc() {
    let rRG = "LGS";
    let issueDate = moment().format();
    let issueDate1 = moment().add(7, "days").format();
    if (region == 1) {
      rRG = "HST"
    }

    if (await checkNickname() && await checkTelegram() && await checkDiscord() && await checkCID()) {
      const { error } = await supabase
        .from('users')
        .insert({ tg: telegram, discord: discord, passid: passID, surname: surname, birthdate: birthdate, issuedby: "Правительство Авинесии", nickname: nickname, residenceregion: rRG, dateofssiue: issueDate, validuntil: issueDate1 })
    } else {
      alert("Что-то пошло не так... Повторите попытку")
    }
  }

  async function regAccF() {
    let rRG = "LGS";
    let inoagentCountry = "KMR";
    let issueDate = moment().format();
    let issueDate1 = moment().add(14, "days").format();
    if (region == 1) {
      rRG = "HST"
    }

    if (await checkNickname() && await checkTelegram() && await checkDiscord() && await checkCID()) {
      const { error } = await supabase
        .from('users')
        .insert({ tg: telegram, discord: discord, passid: passID, surname: surname, birthdate: birthdate, issuedby: "Правительство Авинесии", nickname: nickname, residenceregion: rRG, dateofssiue: issueDate, validuntil: issueDate1, foreigner: inoagentCountry })
    } else {
      alert("Что-то пошло не так... Повторите попытку")
    }
  }

  return (
    <main className='bg-dark'>
      <Head>
        <title>Hi</title>
      </Head>
      <section className='bg-dark w-screen h-screen flex justify-center w-full items-center'>
        <div className={'flex flex-col gap-2 items-center px-6 md:w-1/3 py-16 ' + (step == 12 ? "h-full" : "h-full md:h-1/2 md:p-0")}>
          <div className='hidden text-3xl text-fond text-center text-white'>Вас приглашает {inviterData?.nickname}</div>
          {step == 0 &&
            <div className='flex flex-col text-white h-full'>
              <div className='flex justify-between h-full items-center mb-4 select-none flex-col gap-1'>
                <div className='flex flex-col gap-1 items-center'>
                  <div className='text-3xl font-bold flex items-center gap-2'>Добро пожаловать в Авинесию</div>
                  <div className='font-semibold text-xl text-dark3 mb-4'>Сейчас мы поможем тебе зарегистрироваться в Авинесия ID...</div>
                  <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/People%20with%20professions/Man%20Police%20Officer%20Dark%20Skin%20Tone.png" alt="Man Police Officer Dark Skin Tone" />
                </div>
                {!started && <div className='animate-bounce w-full text-center font-bold bg-blue-500 hover:bg-blue-600 select-none cursor-pointer rounded-2xl p-4' onClick={() => runReg()}>Начать</div>}
              </div>
            </div>
          }
          {step == 1 &&
            <div className='flex flex-col w-full h-full text-white'>
              <div className='flex justify-between w-full h-full items-center mb-4 select-none flex-col gap-4'>
                <div className='flex flex-col gap-12 w-full items-center'>
                  <div className='flex flex-col items-center'>
                    <div className='text-3xl font-bold flex items-center text-center gap-2'>Как вас звать?</div>
                    <div className='text-lg w-full text-center'>Это будет указано в графе Псевдоним, может быть использовано публично и в СМИ, используйте кириллицу, не указывайте сюда свое настоящее имя или фамилию</div>
                  </div>
                  <input value={surname} onChange={(e) => setSurname(e.target.value)} className='rounded-2xl bg-dark border-dark4 w-full' placeholder='Стив' />
                </div>
                <div className='w-full text-center font-bold bg-blue-500 hover:bg-blue-600 select-none cursor-pointer rounded-2xl p-4' onClick={() => {
                  if (surname?.length >= 3 && surname?.length <= 32) {
                    setStep(2);
                  } else {
                    alert("Псевдоним должен быть от 3х символов до 32х символов")
                  }
                }}>Далее</div>
              </div>
            </div>
          }
          {step == 2 &&
            <div className='flex flex-col w-full h-full text-white'>
              <div className='flex justify-between w-full h-full items-center mb-4 select-none flex-col gap-4'>
                <div className='flex flex-col gap-12 w-full items-center'>
                  <div className='flex flex-col items-center'>
                    <div className='text-3xl font-bold flex items-center text-center gap-2'>Укажите ваш никнейм в Minecraft</div>
                    <div className='text-lg w-full text-center'>Можно изменить позже</div>
                  </div>
                  <input value={nickname} onChange={(e) => setNickname(e.target.value)} className='rounded-2xl bg-dark border-dark4 w-full' placeholder='Steve' />
                </div>
                <div className='w-full text-center font-bold bg-blue-500 hover:bg-blue-600 select-none cursor-pointer rounded-2xl p-4' onClick={async () => {
                  if (nickname?.length >= 3 && nickname?.length <= 16) {
                    if (await checkNickname()) {
                      setStep(7);
                    } else {
                      alert("Никнейм занят!")
                    }
                  } else {
                    alert("Никнейм должен быть от 3х символов до 16х символов")
                  }
                }}>Далее</div>
              </div>
            </div>
          }
          {step == 7 &&
            <div className='flex flex-col w-full h-full text-white'>
              <div className='flex justify-between w-full h-full items-center mb-4 select-none flex-col gap-4'>
                <div className='flex flex-col gap-12 w-full items-center'>
                  <div className='flex flex-col items-center'>
                    <div className='text-3xl font-bold flex items-center text-center gap-2'>Укажите свой день рождения</div>
                    <div className='text-lg w-full text-center'>Мы не применяем никаких ограничений по возрасту, это информация открыта только Правительству и Народной коалиции. Указывать в формате День.Месяц.Год</div>
                  </div>
                  <input value={birthdate} onChange={(e) => setBirthdate(e.target.value)} className='rounded-2xl bg-dark border-dark4 w-full' placeholder='01.01.2000' />
                </div>
                <div className='w-full text-center font-bold bg-blue-500 hover:bg-blue-600 select-none cursor-pointer rounded-2xl p-4' onClick={() => {
                  setStep(8);
                }}>Далее</div>
              </div>
            </div>
          }
          {step == 8 &&
            <div className='flex flex-col w-full h-full text-white'>
              <div className='flex justify-between w-full h-full items-center mb-4 select-none flex-col gap-4'>
                <div className='flex flex-col gap-12 w-full items-center'>
                  <div className='flex flex-col items-center'>
                    <div className='text-3xl font-bold flex items-center text-center gap-2'>Укажите свой Telegram</div>
                    <div className='text-lg w-full text-center'>Доступен публично для всех. Если у вас нет Telegram, пропустите этот вопрос. Используется для авторизации</div>
                  </div>
                  <input value={telegram} onChange={(e) => setTelegram(e.target.value)} className='rounded-2xl bg-dark border-dark4 w-full' placeholder='steve' />
                </div>
                <div className='w-full text-center font-bold bg-blue-500 hover:bg-blue-600 select-none cursor-pointer rounded-2xl p-4' onClick={async () => {
                  if (telegram?.length == 0) {
                    setStep(9);
                    return;
                  }
                  if (await checkTelegram()) {
                    setStep(9);
                  } else {
                    alert("Этот Telegram аккаунт уже привязан к другому аккаунту!")
                  }
                }}>Далее</div>
              </div>
            </div>
          }
          {step == 9 &&
            <div className='flex flex-col w-full h-full text-white'>
              <div className='flex justify-between w-full h-full items-center mb-4 select-none flex-col gap-4'>
                <div className='flex flex-col gap-12 w-full items-center'>
                  <div className='flex flex-col items-center'>
                    <div className='text-3xl font-bold flex items-center text-center gap-2'>Укажите свой Discord</div>
                    <div className='text-lg w-full text-center'>Доступен публично для всех. Если у вас нет Discord, пропустите этот вопрос</div>
                  </div>
                  <input value={discord} onChange={(e) => setDiscord(e.target.value)} className='rounded-2xl bg-dark border-dark4 w-full' placeholder='steve' />
                </div>
                <div className='w-full text-center font-bold bg-blue-500 hover:bg-blue-600 select-none cursor-pointer rounded-2xl p-4' onClick={async () => {
                  if (discord?.length == 0) {
                    setStep(3);
                    return;
                  }
                  if (await checkDiscord()) {
                    setStep(3);
                  } else {
                    alert("Этот Discord аккаунт уже привязан к другому аккаунту!")
                  }
                }}>Далее</div>
              </div>
            </div>
          }
          {step == 3 &&
            <div className='flex flex-col w-full h-full text-white'>
              <div className='flex justify-between w-full h-full items-center mb-4 select-none flex-col gap-4'>
                <div className='flex flex-col gap-12 w-full items-center'>
                  <div className='flex flex-col items-center'>
                    <div className='text-3xl font-bold flex items-center text-center gap-2'>Выберите регион регистрации</div>
                    <div className='text-lg w-full text-center'>Нельзя изменить позже, будет указан в PassID. При переезде вам надо будет менять регион проживания</div>
                  </div>
                  <div className='flex flex-col md:flex-row justify-center bg-dark2 p-4 rounded-2xl gap-2'>
                    <div className={'py-2 px-4 rounded-2xl flex items-center gap-2 border ' + (region == 0 ? "bg-blue-500 border-blue-500" : "bg-dark5 hover:bg-dark4 cursor-pointer border-dark5 hover:border-dark4")}
                      onClick={() => setRegion(0)}>
                      <img src='/LigorshhinaFlag.png' width={32} className='rounded-md' />
                      <div className='flex flex-col'>
                        <div>Лигорщина</div>
                      </div>
                    </div>
                    <div className={'py-2 px-4 rounded-2xl flex items-center gap-2 border ' + (region == 1 ? "bg-blue-500 border-blue-500" : "bg-dark5 hover:bg-dark4 cursor-pointer border-dark5 hover:border-dark4") + (_hst_rgclose ? " border-red-500 hover:border-red-500" : "")}
                      onClick={() => {
                        if (_hst_rgclose) return;
                        set_hst_rgclose(true);
                        setTimeout(() => {
                          set_hst_rgclose(false);
                        }, 3000);
                      }}>
                      <img src='/HoustoniaFlag.png' width={32} className='rounded-md' />
                      <div className='flex flex-col'>
                        <div>Хаустония</div>
                        <div className='text-sm text-red-500'>Регистрация закрыта</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='w-full text-center font-bold bg-blue-500 hover:bg-blue-600 select-none cursor-pointer rounded-2xl p-4' onClick={() => {
                  setStep(4);
                }}>Далее</div>
              </div>
            </div>
          }
          {step == 4 &&
            <div className='flex flex-col w-full h-full text-white'>
              <div className='flex justify-between w-full h-full items-center mb-4 select-none flex-col gap-4'>
                <div className='flex flex-col gap-10 w-full items-center'>
                  <div className='flex flex-col items-center'>
                    <div className='text-3xl font-bold flex items-center text-center gap-2'>Выберите дискриминатор (тэг)</div>
                    <div className='text-lg w-full text-center'>Запрещается использовать тэги, которые начинаются на "user", в тэге можно использовать только буквы латинского алфавита и цифры</div>
                    <div className='mt-4'>https://id.gooseland.cc/user/<span className='text-blue-500'>{cid}</span></div>
                  </div>
                  <div className='flex w-full items-center'>
                    <div className='rounded-l-2xl bg-dark border-l border-t border-b border-dark4 pl-2 py-2'>@</div>
                    <input value={cid} onChange={(e) => {
                      const isValid = /^[A-Za-z0-9]*$/.test(e.target.value);
                      if (isValid) {
                        setCID(e.target.value.toLowerCase())
                      }
                    }} className='rounded-r-2xl pl-0 bg-dark border-r border-t border-b border-l-[0] focus:border-r focus:border-t focus:border-b border-dark4 focus:border-dark4 focus:ring-transparent w-full' placeholder='steve' />
                  </div>
                </div>
                <div className='w-full text-center font-bold bg-blue-500 hover:bg-blue-600 select-none cursor-pointer rounded-2xl p-4' onClick={async () => {
                  if (cid?.length <= 5 && cid?.length >= 10) {
                    alert("Тег может быть от пяти до десяти символов")
                    return;
                  }
                  if (cid.startsWith("user")) {
                    alert("Запрещенный тэг!");
                    return;
                  }
                  if (cid == "avinesia") {
                    alert("Тег занят!")
                    return;
                  }
                  if (cid == "1488") {
                    alert("Тег выставлен на продажу. Цена: 4500 вечно деревянных")
                    return;
                  }
                  if (await checkCID()) {
                    setStep(11);
                  } else {
                    alert("Тег занят!")
                  }
                }}>Далее</div>
              </div>
            </div>
          }
          {step == 11 &&
            <div className='flex flex-col w-full h-full text-white'>
              <div className='flex justify-between w-full h-full items-center mb-4 select-none flex-col gap-4'>
                <div className='flex flex-col gap-12 w-full items-center'>
                  <div className='flex flex-col items-center w-full'>
                    <div className='text-3xl font-bold flex items-center text-center gap-2'>Сейчас мы выбирем тебе PassID</div>
                  </div>
                  <div className='text-lg w-full text-center'>Готов попытать удачу? Изменить его позже будет нельзя</div>
                  {passIDStep == 1 &&
                    <div><img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Telegram-Animated-Emojis/main/Objects/Top%20Hat.webp" alt="Top Hat" width={200} /></div>
                  }
                  {passIDStep == 2 &&
                    <div className='text-center w-full text-2xl md:text-8xl font-bold uppercase'>{passID}</div>
                  }
                </div>
                {passIDStep == 0 &&
                  <div className='w-full text-center font-bold bg-blue-500 hover:bg-blue-600 select-none cursor-pointer rounded-2xl p-4' onClick={() => {
                    //regAccF();
                    //setPassID("");
                    genPassID();
                  }}>Попытать удачу</div>
                }
                {passIDStep == 2 &&
                  <div className='w-full text-center font-bold bg-blue-500 hover:bg-blue-600 select-none cursor-pointer rounded-2xl p-4' onClick={() => {
                    setStep(5);
                  }}>Далее</div>
                }
              </div>
            </div>
          }
          {step == 5 &&
            <div className='flex flex-col w-full h-full text-white'>
              <div className='flex justify-between w-full h-full items-center mb-4 select-none flex-col gap-4'>
                <div className='flex flex-col gap-12 w-full items-center'>
                  <div className='flex flex-col items-center'>
                    <div className='text-3xl font-bold flex items-center text-center gap-2'>И так, хорошо</div>
                    <div className='text-lg w-full text-center'>Сейчас мы выдадим тебе турвизу на 7 дней. Помни, что турвиза не предназначена для долгосрочного пребывания на территории Авинесии. <span className='text-red-500'>ВАЖНО, турвиза не создана, чтобы жить на территории Авинесии без всяких обязательств.</span></div>
                  </div>
                  <div onClick={() => setInoagent(!inoagent)} className='flex items-center gap-2'>
                    <div className={"w-4 h-4 rounded-md cursor-pointer " + (!inoagent ? "bg-blue-500 hover:bg-blue-600" : "bg-dark5 hover:bg-dark4")}></div>
                    <div>У меня нет гражданства стран ниже</div>
                  </div>
                  {inoagent &&
                    <div className='flex flex-col md:flex-row justify-center bg-dark2 p-4 rounded-2xl gap-2'>
                      <div className={'py-2 px-4 rounded-2xl flex items-center gap-2 border ' + (state == 1 ? "bg-blue-500 border-blue-500" : "bg-dark5 hover:bg-dark4 cursor-pointer border-dark5 hover:border-dark4")}
                        onClick={() => setState(1)}>
                        <div className='flex flex-col'>
                          <div>Каменрусь</div>
                        </div>
                      </div>
                      <div className={'py-2 px-4 rounded-2xl flex items-center gap-2 border ' + (state == 2 ? "bg-blue-500 border-blue-500" : "bg-dark5 hover:bg-dark4 cursor-pointer border-dark5 hover:border-dark4") + (_vit_vzclose ? " border-red-500 hover:border-red-500" : "")}
                        onClick={() => {
                          if (_vit_vzclose) return;
                          set_vit_vzclose(true);
                          setTimeout(() => {
                            set_vit_vzclose(false);
                          }, 3000);
                        }}>
                        <div className='flex flex-col'>
                          <div>Витольдия</div>
                          <div className='text-sm text-red-500'>Регистрация закрыта</div>
                        </div>
                      </div>
                    </div>
                  }
                </div>
                <div className='w-full text-center font-bold bg-blue-500 hover:bg-blue-600 select-none cursor-pointer rounded-2xl p-4' onClick={() => {
                  if (inoagent) {
                    if (state == 0) {
                      alert("Чтобы продолжить, требуется указать ответ!")
                      return;
                    }
                    setStep(6);
                  } else {
                    setStep(12);
                  }
                }}>Далее</div>
              </div>
            </div>
          }
          {step == 12 &&
            <div className='flex flex-col w-full h-full text-white'>
              <div className='flex justify-between w-full h-full items-center mb-4 select-none flex-col gap-4'>
                <div className='flex flex-col gap-12 w-full items-center'>
                  <div className='flex flex-col items-center w-full gap-4'>
                    <div className='text-3xl font-bold flex items-center text-center gap-2'>Обязательно подайте заявку</div>
                    <div onClick={() => window.open("https://t.me/+d7fWwtHZ4ow5NzEy")} className='flex gap-4 p-4 rounded-2xl items-center bg-dark5 hover:bg-dark4 cursor-pointer select-none'>
                      <div><img src='/AV_CHAT.png' width={64} className='rounded-md' /></div>
                      <div className='flex flex-col w-full'>
                        <div>Авинесийский чат граждан</div>
                        <div>Телеграм чат граждан Авинесии. Обязателен для всех граждан Авинесии (возможны персональные исключения)</div>
                      </div>
                    </div>
                    <div className='text-3xl font-bold flex items-center text-center gap-2'>Рекомендуем подписаться</div>
                    <div onClick={() => window.open("https://t.me/avinesiamedia")} className='flex gap-4 p-4 rounded-2xl items-center bg-dark5 hover:bg-dark4 cursor-pointer select-none'>
                      <div className='w-fit'><img src='/razgruzka.jpg' width={64} className='rounded-md' /></div>
                      <div className='flex flex-col w-full'>
                        <div>Разгрузка Авинесии</div>
                        <div>Телеграм лента самого эффективного государства в мире. Все самые актуальные новости Авинесии</div>
                      </div>
                    </div>
                    <div onClick={() => window.open("https://t.me/avinesianunion")} className='flex gap-4 p-4 w-full rounded-2xl items-center bg-dark5 hover:bg-dark4 cursor-pointer select-none'>
                      <div className='w-fit'><img src='/AvinesiaFlag.png' width={64} className='rounded-md' /></div>
                      <div className='flex flex-col w-full'>
                        <div>Справочник</div>
                        <div>Вся нужная информация в одном месте</div>
                      </div>
                    </div>
                    <div className='text-3xl font-bold flex items-center text-center gap-2'>Рекомендуем вступить</div>
                    <div onClick={() => window.open("https://t.me/+N3JtQTOK1p9iNmI6")} className='flex w-full gap-4 p-4 rounded-2xl items-center bg-dark5 hover:bg-dark4 cursor-pointer select-none'>
                      <div><img src='/selhoz.png' width={64} className='rounded-md' /></div>
                      <div className='flex flex-col w-full'>
                        <div>Авинесия и запятая</div>
                        <div>Телеграм канал с отчетами, работой и торговлей</div>
                      </div>
                    </div>
                    <div onClick={() => window.open("https://discord.gg/JhrQCjSwgw")} className='flex gap-4 p-4 w-full rounded-2xl items-center bg-dark5 hover:bg-dark4 cursor-pointer select-none'>
                      <div><img src='/Gooseland.png' width={64} className='rounded-md' /></div>
                      <div className='flex flex-col w-full'>
                        <div>Gooseland</div>
                        <div>Официальный Discord сервер</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='w-full text-center font-bold bg-blue-500 hover:bg-blue-600 select-none cursor-pointer rounded-2xl p-4' onClick={() => {
                  setStep(10);
                }}>Далее</div>
              </div>
            </div>
          }
          {step == 6 &&
            <div className='flex flex-col w-full h-full text-white'>
              <div className='flex justify-between w-full h-full items-center mb-4 select-none flex-col gap-4'>
                <div className='flex flex-col gap-12 w-full items-center'>
                  {state == 1 &&
                    <>
                      <div className='flex flex-col items-center w-full'>
                        <div className='text-3xl font-bold flex items-center text-center gap-2'>Добро пожаловать в Авинесию!</div>
                      </div>
                      <div className='text-lg w-full text-center'>Пожалуйста, обратитесь на КПП для финальной активации аккаунта.</div>
                      <div className='text-center w-full'>В текущий момент граждане Каменруси получают визу на 2 недели автоматически, за более длительными визами обращайтесь в МИД Авинесии или Правительство</div>
                    </>
                  }
                </div>
                <div className='w-full text-center font-bold bg-blue-500 hover:bg-blue-600 select-none cursor-pointer rounded-2xl p-4' onClick={() => {
                  regAccF();
                }}>Создать аккаунт и перейти в профиль</div>
              </div>
            </div>
          }
          {step == 10 &&
            <div className='flex flex-col w-full h-full text-white'>
              <div className='flex justify-between w-full h-full items-center mb-4 select-none flex-col gap-4'>
                <div className='flex flex-col gap-12 w-full items-center'>
                  <div className='flex flex-col items-center w-full'>
                    <div className='text-3xl font-bold flex items-center text-center gap-2'>Добро пожаловать в Авинесию!</div>
                  </div>
                  <div className='text-lg w-full text-center'>Пожалуйста, обратитесь на КПП для финальной активации аккаунта.</div>
                  <div className='text-center w-full'>Вам будет выдана турвиза на 7 дней. Не забывайте, что если вы не предъявите гражданство другой страны на въезде это равносильно подаче заявки на гражданство. Турвиза не создана, чтобы жить на территории Авинесии без всяких обязательств. Получение гражданства происходит в четверг и субботу, иногда также в другие дни (На собрании!!). Но не стоит забывать, что необходимо получить гражданство в течение недели, иначе пребывание с турвизой будет незаконным.</div>
                  <div className='flex flex-col gap-4 justify-center'>
                    <div className='text-2xl font-bold'>Ближайшие собрания</div>
                    {nextThursday > nextSaturday ?
                      <div className='flex gap-2 select-none justify-center'>
                        <div className='flex w-24 h-24 flex-col gap-2 p-2 rounded-2xl bg-dark2'>
                          <div className='rounded-xl w-full h-full justify-between items-center p-2 bg-green-500 bg-opacity-20 flex flex-col gap-2'>
                            <div className='text-2xl font-bold'>{moment(nextSaturday).format("DD")}</div>
                            <div className=''>Сб</div>
                          </div>
                        </div>
                        <div className='flex w-24 h-24 flex-col gap-2 p-2 rounded-2xl bg-dark2'>
                          <div className='rounded-xl w-full h-full justify-between items-center p-2 bg-green-500 bg-opacity-20 flex flex-col gap-2'>
                            <div className='text-2xl font-bold'>{moment(nextThursday).format("DD")}</div>
                            <div className=''>Чт</div>
                          </div>
                        </div>
                      </div>
                      :
                      <div className='flex gap-2 select-none justify-center'>
                        <div className='flex w-24 h-24 flex-col gap-2 p-2 rounded-2xl bg-dark2'>
                          <div className='rounded-xl w-full h-full justify-between items-center p-2 bg-green-500 bg-opacity-20 flex flex-col gap-2'>
                            <div className='text-2xl font-bold'>{moment(nextThursday).format("DD")}</div>
                            <div className=''>Чт</div>
                          </div>
                        </div>
                        <div className='flex w-24 h-24 flex-col gap-2 p-2 rounded-2xl bg-dark2'>
                          <div className='rounded-xl w-full h-full justify-between items-center p-2 bg-green-500 bg-opacity-20 flex flex-col gap-2'>
                            <div className='text-2xl font-bold'>{moment(nextSaturday).format("DD")}</div>
                            <div className=''>Сб</div>
                          </div>
                        </div>
                      </div>
                    }
                  </div>
                </div>
                <div className='w-full text-center font-bold bg-blue-500 hover:bg-blue-600 select-none cursor-pointer rounded-2xl p-4' onClick={() => {
                  regAcc();
                }}>Создать аккаунт и перейти в профиль</div>
              </div>
            </div>
          }
        </div>
      </section>
    </main >
  );
}
