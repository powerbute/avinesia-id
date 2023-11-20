'use client';

import Head from 'next/head';
import * as React from 'react';
import dynamic from 'next/dynamic';
const LandingHeader = dynamic(() => import('@/components/LandingHeader'), { ssr: false })
import useLocalStorage from 'use-local-storage';

const Passport = dynamic(() => import('@/components/PassportLanding'), { ssr: false })
const IDCard = dynamic(() => import('@/components/IDCardLanding'), { ssr: false })
const Rating = dynamic(() => import('@/components/RatingLanding'), { ssr: false })

export default function HomePage() {
  const [authData, setAuthData] = useLocalStorage<any>("authdata", {});
  const [session, setSession] = useLocalStorage<any>("session", "");
  return (
    <main className='bg-dark'>
      <Head>
        <title>Hi</title>
      </Head>
      <section className='bg-dark min-w-screen min-h-screen py-4 mx-auto text-white xl:w-[1280px]'>
        <LandingHeader passport={{ authData }} />
        <section className='px-4 mt-4'>
          <div className='text-9xl font-black'>Мои</div>
          <div className='text-9xl font-black'>Документы</div>
          <div className='text-9xl font-black'>в одном месте</div>
          <div className='text-xl mt-8'>Это удобный и функциональный портал для всех граждан Авинесии</div>
          <div className='flex w-full gap-4 mt-12'>
            <div className='flex flex-col gap-4 w-1/3'>
              <div className='bg-dark2 rounded-2xl px-8 py-4'>
                <div className='text-3xl font-bold'>Простота</div>
                <div className='text-lg'>Наш портал очень прост в использование и интуитивно понятен, благодаря минималистичному и простому дизайну</div>
              </div>
              <div className='bg-dark2 rounded-2xl px-8 py-4'>
                <div className='text-3xl font-bold'>Удобство</div>
                <div className='text-lg'>Вы с лёгкостью сможете получить доступ к любому документы</div>
              </div>
              <div className='bg-dark2 rounded-2xl px-8 py-4'>
                <div className='text-3xl font-bold'>Функционал</div>
                <div className='text-lg'>Паспорт, социальный рейтинг и документы на жилье вы сможете найти здесь</div>
              </div>
            </div>
            <div className='w-[100%] overflow-hidden flex bg-dark2 relative rounded-2xl'>
              <div className='absolute w-[200%] top-[-2rem] right-[-60rem] origin-top-left rotate-12 rounded-2xl'>
                <div className='rounded-2xl flex gap-4 flex-col md:flex-row'>
                  <IDCard passport={{ authData: {}, userID: 4 }} />
                  <Passport passport={{ authData: { roles: [1] }, userID: 4 }} />
                </div>
                <div className='rounded-2xl mt-4 flex gap-4 flex-col md:flex-row'>
                  <Rating passport={{ authData: {}, userID: 19 }} />
                  <div className='w-full'></div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}
