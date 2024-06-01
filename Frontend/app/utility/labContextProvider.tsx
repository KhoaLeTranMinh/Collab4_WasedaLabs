"use client"
import axios from "axios"
import React, { createContext, use, useContext, useEffect, useState } from "react"

export const LabContext = createContext(null)
export default function LabContextProvider({ children, school, major }) {
	const [labData, setLabData] = useState([]) // the "[]" is SO IMPORTANT IT TAKES ME HOUR HOLY COW
	useEffect(() => {
		// axios({
		// 	method: "GET",
		// 	url: `http://localhost:3000/labs/get/${school}/${major}`,
		// 	responseType: "json",
		// })
		axios
			.get(`http://localhost:3000/labs/get/${school}/${major}`)
			.then((response) => {
				// response.data.map((lab) => {
				// 	console.log(lab)
				// })
				setLabData(response.data)
			})
			.catch((error) => {
				setLabData(null)
			})
	}, [major, school])
	return <LabContext.Provider value={{ labData, setLabData }}>{children} </LabContext.Provider>
}
export const useLabData = () => useContext(LabContext)
