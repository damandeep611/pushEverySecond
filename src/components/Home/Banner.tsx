import { NavLink } from 'react-router-dom'
import todoLanding from '../../assets/workflowimg.png'

const Banner = () => {
  return (
    <section className='bg-slate-100'>
     <div className='container mx-auto px-4 py-12 sm:px-6 lg:px-8 lg:py-16'>
    <div className='flex flex-col lg:flex-row items-center'>
    {/* left column  */}
    <div className='lg:w-1/2 lg:pr-12 mb-10 lg:mb-0'>
    <div className='inline-block mb-4 border p-1 px-4 rounded-xl'>
    <span className='inline-flex items-center rounded-full bg-black px-2.5 py-0.5 text-xs font-medium text-white'>NEW</span>
    <span className='ml-2 text-sm font-medium text-gray-900'>Daily Analytics with Ai. coming soon</span>
    </div>
    <h1 className='text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6'>Keep track of your Progress <span className='text-gray-400'>Everyday</span></h1>
    <p className='text-xl text-gray-600 mb-8'>Track your hour-by-hour productivity with detailed time tracking and task management, gaining powerful insights to boost your daily performance and achieve more</p>
    <NavLink to="/dashboard"  className='bg-black text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-gray-800'>
        Get Started
    </NavLink>
    {/*  */}
    
    <div className='flex items-center mt-8 space-x-4'>
    {['Product of the day', 'Product of the week', 'Product of the month'].map((text, index)=> (
      <div key={index} className='flex items-center'>
        <img src="https://img.icons8.com/color/50/warranty.png" alt="award icon" width={24} height={24} className='mr-2' />
        <span className='text-xs font-medium'>{text}</span>
        {/* <span className='ml-1 text-xs font-bold'>1st</span> */}
      </div>
    ))}
    {/* the following commented out is the review logos on the hero section */}
    {/* <div className='flex items-center mt-4 space-x-4'>
    {["P", "G", "C"].map((letter, index)=> (
      <div key={index} className='flex items-center'>
        <span className={`text-lg font-bold ${index === 2 ? 'text-red-500' : 'text-yellow-500'}`}>{letter}</span>
        <div className='ml-1'>
      {[...Array(5)].map((_, i)=> (
        <span key={i} className={`text-lg ${i < 4 || (index !==2) ? 'text-yellow-500': 'text-gray-300'}`}>*</span>
      ))}
        </div>
      </div>
    ))}
    </div> */}
    </div>
    </div>
    {/* right colmn */}
    <div className='lg:w-1/2'>
    <img src={todoLanding} alt="dashboard demo image" width={800} height={800} className='rounded-lg shadow-lg' />
    </div>
    </div>
     </div>
    </section>
  )
}

export default Banner
