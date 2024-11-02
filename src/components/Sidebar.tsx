import  { useState } from 'react';
import { FolderIcon, TagIcon, PlusIcon, ChevronDownIcon, Home } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  const [isProjectsOpen, setIsProjectsOpen] = useState(true);

  return (
    <div className="bg-white w-64 h-screen p-4 flex flex-col">
      <h2 className="text-lg font-semibold mb-4">WorkFlow</h2>
      
      <button className="bg-[#e5f8df] text-black py-2 px-4 rounded-md mb-4 flex items-center justify-center">
        <PlusIcon size={16} className="mr-2" />
        Add new task
      </button>
      
      <div className="mb-4">
        <div className="flex items-center mb-2">
          <FolderIcon size={16} className="mr-2" />
          <span>Plan</span>
        </div>
        <div className="flex items-center mb-2">
          <FolderIcon size={16} className="mr-2" />
          <span>Task List</span>
        </div>
      </div>
      
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2 cursor-pointer" onClick={() => setIsProjectsOpen(!isProjectsOpen)}>
          <div className="flex items-center">
            <FolderIcon size={16} className="mr-2" />
            <span>Projects</span>
          </div>
          <ChevronDownIcon size={16} className={`transform ${isProjectsOpen ? 'rotate-180' : ''}`} />
        </div>
        {isProjectsOpen && (
          <div className="ml-6">
            <div className="flex items-center mb-2">
              <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
              <span>Notes App</span>
            </div>
            <div className="flex items-center mb-2">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
              <span>LLM Training</span>
            </div>
            <div className="flex items-center mb-2">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
              <span>Hike up</span>
            </div>
            <div className="flex items-center mb-2">
              <span className="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
              <span>OceanSurf</span>
            </div>
            <button className="text-gray-500 flex items-center mt-2">
              <PlusIcon size={14} className="mr-1" />
              Add New
            </button>
          </div>
        )}
      </div>
      
      <div className="mb-4">
        <div className="flex items-center mb-2">
          <TagIcon size={16} className="mr-2" />
          <span>Tags</span>
        </div>
        <div className='flex items-center mb-2'>
          <Home size={16} className='mr-2'/>
          <NavLink to="/">Home</NavLink>
        </div>
      </div>
      
      <div className="mt-auto">
        <div className="text-sm text-gray-600 mb-2">Free Plan</div>
        <div className="flex flex-col">
          <div className="flex justify-between mb-1">
            <span>Projects</span>
            <span>4 / 10</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-green-500 h-2 rounded-full" style={{ width: '40%' }}></div>
          </div>
          <div className="flex justify-between mt-1">
            <span>Tasks</span>
            <span>Unlimited</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;