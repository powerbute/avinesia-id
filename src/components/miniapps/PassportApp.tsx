import Passport from "@/components/Passport";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react"
import { CiPassport1 } from "react-icons/ci";
import { IoMdCloseCircle } from "react-icons/io";

export default function PassportApp({ passport }: { passport: { authData: any, userID: any, open: any, setOpen: any } }) {
  const supabase = createClientComponentClient();

  return (
    <>
      <section className={'absolute z-[70] bottom-0 left-0 text-white w-full flex items-end justify-center backdrop-blur-[4px] h-full' + (!open ? " hidden" : "")} onClick={() => passport.setOpen(false)}>
        <div className='relative bottom-0 left-0 w-full md:w-1/2 border p-2 rounded-t-2xl border-dark4 bg-dark h-fit' onClick={(e: any) => {
          e.stopPropagation();
        }}>
          <div className='flex w-full mb-2 justify-between px-4'>
            <div className='text-3xl font-bold'>Паспорт</div>
            <div className='flex items-center justify-center'><IoMdCloseCircle size={24} className='hover:text-gray-200 cursor-pointer' onClick={() => {
              passport.setOpen(false)
            }} /></div>
          </div>
          <div className='mb-4'><Passport passport={{ authData: passport.authData, userID: passport.userID }} /></div>
        </div>
      </section>
    </>
  )
}