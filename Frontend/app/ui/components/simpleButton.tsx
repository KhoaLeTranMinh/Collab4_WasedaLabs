// import { Button } from "@mui/material"
import React from "react"

export default function SimpleButton(props: { text: string; children?: React.ReactNode; className?: string }) {
	const { text, children, className } = props
	return (
		<div className='flex justify-center items-center'>
			<button className={`h-[100px] bg-[#F3CBD7] rounded-[10px] text-[30px] text-white ${className}`}>
				{children} {text}
			</button>
		</div>
	)
}
