"use client" // important, if you want to useContext
import Image from "next/image"
import Link from "next/link"
import home from "/public/home.png"
import find from "/public/find.png"
import userImage from "/public/user.png"
import React, { useContext, useEffect, useState } from "react"
import axios from "axios"
import { useRouter } from "next/navigation"
import { LogInContext, useLogin } from "@/app/utility/logInContextProvider"
// Top navbar
export default function Navbar() {
	// const user = null
	// const username = null
	let { loggedIn, setLoggedIn, user, setUser } = useLogin()
	const router = useRouter()

	const handleClick = async (event: React.MouseEvent<HTMLElement>) => {
		await axios({
			method: "POST",
			url: "http://localhost:3000/user/logout",
		})
			.then(() => {
				setLoggedIn(false)
			})
			.catch((error) => {
				console.log(error)
			})
	}

	return (
		<nav className='navbar'>
			<ul>
				<li>
					<Link href={{ pathname: "/" }}>
						<Image src={home} onClick={handleClick} alt='home-image' width={80} height={80} />
					</Link>
				</li>

				<li>
					<Image src={find} alt='find-image' width={80} height={80} />
				</li>
				<li>
					<Link href={{ pathname: "/ui/inner/user" }}>
						<Image src={userImage} alt='user-image' width={80} height={80} />
					</Link>
				</li>

				{/* user is signed-in and has username */}
				{/* {username && (
					<>
						<li className='push-left'>
							<Link href='/admin'>
								<button className='btn-blue'>Write Posts</button>
							</Link>
						</li>
						<li>
							<Link href={`/${username}`}>
								<Image src={user?.photoURL} alt='' />
							</Link>
						</li>
					</>
				)} */}

				{/* user is not signed OR has not created username */}
				{/* {!username && (
					<li>
						<Link href='/enter'>
							<button className='btn-blue'>Log in</button>
						</Link>
					</li>
				)} */}
			</ul>
		</nav>
	)
}
