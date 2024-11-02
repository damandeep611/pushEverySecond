import { CustomKanban } from "../../components/CustomKanban"

import Sidebar from "../../components/Sidebar"

const Dashboard = () =>{
  return(
    <section className="w-full flex">
      <div>
      <Sidebar/>
      </div>
      <div>
      <CustomKanban/>
      </div>
    </section>
    
  )
}

export default Dashboard