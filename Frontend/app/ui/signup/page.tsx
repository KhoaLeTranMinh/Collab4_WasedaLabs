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
import axios from "axios"
import shadows from "@mui/material/styles/shadows"
import { Suspense } from "react"
import { log } from "console"
import { Spinner } from "@/app/ui/components/Spinner"
const Page = () => {
	const [state, setState] = React.useState({
		email: "",
		password: "",
		error: false,
		errorMsgs: [] as string[],
		firstName: "",
		lastName: "",
		school: "",
		major: "",
		verifyEmail: false,
	})
	const { email, error, password, firstName, lastName, school, major, errorMsgs, verifyEmail } = state

	const handleChange = React.useCallback(({ target: { name, value } }) => {
		setState((prevState) => ({
			...prevState,
			[name]: value,
		}))
	}, [])

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		axios({
			method: "POST",
			url: "http://localhost:3000/user/signup",
			data: {
				email: state.email,
				password: state.password,
				firstName: state.firstName,
				lastName: state.lastName,
				school: state.school,
				major: state.major,
			},
		})
			.then((response) => {
				console.log("submission has been made")

				console.log(response)
				setState((prevState) => ({
					email: "",
					password: "",
					error: false,
					errorMsgs: [] as string[],
					firstName: "",
					lastName: "",
					school: "",
					major: "",
					verifyEmail: true,
				}))
			})
			.catch((error) => {
				// console.log(error.response.data.message)
				console.log(error)

				setState((prevState) => ({
					...prevState,
					error: true,
					errorMsgs: [error.response.data.message],
				}))
			})
		e.preventDefault()
	}
	return (
		<Suspense fallback={<Spinner />}>
			<div className='flex flex-col justify-center items-center w-full gap-6 p-20'>
				<Image width={250} height={275} src={SignInImage} alt='SignInImage'></Image>
				<h1 className='text-3xl text-center'>Register</h1>
				<p className='text-center'>
					After new registration and login , you will be able to use the convenient functions.
				</p>
				<form action='' className='w-full' onSubmit={handleSubmit}>
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
					<Input
						required
						type='text'
						name='firstName'
						placeholder='Firstname...'
						value={firstName}
						errors={error}
						onChange={handleChange}
					/>
					<Input
						required
						type='text'
						name='lastName'
						placeholder='Lastname...'
						value={lastName}
						errors={error}
						onChange={handleChange}
					/>
					<SelectPanel
						schools={Object.values(Schools)}
						name='school'
						text='Select your school'
						onChange={handleChange}
					/>
					<SelectPanel majors={Object.values(Majors)} name='major' text='Select your major' onChange={handleChange} />
					<SimpleButton text='' className={"w-[400px]"}>
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
				{error && errorMsgs.length != 0 && (
					<div className='bg-red-300'>
						{errorMsgs.map((msg, index) => (
							<p key={index}>
								{msg}
								<br />
							</p>
						))}
					</div>
				)}
				{verifyEmail && (
					<div className='bg-pink-300'>Registration success! An email verification link has been sent!</div>
				)}
			</div>
		</Suspense>
	)
}
export default Page
