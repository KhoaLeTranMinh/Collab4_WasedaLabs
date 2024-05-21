import React from "react"
// bg - [#D9D9D9]

type propTypes = {
	text: string
	name: string
	// value: string
	schools?: string[]
	majors?: string[]
	onChange: ({ target: { name, value } }) => void
}
export default function SelectPanel(Props: propTypes) {
	const { text, name, schools, majors, onChange } = Props
	return (
		<div className='flex w-full justify-center mb-6'>
			{/* <label htmlFor='personal-hobby' className='block text-sm font-medium text-gray-700'>
				{text}
			</label> */}
			<select
				title='school or major'
				name={name}
				// value={value}
				className='w-2/3 h-12 px-4 rounded-3xl  bg-[#D9D9D9] focus:outline-none focus:ring-2 focus:ring-pink-600 focus:ring-opacity-50 font-sans text-lg text-gray-700'
				onInput={(e: React.ChangeEvent<HTMLSelectElement>) => {
					onChange({ target: { name, value: e.target.value } })
				}}
			>
				<option value={text} selected disabled hidden>
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
					majors.map((major) => {
						return (
							<option key={major} value={major}>
								{major}
							</option>
						)
					})}
			</select>
		</div>
	)
}
