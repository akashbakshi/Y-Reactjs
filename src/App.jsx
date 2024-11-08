import { useState } from 'react'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Homepage from "./pages/Homepage.jsx";
import Login from "./pages/Login.jsx";
import {Navbar} from "./components/Navbar.jsx";

import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
      <>
          <BrowserRouter>
              <Navbar/>
              <Routes>
                  <Route index path={"/"} element={<Homepage/>}/>
                  <Route index path={"/login"} element={<Login/>}/>
              </Routes>
          </BrowserRouter>
      </>

  )
}

export default App
