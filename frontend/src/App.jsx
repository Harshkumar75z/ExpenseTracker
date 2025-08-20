import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Button } from './components/ui/button'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from "./components/Login"
import Home from "./components/Home"
import Signup from "./components/Signup"
import {Toaster} from './components/ui/sonner'

const appRouter = createBrowserRouter([
  {
    path:"/home",
    element:<Home/>
  },
  {
    path:"/",
    element:<Login/>
  },
  {
    path:"/signup",
    element:<Signup/>
  },
])


function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      {/* <p className='text-red-500'>New Paragraph</p>
      <Button>Click Here</Button>
      <h4 className='font-bold'>New Button</h4> */}
      <RouterProvider router={appRouter} />
      <Toaster />
    </div>
  )
}

export default App
