import { NavLink } from 'react-router-dom'
import landingImg from '../assets/todolanding.png'

const Landing = ()=> {
  return(
    <section className="h-dvh bg-neutral-800 text-white py-16">
      <div className="flex items-center justify-center gap-4  ">
        <div className="flex flex-col gap-6 mx-6 my-4 pl-12">
          <h1 className='text-5xl font-bold'>Read-it-later for serious <br /> reader</h1>
          <p className='text-xl font-semibold text-gray-400'>Save articles and read them later in our distraction-free reader</p>
          <span className='text-gray-400 text-lg'>Learn More</span>
          <div className='flex flex-col gap-4'>
            <button className='bg-white text-black py-2 px-6 rounded-lg max-w-xs'>Continue with Google</button>
            <button className='bg-black text-white py-2 px-6 rounded-lg max-w-xs'>Continue with Apple</button>
            <button className='bg-gray-500 text-black py-2 px-6 rounded-lg max-w-xs'>Continue with Email</button>
          </div>
          <div className='flex flex-col text-sm text-gray-600'>
            <span>By signing up, you agree to Mnemosyne Note's</span>
            <span>Terms of Service and Privacy Policy</span>
            <div>
              <span className='text-xl text-green-700'>
                  
                <NavLink to="/dashboard">Dashboard</NavLink>
              </span>
            </div>
          </div>
        </div>
        <div className=''>
          <img src={landingImg} alt="" className='w-[700px] rounded-xl object-cover ' />
        </div>
      </div>
    </section>
  )
}

export default Landing