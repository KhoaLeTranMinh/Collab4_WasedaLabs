// components/FullscreenPopup.js
"use client"
import React, { useState } from "react"
import styles from "./SchoolFullscreenPopup.module.css"
import SimpleButton from "./simpleButton"
import Link from "next/link"
import { Majors } from "@/app/utility/constants.major"
import { Schools } from "@/app/utility/constants.school"
import getFirstTerm from "@/app/utility/getFirstTerm"
const SchoolFullscreenPopup = (props) => {
	const [isOpen, setIsOpen] = useState(false)
	const { majors, school } = props
	const togglePopup = () => {
		setIsOpen(!isOpen)
	}
	const school_link = getFirstTerm(school, Schools)

	return (
		<div>
			<button
				onClick={togglePopup}
				className='w-[100%] h-[200px]  text-[40px] bg-[#F3CBD7] text-white rounded-[10px] my-10'
			>
				School of {school}
			</button>
			{isOpen && (
				<div className={styles.overlay}>
					<div className={styles.popup}>
						<button onClick={togglePopup} className={styles.closeButton}>
							Close
						</button>
						<div className='flex flex-col justify-center'>
							{majors.map((major, index) => {
								const major_link = getFirstTerm(major, Majors)
								return (
									<Link href={`/ui/inner/${school_link}/${major_link}`} key={index}>
										<div key={index}>
											<SimpleButton text={major}>Major in </SimpleButton>
										</div>
									</Link>
								)
							})}
						</div>
					</div>
				</div>
			)}
		</div>
	)
}

export default SchoolFullscreenPopup
