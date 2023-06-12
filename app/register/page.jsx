"use client";

import { redirect } from "next/navigation";
import Link from "next/link";
import React, { useContext, useState } from "react";
import { toast } from "react-hot-toast";
import { Context } from "../../components/Clients";

const page = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {user, setUser} = useContext(Context);

  const registerHandler = async(e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers:{
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const data = await res.json();
      if(!data.success) return toast.error(data.message)

      setUser(data.user);
      toast.success(data.message);

      
    } catch (error) {
      return toast.error(error);
    }
  }
  if(user._id) return redirect("/");

    return (
    <div className="login">
    <section>
    <form onSubmit={registerHandler}>
        <input value={name} onChange={(e)=> setName(e.target.value)} type="text" placeholder='enter name' />
        <input value={email} onChange={(e)=> setEmail(e.target.value)} type="email" placeholder='enter email' />
      
        <input value={password} onChange={(e)=>setPassword(e.target.value)} type="password" placeholder="enter password"/>
        <button type="submit">Register</button>
        <p>OR</p>
        <Link href={"/login"}>Login</Link>
    </form>
    </section>
   </div>
  )
}
 const metadata = {
    title: 'Register Page',
    description: 'This is a Register page of todo app project made for next js series',
  }
export default page