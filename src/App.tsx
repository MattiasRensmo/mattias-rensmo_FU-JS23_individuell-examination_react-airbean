import {
  Route,
  BrowserRouter as Router,
  Routes,
  useLocation,
  useNavigate,
} from 'react-router-dom'
import './App.css'
import About from './pages/About'
import Cart from './pages/Cart'
import Landing from './pages/Landing'
import Menu from './pages/Menu'
import Profile from './pages/Profile'
import Status from './pages/Status'

function App() {
  return (
    <Router>
      <ModalSwitch />
    </Router>
  )
}

function ModalSwitch() {
  const location = useLocation()
  const background = location.state && location.state.background

  return (
    <>
      <Routes location={background || location}>
        <Route path="/" element={<Landing />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/about" element={<About />} />
        <Route path="/status" element={<Status />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>

      {background && (
        <Routes>
          <Route path="/cart" element={<Cart />} />
        </Routes>
      )}
    </>
  )
}

export default App
