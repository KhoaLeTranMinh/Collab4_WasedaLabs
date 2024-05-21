// "use client"
import React, { useEffect } from "react"
import LabInfoCard from "../../../components/labInfo"
import { useParams, useRouter } from "next/navigation"
import Custom404 from "@/app/404"
import * as SCHOOLS from "@/app/utility/constants.school"
import * as MAJORS from "@/app/utility/constants.major"
export const dynamic = "force-dynamic"
export default async function Page({ params }: { params: { school: string; major: string } }) {
	const { school, major } = params

	const labData = await fetch(
		`http://localhost:3000/labs/get/${school}/${major}`,
		{ cache: "force-cache" }
		// { next: { revalidate: 3600 } }
	).then((data) => {
		return data.json()
	})
	// console.log(labData)

	return (
		<div className=''>
			{!labData.status ? (
				<div className='mb-10 text-center font-extrabold '>
					<h1 className='text-[3.125rem] mb-20'>Laboratories from {MAJORS[major]} Major</h1>
					{Object.values(labData).map((lab, index) => {
						return <LabInfoCard key={index} data={lab} />
					})}
				</div>
			) : (
				<Custom404 />
			)}
		</div>
	)
}

// {/* <div class}Name='flex flex-col justify-start flex-grow-1 w-full'></div> */}
