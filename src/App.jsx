import { Outlet } from "react-router-dom"
import Header from "./components/Header"
import '../src/index.css';


function App() {
 console.log(process.env.NODE_ENV);
  return (
    <>

<Header/>
<Outlet />
    </>
  )
}

export default App
