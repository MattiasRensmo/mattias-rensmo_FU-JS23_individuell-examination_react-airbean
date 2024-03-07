import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom'
import './App.css'
import About from './pages/About'
import Cart from './pages/Cart'
import Landing from './pages/Landing'
import Menu from './pages/Menu'
import Profile from './pages/Profile'
import Status from './pages/Status'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Landing />} />
      <Route path="/menu" element={<Menu />} />
      <Route path="/about" element={<About />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/status" element={<Status />} />
      <Route path="/profile" element={<Profile />} />
    </Route>
  )
)

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
