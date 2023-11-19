'use client';

import Head from 'next/head';
import * as React from 'react';

export default function HomePage() {
  return (
    <main className='bg-dark'>
      <Head>
        <title>Hi</title>
      </Head>
      <section className='bg-dark min-w-screen min-h-screen py-4 mx-auto text-white xl:w-[1280px] flex justify-center items-center text-center'>
        <div className='text-4xl'>Для авторизации на сайте воспользуйтесь нашим Telegram ботом или обратитесь к Правительству</div>
      </section>
    </main>
  );
}
