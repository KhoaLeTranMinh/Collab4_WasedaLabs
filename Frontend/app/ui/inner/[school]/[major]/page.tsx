"use client"
import React, { use, useContext, useEffect } from "react"
import LabInfoCard from "../../../components/labInfo"
import Custom404 from "@/app/404"
import * as MAJORS from "@/app/utility/constants.major"
import { LabContext, useLabData } from "../../../../utility/labContextProvider"
import { log } from "console"
import { useLogin } from "@/app/utility/logInContextProvider"
export const dynamic = "force-dynamic"
export default function Page({ params }: { params: { school: string; major: string } }) {
	const { school, major } = params

	let { labData, setLabData } = useContext(LabContext)
	useEffect(() => {
		labData.map((lab) => {
			console.log(lab)
		})
		// console.log(labData)
	}, [labData])
	return (
		<div className=''>
			<div className='mb-10 text-center font-extrabold '>
				<h1 className='text-[3.125rem] mb-20'>Laboratories from {MAJORS[major]} Major</h1>
				<div></div>
				{labData.map((lab, index) => {
					return <LabInfoCard key={index} data={lab} school={school} major={major} index={lab["index"]} />
				})}
			</div>
		</div>
	)
}

// {/* <div class}Name='flex flex-col justify-start flex-grow-1 w-full'></div> */}
