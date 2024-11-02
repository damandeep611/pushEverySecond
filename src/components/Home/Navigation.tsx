import { Dispatch, SetStateAction, useRef, useState } from "react"
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Navigation() {
  return(
    <div className="bg-neutral-100 flex items-center justify-between py-2 px-6">
      <span className="text-2xl font-bold">TimerTask</span>
      <SlideTabs/>
      <button className="bg-black text-white py-3 px-8 rounded-2xl hover:rounded-lg transition ease-out">
        Login
      </button>
    </div>
  )
}


const SlideTabs = () => {
  const [position, setPosition] = useState<Position>({
    left: 0,
    width: 0,
    opacity: 0,
  });

  return(
    <ul onMouseLeave={()=> {
      setPosition((pv) => ({
        ...pv,
        opacity: 0,
      }))
    }} className="relative mx-auto flex w-fit rounded-full border-2 border-black bg-white p-1">

      <motion.li className="absolute z-0 h-7 rounded-full bg-black md:h-12" animate={position}/>
        {/* navgation liks  */}
        <NavTab to="/" setPosition={setPosition}>Home</NavTab>
        <NavTab setPosition={setPosition}>More</NavTab>
        <NavTab setPosition={setPosition}>Features</NavTab>
        <NavTab to="/dashboard" setPosition={setPosition}>Dashboard</NavTab>
        <NavTab setPosition={setPosition}>Blog</NavTab>
        
    </ul>
  )
}

interface NavTabProps {
  children: string;
  setPosition: Dispatch<SetStateAction<Position>>;
  to?:  string;
}

const NavTab = ({children, setPosition, to} : NavTabProps) => {
  const ref  = useRef<HTMLLIElement>(null);

  const handleMouseEnter = () => {
    if(!ref.current) return;
    const {width} = ref.current.getBoundingClientRect();
    setPosition({
      left: ref.current.offsetLeft,
      width,
      opacity: 1
    })
  };

  const tabContent = (
    <li
      ref={ref}
      onMouseEnter={handleMouseEnter} 
      className="relative z-10 block cursor-pointer px-3 py-1.5 text-xs uppercase text-white mix-blend-difference md:px-5 md:py-3 md:text-base"
>
      {children}
    </li>
  );

  if(to){
    return(
      <Link to={to} className="contents">
        {tabContent}
      </Link>
    )
  }
  return tabContent
}

type Position = {
  left: number;
  width: number;
  opacity: number;
}



