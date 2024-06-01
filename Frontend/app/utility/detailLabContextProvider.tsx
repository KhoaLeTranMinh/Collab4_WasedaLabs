"use client"
import axios from "axios"
import React, { createContext, use, useContext, useEffect, useState } from "react"

export const DetailLabContext = createContext(null)
const fetcher = (args) => fetch(args).then((res) => res.json()) // the "[]" is SO IMPORTANT IT TAKES ME HOUR HOLY COW
export default function DetailLabContextProvider({ children, school, major, index }) {
	const [lab, setLab] = useState({})
	useEffect(() => {
		// axios({
		// 	method: "GET",
		// 	url: `http://localhost:3000/labs/get/${school}/${major}`,
		// 	responseType: "json",
		// })
		// axios
		// 	.get(`http://localhost:3000/labs/get/${school}/${major}/${index}`)
		// 	.then((response) => {
		// 		// console.log(response)
		// 		// setLab(response.data)
		// 		response.data["comments"].map((comment) => console.log(comment))
		// 		return response.data
		// 	})
		// 	.catch((error) => {
		// 		setLab(null)
		// 	})
		fetch(`http://localhost:3000/labs/get/${school}/${major}/${index}`)
			.then((response) => response.json())
			.then((data) => {
				setLab(data)
			})
	}, [index, major, school])
	return <DetailLabContext.Provider value={{ lab, setLab }}>{children} </DetailLabContext.Provider>
}
export const UseDetailLabData = () => useContext(DetailLabContext)
