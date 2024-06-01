import { useState } from "react"
import StarRating from "./star-rating"
import axios from "axios"

export default function CommentBox({ school, major, id }) {
	const [comment, setComment] = useState("")
	const [rating, setRating] = useState(0)

	const handleCommentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		setComment(event.target.value)
	}
	const handleStarChange = (star: number) => {
		setRating(star)
	}
	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		// Handle comment submission logic here

		axios.patch(`http://localhost:3000/labs/update/${school}/${major}/${id}`, { comment: comment, rating: rating })
		setComment("")
		setRating(0)
	}

	return (
		<form onSubmit={handleSubmit}>
			<div className='my-2'>
				<StarRating handleChange={handleStarChange} value={rating} />
			</div>
			<textarea rows={6} cols={40} value={comment} onChange={handleCommentChange} placeholder='Write a comment...' />
			<button type='submit'>Submit</button>
		</form>
	)
}
