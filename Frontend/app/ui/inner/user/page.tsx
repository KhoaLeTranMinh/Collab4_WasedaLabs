"use client"
import { useLogin } from "@/app/utility/logInContextProvider"
import React from "react"

export default function Page() {
	let { loggedIn, setLoggedIn, user, setUser } = useLogin()
	const { email, firstName, lastName, school, major } = user
	return (
		loggedIn && (
			<div>
				<h1 className='text-3xl text-center mb-10 font-extrabold'>Basic Info</h1>
				<div className='flex flex-col justify-center items-start gap-8'>
					<p>
						<strong>Email</strong>: {email}
					</p>
					<p>
						<strong>First name </strong>: {firstName}
					</p>
					<p>
						<strong>Last name</strong>: {lastName}
					</p>
					<p>
						<strong>School</strong>: {school}
					</p>
					<p>
						<strong>Major</strong>: {major}
					</p>
				</div>
			</div>
		)
	)
}
