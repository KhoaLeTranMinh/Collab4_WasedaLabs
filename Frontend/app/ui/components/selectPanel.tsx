import React from "react"
// bg - [#D9D9D9]

type propTypes = {
	text: string
	name: string
	schools?: string[]
	majors?: string[]
}
export default function SelectPanel(Props: propTypes) {
	const { text, schools, majors } = Props
	return (
		<div className='flex w-full justify-center mb-6'>
			{/* <label htmlFor='personal-hobby' className='block text-sm font-medium text-gray-700'>
				{text}
			</label> */}
			<select
				title='school'
				id='personal-hobby'
				name='personal-hobby'
				className='w-2/3 h-12 px-4 rounded-3xl  bg-[#D9D9D9] focus:outline-none focus:ring-2 focus:ring-pink-600 focus:ring-opacity-50 font-sans text-lg text-gray-700'
				onInput={(e: React.ChangeEvent<HTMLSelectElement>) => console.log(e.target.value)}
			>
				<option value='' selected disabled hidden>
					{text}
				</option>
				{schools &&
					schools.map((school) => {
						return (
							<option key={school} value={school}>
								{school}
							</option>
						)
					})}
				{majors &&
					majors.map((school) => {
						return (
							<option key={school} value={school}>
								{school}
							</option>
						)
					})}
			</select>
		</div>
	)
}
