'use client'
import AuthNav from "@/components/AuthNav"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Image from "next/image"
import Link from "next/link"
import { useState } from 'react'

const Register = () => {
  const[name, setName]=useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const[confirmPassword, setConfirmPassword]=useState('');

  const handleRegister=()=>{

  }

  return (
    <div className="h-screen">
      <AuthNav />

      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="hidden lg:block">
          <Image
            src={'/images/design.svg'}
            alt="auth side image"
            width={100}
            height={100}
            className="h-screen w-full"
          />
        </div>

        <div className="flex justify-center items-center mt-20 lg:mt-0">
          <div className="px-10 lg:px-32 w-full">

            <h1 className="text-5xl font-bold">DevUI</h1>
            <p>Explore the world's best design for your next project.</p>

            <div className="mt-4">
              <Label htmlFor="name">Name</Label>
              <Input
                placeholder="Enter your name"
                id="name"
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </div>

            <div className="mt-4">
              <Label htmlFor="email">Email</Label>
              <Input
                placeholder="Enter your email"
                id="email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>

            <div className="mt-4">
              <Label htmlFor="password">Password</Label>
              <Input
                placeholder="Enter your password"
                id="password"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>

            <div className="mt-4">
              <Label htmlFor="confirmpassword">Confirm Password</Label>
              <Input
                placeholder="Enter your confirm password"
                id="confirmpassword"
                type="password"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
              />
            </div>

            <div className="mt-4">
              <Button onClick={handleRegister} className="w-full">Register</Button>
            </div>

            <div className="mt-2 text-center">
              <strong className="font-bold">Already have an account ?</strong>
              <Link className="text-purple-500 ml-2" href={'/login'}>Login</Link>
            </div>

          </div>
        </div>

      </div>
    </div>
  )
}

export default Register
