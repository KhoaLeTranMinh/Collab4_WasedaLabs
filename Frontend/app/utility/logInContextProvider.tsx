"use client"
import axios from "axios"
import React, { createContext, use, useContext, useEffect, useState } from "react"

export const LogInContext = createContext(null)
export default function LogInContextProvider({ children }) {
	const [loggedIn, setLoggedIn] = useState(false)
	const [user, setUser] = useState(null)
	useEffect(() => {
		axios({
			method: "GET",
			url: "http://localhost:3000/user/currentuser",
		})
			.then((response) => {
				setLoggedIn(true)
				setUser(response.data)
			})
			.catch((error) => {
				setLoggedIn(false)
				setUser(null)
			})
	}, [loggedIn, user])
	return <LogInContext.Provider value={{ loggedIn, setLoggedIn, user, setUser }}>{children} </LogInContext.Provider>
}
export const useLogin = () => useContext(LogInContext)
