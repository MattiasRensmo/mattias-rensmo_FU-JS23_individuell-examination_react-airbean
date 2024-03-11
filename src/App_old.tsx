import {
  Route,
  RouterProvider,
  Routes,
  createBrowserRouter,
  createRoutesFromElements,
  useLocation,
} from 'react-router-dom'
import './App.css'
import About from './pages/About'
import Cart from './pages/Cart'
import Landing from './pages/Landing'
import Menu from './pages/Menu'
import Profile from './pages/Profile'
import Status from './pages/Status'

// let location = useLocation()
// let background = location.state && location.state.background
function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/" element={<Landing />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/about" element={<About />} />
        <Route path="/status" element={<Status />} />
        <Route path="/profile" element={<Profile />} />
      </Route>
    )
  )

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
