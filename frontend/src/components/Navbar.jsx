import React from 'react'
import Logo from './Logo'
import { Popover, PopoverContent, PopoverTrigger } from "../components/ui/popover"
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { useNavigate } from 'react-router-dom'
import {Toaster} from "../components/ui/sonner"
import { toast } from "sonner"
import {Link} from 'react-router-dom'
import {Button} from "../components/ui/button"
import axios from "axios";
import { useSelector } from 'react-redux';


const Navbar = () => {
    // const user = true;
    const {user} = useSelector(store => store.auth)
    const navigate = useNavigate();

    const logoutHandler = async () =>{
        try {
            const res = await axios.post("https://expensetracker-6vor.onrender.com/api/v1/user/logout")
            if(res.data.success){
                navigate("/login");
                toast.success(res.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error)
        }
    }

  return (
    <div className="flex items-center justify-between p-3">
        <div>
            <Logo />
        </div>
        <div>
            {user ? (
            <Popover>
                <PopoverTrigger>
                    <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                    </Avatar>
                </PopoverTrigger>
                <PopoverContent>
                    <Button variant="link" onClick={logoutHandler} >Logout</Button>
                </PopoverContent>
            </Popover>
        ) : (
            <div>
                <Link to="/login">Login</Link>
                <Link to="/signup">Signup</Link>
            </div>
        )}
        </div>
    </div>
  )
}

export default Navbar