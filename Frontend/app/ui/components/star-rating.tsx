import { Rating } from "@mui/material"
import React from "react"

export default function StarRating() {
	const [value, setValue] = React.useState(0)
	const [hover, setHover] = React.useState(-1)
	return (
		<div>
			<Rating
				name='simple-controlled'
				value={value}
				onChange={(event, newValue) => {
					setValue(newValue)
				}}
				// onChangeActive={(event, newHover) => {
				// 	setHover(newHover)
				// }}
			/>
		</div>
	)
}
