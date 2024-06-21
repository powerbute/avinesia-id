import { AVauth, AVauthC } from "@/components/SecurityAuth";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useState } from "react";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa6";
import useLocalStorage from "use-local-storage";

export default function LikeCompoennt({ passport }: { passport: { authData: any, userData: any } }) {
  const [liked, setLiked] = useState(passport.userData?.likes?.includes(passport?.authData?.passid));
  const supabase = createClientComponentClient();
  const [session, setSession] = useLocalStorage<any>("session", "");
  let set = 0;

  function random(min: any, max: any) {
    return min + Math.random() * (max + 1 - min);
  }

  const createFirework = (event: any) => {
    const xPos = event.clientX
    const yPos = event.clientY
    const colour = 'red';

    // Create 50 divs, start them on top of each other
    // so they can radiate out from the centre
    for (let i = 1; i <= 50; i++) {
      const firework = document.createElement('div')
      firework.className = 'firework'
      firework.classList.add(`firework${i}`)
      firework.classList.add(`set${set}`)
      firework.style.backgroundColor = colour
      firework.style.left = xPos + 'px'
      firework.style.top = yPos + 'px'
      firework.addEventListener('click', (e: any) => {
        handleLike(e);
      })
      document.body.appendChild(firework)
    }

    set += 1
  }

  const deleteFirework = async () => {
    const oldFireworks = document.getElementsByClassName(`firework`);
    Array.from(oldFireworks).forEach((el) => {
      // Do stuff here
      el.remove();
    });
  }
  function removeA(arr: any, what: any) {
    const index = arr.indexOf(what);
    if (index > -1) { // only splice array when item is found
      arr.splice(index, 1); // 2nd parameter means remove one item only
    }
  }

  async function handleLike(event: any) {
    const tempAuth = await AVauthC(session);
    if (tempAuth?.deactive) {
      alert("Ваш аккаунт деактивирован, вы не можете выполнить это действие!")
      return;
    }
    const newLikes: any[] = passport.userData?.likes;
    if (liked) {
      removeA(newLikes, passport.authData?.passid);
    } else {
      if (!newLikes.includes(passport.authData?.passid)) {
        newLikes.push(passport.authData?.passid);
      }
    }
    const { error } = await supabase
      .from('users')
      .update({ likes: newLikes })
      .eq('id', passport.userData?.id)
    setLiked(!liked);
    if (!liked) {
      createFirework(event)
      setTimeout(deleteFirework, (800))
    }
  }

  return (
    <div className={"flex select-none w-fit justify-center relative items-center cursor-pointer pt-[1px] h-10 px-2 rounded-2xl " + (!liked ? "bg-dark4 hover:bg-dark3 text-white" : "bg-red-500 hover:bg-red-400 text-white")} onClick={(e) => handleLike(e)}>
      <CiHeart color={!liked ? "white" : "white"} size={32} className="relative cursor-pointer" />
      <div>{passport.userData?.likes?.length > 0 ? passport.userData?.likes?.length : null}</div>
    </div>
  )
}