import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Starfield from './components/starfield/starfield';
import MinecraftMusic from './components/music/music';
import HomePage from './pages/HomePage';
import ProjectsPage from './pages/ProjectsPage';
import AboutPage from './pages/AboutPage';
import ClickerPage from './pages/ClickerPage';
import FriendsPage from './pages/FriendsPage';

function App() {
  return (
    <BrowserRouter>
    <div className="App"> 
      <Starfield/>
          <Routes>
            <Route path="/" element={<HomePage/>} /> 
            <Route path="/projects" element={<ProjectsPage/>} /> 
            <Route path="/about" element={<AboutPage/>} /> 
            <Route path="/game" element={<ClickerPage/>} /> 
            <Route path="/friends" element={<FriendsPage/>} /> 
          </Routes>
      <MinecraftMusic audioSrc={`${process.env.PUBLIC_URL}/assets/musics/c418-wethands.mp3`}/>
    </div>
    </BrowserRouter>
  );
}

export default App;