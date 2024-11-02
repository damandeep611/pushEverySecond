import { Outlet, useLocation } from "react-router"
import Navigation from "./components/Home/Navigation"

function App() {
  const location = useLocation();
  const isDashboard = location.pathname === '/dashboard'
  return (
    <>
    {!isDashboard && <Navigation/>}
    <main>
    <Outlet/>
    </main>
    
    </>
  )
}

export default App

