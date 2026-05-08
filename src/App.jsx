import { Route, Routes } from "react-router-dom";

import { SinglePlayer } from './pages/SinglePlayer.jsx'
import { DualPlayer } from './pages/DualPlayer.jsx'
import Home from './pages/home.jsx'
import NavBar from './components/navBar.jsx'

function App() {

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/singleplayer" element={<SinglePlayer />} />
        <Route path="/dualplayer" element={<DualPlayer />} />
      </Routes>
    </>
  )
}

export default App
