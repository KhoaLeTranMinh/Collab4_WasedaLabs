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
import SelectPanel from "../components/selectPanel"
import { Schools } from "@/app/utility/constants.school"
import { Majors } from "@/app/utility/constants.major"
import SimpleButton from "@/app/ui/components/simpleButton"
const Page = () => {
	const [state, setState] = React.useState({
		email: "",
		password: "",
		errors: false,
		firstName: "",
		lastName: "",
		school: "",
		major: "",
	})
	const { email, errors, password, firstName, lastName, school, major } = state

	const handleChange = React.useCallback(({ target: { name, value } }) => {
		setState((prevState) => ({
			...prevState,
			[name]: value,
		}))
	}, [])
	return (
		<div className='flex flex-col justify-center items-center w-full gap-6 p-20'>
			<Image width={250} height={275} src={SignInImage} alt='SignInImage'></Image>
			<h1 className='text-3xl text-center'>Register</h1>
			<p className='text-center'>
				After new registration and login , you will be able to use the convenient functions.
			</p>
			<form action='' className='w-full'>
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
				<Input
					required
					type='text'
					name='password'
					placeholder='Firstname...'
					value={firstName}
					errors={errors}
					onChange={handleChange}
				/>
				<Input
					required
					type='text'
					name='major'
					placeholder='Lastname...'
					value={lastName}
					errors={errors}
					onChange={handleChange}
				/>
				<SelectPanel schools={Object.values(Schools)} name='major' text='Select your school' />
				<SelectPanel majors={Object.values(Majors)} name='school' text='Select your major' />
				<SimpleButton text='' className={["w-[300px]"]}>
					<input type='submit' value='Register' />
				</SimpleButton>
			</form>

			<p className=''>
				Already have an account?
				<Link href={"/"}>
					{" "}
					<strong className='hover:text-[#F3CBD7]'>Log in</strong>
				</Link>
			</p>
		</div>
	)
}
export default Page
