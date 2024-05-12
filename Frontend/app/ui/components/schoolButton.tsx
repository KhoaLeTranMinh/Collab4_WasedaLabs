"use client"
import { on } from "events"
import React, { useState } from "react"

interface BigButtonProps {
	text: string
}

const BigButton: React.FC<BigButtonProps> = ({ text }) => {
	const onClick = () => {}
	const [isOpen, setIsOpen] = useState(false)

	const togglePopup = () => {
		setIsOpen(!isOpen)
	}
	return (
		<button
			// style={{
			// 	width: "80",
			// 	height: "50px",
			// 	fontSize: "20px",
			// 	backgroundColor: "#F3CBD7",
			// 	color: "white",
			// 	borderRadius: "10px",
			// 	cursor: "pointer",
			// }}
			className='w-[100%] h-[200px] h-50 text-[30px] bg-[#F3CBD7] text-white rounded-[10px] my-10 '
			onClick={() => togglePopup}
		>
			{text}
		</button>
	)
}

export default BigButton
