import  { Dispatch, SetStateAction, useRef, useState } from "react";
import { motion } from "framer-motion";




export default function Navbar() {
  return (
    <div className="bg-neutral-100 flex items-center justify-between py-2 px-6">
      <span className="text-2xl font-bold">Tmr.com</span>
      <SlideTabs />
      <button className="bg-black text-white py-3 px-8 rounded-2xl hover:rounded-lg transition ease-out">Login</button>
    </div>
  )
}

const SlideTabs = () => {
  const [position, setPosition] = useState<Position>({
    left: 0,
    width: 0,
    opacity: 0,
  });

  return (
    <ul
      onMouseLeave={() => {
        setPosition((pv) => ({
          ...pv,
          opacity: 0,
        }));
      }}
      className="relative mx-auto flex w-fit rounded-full border-2 border-black bg-white p-1"
    >
      <Tab setPosition={setPosition} to="/">Home</Tab>
      <Tab setPosition={setPosition}>More</Tab>
      <Tab setPosition={setPosition}>Features</Tab>
      <Tab setPosition={setPosition} to="/dashboard">DashBoard</Tab>
      <Tab setPosition={setPosition}>Blog</Tab>

      <Cursor position={position} />
    </ul>
  );
};

const Tab = ({
  children,
  setPosition,
}: {
  children: string;
  setPosition: Dispatch<SetStateAction<Position>>;
  to?: string;
}) => {
  const ref = useRef<null | HTMLLIElement>(null);

  return (
    <li
      ref={ref}
      onMouseEnter={() => {
        if (!ref?.current) return;

        const { width } = ref.current.getBoundingClientRect();

        setPosition({
          left: ref.current.offsetLeft,
          width,
          opacity: 1,
        });
      }}
      className="relative z-10 block cursor-pointer px-3 py-1.5 text-xs uppercase text-white mix-blend-difference md:px-5 md:py-3 md:text-base"
    >
      {children}
    </li>
  );
  // return to ? (
  //   <Link to={to}>{content}</Link>
  // ) : (content);
};

const Cursor = ({ position }: { position: Position }) => {
  return (
    <motion.li
      animate={{
        ...position,
      }}
      className="absolute z-0 h-7 rounded-full bg-black md:h-12"
    />
  );
};

type Position = {
  left: number;
  width: number;
  opacity: number;
};
