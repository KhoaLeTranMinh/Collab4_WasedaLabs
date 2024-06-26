/* eslint-disable @next/next/no-img-element */
"use client"
import React, { useEffect } from "react"
import Image from "next/image"
import { promises as fs } from "fs"
import StarRating from "./star-rating"
import getLocalData from "@/app/utility/getLocalData"
import useSWR from "swr"
import { useRouter } from "next/router"
import CommentBox from "./comment-box"

import Custom404 from "@/app/404"
import Link from "next/link"
import { useLabData } from "@/app/utility/labContextProvider"
import { Odibee_Sans } from "next/font/google"

// const fetcher = (url) => fetch(url).then((res) => res.json())
// 'flex flex-1 flex-row gap-x-2 mb-28 flex-wrap
// flex basis-1/4'
// flex flex-col basis-1/12 max-w-[200px] flex-wrap
export default function LabInfoCard(props) {
	const { school, major, data, index } = props
	// console.log(data)
	// const router = useRouter()
	// useEffect(() => {
	// 	router.reload()
	// }, [router])

	return (
		<div>
			<div className=' grid grid-cols-10 border-4 border-[#F3CBD7] rounded-[20px] p-2 gap-x-16 mb-8 min-h-[300px]'>
				<div className='col-span-2'>
					{data ? <Image height={300} width={300} src={data["profImg"]} alt='' className='object-contain  ' /> : null}
				</div>
				<div className='col-span-4 flex-col justify-center items-center flex-wrap '>
					<div className=''>
						<p className='text-lab'>
							{" "}
							{data["profName"]} (Rating: {data["rating"].toFixed(2)})
						</p>
					</div>
					{/* <div className='my-2'>
						<StarRating />
					</div> */}
					<div className='my-2'>
						<p>
							<strong>Research Fields:</strong>
						</p>
						{data["researchAreas"].map((area) => (
							<div key={area}>
								<p>{area}</p>
							</div>
						))}
					</div>
					<div className='col-span-4 '>
						<a href={data["labWebsite"]}>
							<div className='flex flex-col  break-all'>
								<p className='text-black-300 font-bold hover:text-pink-400 basis-1/3 '>
									Lab website link: {data["labWebsite"]}
								</p>
							</div>
						</a>
					</div>
					<div className='mt-10'>
						<Link href={{ pathname: `/ui/inner/comments/${data["profName"]}`, query: { comments: data["comments"] } }}>
							<p className='text-black-300 font-bold hover:text-pink-400 basis-1/3 '>
								Click here to see all the comments
							</p>
						</Link>
					</div>
				</div>
				<div className='flex basis-1/4'>
					<CommentBox school={school} major={major} id={index}></CommentBox>
				</div>
			</div>
		</div>
	)
}
