import React, {useState} from 'react'
import { Label } from "../components/ui/label"
import  { Input } from "../components/ui/input"
import Logo from './Logo'
import { Button } from './ui/button'
import axios from "axios"
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
const Signup = () => {

  const navigate = useNavigate();

  const [input, setInput] = useState({
  fullname: "",
  email:"",
  password:"",
})

const changeHandler = (e) =>{
    setInput({...input, [e.target.name]:e.target.value})
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
    const res = await axios.post("http://localhost:8000/api/v1/user/register", input)

    if(res.data.success){
      toast.success(res.data.message);
      setInput({
         fullname: "",
          email:"",
          password:"",
      })
      navigate('/');
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
          <Label>Full Name</Label>
          <Input type="text" name="fullname" value={input.fullname} onChange={changeHandler}></Input>
        </div>
        <div>
          <Label>Email</Label>
          <Input type="email" name="email" value={input.email} onChange={changeHandler}></Input>
        </div>
        <div>
          <Label>Password</Label>
          <Input type="password" name="password" value={input.password} onChange={changeHandler}></Input>
        </div>
        <Button type="submit" className="w-full my-5">Signup</Button>
      <p>If already have an account <a href='/login' className='text-blue-500'>Login</a></p>
      </form>
    </div>
  )
}

export default Signup