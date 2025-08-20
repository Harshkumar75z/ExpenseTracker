import React, {useState} from 'react'
import { Label } from "../components/ui/label"
import  { Input } from "../components/ui/input"
import Logo from './Logo'
import { Button } from './ui/button'
import axios from "axios"
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { useDispatch } from 'react-redux'
import { setUser } from '../redux/authSlice'
const Login = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [input, setInput] = useState({
  email:"",
  password:"",
})

const changeHandler = (e) =>{
    setInput({...input, [e.target.name]:e.target.value})
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
   const res = await axios.post(
  "http://localhost:8000/api/v1/user/login",
  input,
  { withCredentials: true }
);

if (res.data.success) {
  toast.success(res.data.message);
  dispatch(setUser(res.data.user))
  setInput({
    email: "",
    password: "",
  });
  navigate('/home');
}
else{
  toast.error(res.data.message);
}
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong!")
      console.log(error)
    }
  }

  return (
    <div className='flex items-center justify-center h-screen w-screen'>
      <form onSubmit={submitHandler} className='w-96 p-8 shadow-lg bg-white rounded-xl space-y-4'>
      <div className='w-full flex justify-center mb-5'><Logo/></div>
        <div>
          <Label>Email</Label>
          <Input type="email" name="email" onChange={changeHandler} required></Input>
        </div>
        <div>
          <Label>Password</Label>
          <Input type="password" name="password" onChange={changeHandler} required ></Input>
        </div>
        <Button type="submit" className="w-full my-5">Login</Button>
        <p>If don't have an account <a href='/signup' className='text-blue-500'>Signup</a></p>
      </form>
    </div>
  )
}

export default Login