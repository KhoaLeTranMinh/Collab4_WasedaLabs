/* eslint-disable react/no-unescaped-entities */
"use client"
// import type { NextPage } from "next"
import { useCallback } from "react"
import { TextField, InputAdornment, Icon, IconButton } from "@mui/material"
import Input from "@/app/ui/components/inputComponent"
import React from "react"
import Image from "next/image"
import SignInImage from "@/public/SignIn.png"
import Link from "next/link"
import SimpleButton from "./ui/components/simpleButton"
import axios from "axios"
import { useRouter } from "next/navigation"
import { log } from "console"
const Page = () => {
	const [state, setState] = React.useState({
		email: "",
		password: "",
		error: false,
	})
	const { email, error, password } = state
	const router = useRouter()
	const handleChange = React.useCallback(({ target: { name, value } }) => {
		setState((prevState) => ({
			...prevState,
			[name]: value,
		}))
	}, [])

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		axios({
			method: "POST",
			url: "http://localhost:3000/user/login",
			data: {
				email: state.email,
				password: state.password,
			},
		})
			.then((response) => {
				console.log(response)
				router.push("/ui/inner/school")
			})
			.catch((error) => {
				console.log(error.response)
				setState((prevState) => ({
					...prevState,
					error: true,
				}))
			})
	}
	return (
		<div className='flex flex-col justify-center items-center w-full gap-6 pb-14'>
			<Image width={250} height={275} src={SignInImage} alt='SignInImage'></Image>
			<h1 className='text-3xl text-center'>Welcome Back</h1>
			<p className='text-center'>Please log in to your existing account</p>
			<form onSubmit={handleSubmit} className='w-full'>
				<Input
					required
					type='email'
					name='email'
					placeholder='Enter your email...'
					value={email}
					errors={error}
					onChange={handleChange}
				/>
				<Input
					required
					type='password'
					name='password'
					placeholder='Enter your password...'
					value={password}
					errors={error}
					onChange={handleChange}
				/>
				<SimpleButton text='' className={"w-[400px]"}>
					<input type='submit' value='Login' />
				</SimpleButton>
			</form>
			<p className=''>
				Don't have an account?
				<Link href={"ui/signup"}>
					{" "}
					<strong className='hover:text-[#F3CBD7]'>Sign up</strong>
				</Link>
			</p>
			{error && (
				<div className='bg-red-300'>
					<p>Invalid email or password or email is not verified</p>
				</div>
			)}
		</div>
	)
}
export default Page
