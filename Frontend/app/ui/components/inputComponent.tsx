import * as React from "react"
// import styled from "@emotion/styled"
import Errors from "@/app/utility/Errors"
// import Icon from "@/app//ui/Icon/icon"

const Input = ({ errors, name, onChange, placeholder, required, type, value }) => {
	const inputRef = React.useRef(null)

	const handleClick = () => {
		if (inputRef && inputRef.current) inputRef.current.focus()
	}

	return (
		<div className='mb-6 w-full'>
			<div onClick={handleClick} className='flex flex-row items-center justify-center'>
				<input
					className='w-2/3 h-12 px-4 rounded-3xl   focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 font-sans text-lg text-gray-700 bg-[#D9D9D9]'
					ref={inputRef}
					type={type}
					name={name}
					onChange={onChange}
					placeholder={placeholder}
					value={value}
				/>
			</div>
			{errors && !value && required && <Errors data-testid='errors'>Required!</Errors>}
		</div>
	)
}

// const Input = styled(InputComponent)`
// 	height: 65px;
// 	position: relative;
// 	width: 100%;

// 	.container {
// 		width: 100%;

// 		:not(:hover) {
// 			svg {
// 				color: ${({ errors, value, required }) => (errors && !value && required ? "#e80700" : "#ccc")};
// 			}
// 		}
// 	}

// 	input {
// 		color: var(--color-blue);
// 		width: 100%;
// 		font-size: 12px;
// 		border: 1px solid ${({ errors, value, required }) => (errors && !value && required ? "#e80700" : "#888")};
// 		border-radius: 10px;
// 		width: 100%;
// 		transition: border, color 0.2s ease-in-out;
// 		background: transparent;

// 		:-webkit-autofill {
// 			-webkit-text-fill-color: #fff;
// 			box-shadow: 0 0 0px 1000px #222b36 inset;

// 			:focus {
// 				box-shadow: 0 0 0px 1000px #266798 inset;
// 			}
// 		}

// 		::placeholder {
// 			color: #ccc;
// 		}

// 		:hover {
// 			border: 1px solid #ccc;
// 		}

// 		:focus {
// 			outline: 0;
// 			border: 1px solid #ccc;
// 			background: #266798;
// 		}
// 	}
// `

export default Input
