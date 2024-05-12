/* eslint-disable react/no-unescaped-entities */
"use client"
// import type { NextPage } from "next"
import { useCallback } from "react"
import { TextField, InputAdornment, Icon, IconButton } from "@mui/material"
import Input from "@/app/ui/components/inputComponent"
import styles from "./index.module.css"
import React from "react"
import Image from "next/image"
import SignInImage from "@/public/SignIn.png"
import Link from "next/link"
import SimpleButton from "./ui/components/simpleButton"
const Page = () => {
	const [state, setState] = React.useState({
		email: "",
		password: "",
		errors: false,
	})
	const { email, errors, password } = state

	const handleChange = React.useCallback(({ target: { name, value } }) => {
		setState((prevState) => ({
			...prevState,
			[name]: value,
		}))
	}, [])
	return (
		<div className='flex flex-col justify-center items-center w-full gap-6 p-20'>
			<Image width={250} height={275} src={SignInImage} alt='SignInImage'></Image>
			<h1 className='text-3xl text-center'>Welcome Back</h1>
			<p className='text-center'>Please log in to your existing account</p>
			<Input
				required
				type='email'
				name='email'
				placeholder='Enter your email...'
				value={email}
				errors={errors}
				onChange={handleChange}
			/>
			<Input
				required
				type='password'
				name='password'
				placeholder='Enter your password...'
				value={password}
				errors={errors}
				onChange={handleChange}
			/>
			<SimpleButton text='Login' />
			<p className=''>
				Don't have an account?
				<Link href={"ui/signup"}>
					{" "}
					<strong className='hover:text-[#F3CBD7]'>Sign up</strong>
				</Link>
			</p>
		</div>
	)
}
export default Page
