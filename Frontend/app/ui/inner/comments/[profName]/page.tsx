"use client"
import { DetailLabContext, UseDetailLabData } from "@/app/utility/detailLabContextProvider"
import React, { useContext, useEffect } from "react"

export default function CommentPage({ searchParams }: { searchParams: { comments: string[] } }) {
	// searchParams pattern
	// const { school, major, index } = params
	// const { lab, setLab } = useContext(DetailLabContext)

	// const { comments } = lab
	// const length = comments.length
	// useEffect(() => {
	// 	console.log(comments)
	// 	console.log(Array.isArray(comments))
	// 	console.log(comments.length)
	// })
	const comments = searchParams.comments //searchParams pattern
	const isArray = Array.isArray(comments)

	return (
		<div>
			<h1 className='text-3xl text-center mb-10 font-extrabold'>What is everyone else saying?</h1>
			{!isArray && !comments && <p className='text-2xl'>No comment yet</p>}
			{!isArray && comments && <p className='text-2xl'>{comments}</p>}

			{isArray && (
				<div className='flex flex-col justify-center items-start gap-8'>
					{comments.map((comment, index) => {
						return (
							<p className='text-2xl' key={index}>
								{`"${comment}"`}
							</p>
						)
					})}
				</div>
			)}
		</div>
	)
}
