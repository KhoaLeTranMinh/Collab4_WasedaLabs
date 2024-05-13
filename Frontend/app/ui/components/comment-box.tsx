import { useState } from "react"

export default function CommentBox() {
	const [comment, setComment] = useState("")

	const handleCommentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		setComment(event.target.value)
	}

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		// Handle comment submission logic here
		console.log("Submitted comment:", comment)
		setComment("")
	}

	return (
		<form onSubmit={handleSubmit}>
			<textarea rows={6} cols={40} value={comment} onChange={handleCommentChange} placeholder='Write a comment...' />
			<button type='submit'>Submit</button>
		</form>
	)
}
