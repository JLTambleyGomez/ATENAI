import {Routes, Route} from "react-router-dom"
import Landing from "./Landing"
import Home from "./Home"
import Topbar from "./Topbar"
import './App.css'

function App() {

  return (
    <div className="App">
  <Topbar></Topbar> 
      <Routes>
      <Route path="/" element={<Landing />} />
      <Route path ="/Home" element={<Home />} />
      </Routes>
    </div>
  )
}

export default App
