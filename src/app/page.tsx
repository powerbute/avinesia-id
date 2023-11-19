'use client';

import Head from 'next/head';
import * as React from 'react';

import ArrowLink from '@/components/links/ArrowLink';
import ButtonLink from '@/components/links/ButtonLink';
import UnderlineLink from '@/components/links/UnderlineLink';
import UnstyledLink from '@/components/links/UnstyledLink';

/**
 * SVGR Support
 * Caveat: No React Props Type.
 *
 * You can override the next-env if the type is important to you
 * @see https://stackoverflow.com/questions/68103844/how-to-override-next-js-svg-module-declaration
 */
import Logo from '~/svg/Logo.svg';

// !STARTERCONF -> Select !STARTERCONF and CMD + SHIFT + F
// Before you begin editing, follow all comments with `STARTERCONF`,
// to customize the default configuration.
import { IoMdSearch, IoMdNotificationsOutline } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import { CiPassport1, CiMedicalCross } from "react-icons/ci";
import { FaCity } from "react-icons/fa";
import { MdOutlineWorkOutline, MdOutlinePolicy, MdOutlinePauseCircle } from "react-icons/md";
import { AiOutlineHistory } from "react-icons/ai";

export default function HomePage() {
  return (
    <main className='bg-dark'>
      <Head>
        <title>Hi</title>
      </Head>
      <section className='bg-dark min-w-screen min-h-screen py-4 mx-auto text-white xl:w-[1280px]'>
        <header className='px-4 flex h-[56px] items-center justify-between'>
          <a className='hidden lg:block translation-transform hover:scale-105 text-lg' href='/'><img src='/logo.png' className='w-14' /></a>
          <div className='flex gap-4 justify-center w-full sm:w-fit sm:justify-start items-center select-none'>
            <div className='bg-white hover:bg-gray-200 rounded-2xl p-2 text-black flex justify-center items-center cursor-pointer' onClick={() => {
              location.replace("/auth")
            }}>Авторизация</div>
            <div className='bg-white hover:bg-gray-200 rounded-2xl p-2 text-black flex justify-center items-center cursor-pointer' onClick={() => {
              location.replace("/user")
            }}>Личный кабинет</div>
          </div>
        </header>
        <section className='px-4 mt-4'>
          <div className='text-9xl font-black'>Мои</div>
          <div className='text-9xl font-black'>Документы</div>
          <div className='text-9xl font-black'>в одном месте</div>
          <div className='text-xl mt-8'>Это удобный и функциональный портал для всех граждан Авинесии</div>
          <div className='flex w-full gap-4 mt-12'>
            <div className='flex flex-col gap-4 w-1/3'>
              <div className='bg-zinc-700 rounded-2xl px-8 py-4'>
                <div className='text-3xl font-bold'>Простота</div>
                <div className='text-lg'>Наш портал очень прост в использование и интуитивно понятен, благодаря минималистичному и простому дизайну</div>
              </div>
              <div className='bg-zinc-700 rounded-2xl px-8 py-4'>
                <div className='text-3xl font-bold'>Удобство</div>
                <div className='text-lg'>Вы с лёгкостью сможете получить доступ к любому документы</div>
              </div>
              <div className='bg-zinc-700 rounded-2xl px-8 py-4'>
                <div className='text-3xl font-bold'>Функционал</div>
                <div className='text-lg'>Паспорт, социальный рейтинг и документы на жилье вы сможете найти здесь</div>
              </div>
            </div>
            <div className='w-full'>
              <img src='hero1.png' className='h-full' />
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}
