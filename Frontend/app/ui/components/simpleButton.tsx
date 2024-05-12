// import { Button } from "@mui/material"
import React from "react"

export default function SimpleButton(props: { text: string; children?: React.ReactNode }) {
	const [text, children] = [props.text, props.children]
	return (
		<div>
			<button className='w-full h-[100px] bg-[#F3CBD7] rounded-[10px] my-10 text-[30px] text-white'>
				{children} {text}
			</button>
		</div>
	)
}
