import { Rating } from "@mui/material"
import React from "react"

export default function StarRating({ handleChange, value }) {
	return (
		<div>
			<Rating name='simple-controlled' value={value} onChange={(event, value) => handleChange(value)} />
		</div>
	)
}
