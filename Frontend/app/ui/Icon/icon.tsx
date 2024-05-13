import * as React from "react"
import styled from "@emotion/styled"
import { BiLock, FaBug, IoMailOpenOutline } from "./Icons"

const icons = (type) => {
	switch (type) {
		case "email": {
			return <IoMailOpenOutline />
		}
		case "password": {
			return <BiLock />
		}
		default: {
			return <FaBug />
		}
	}
}

const IconComponent = ({ className, dataTestId, onClick, style, type }) => (
	<i
		role='presentation'
		aria-hidden='true'
		className={className}
		data-testid={dataTestId}
		onClick={onClick}
		style={style}
		tabIndex={-1}
	>
		{icons(type)}
	</i>
)

const Icon = styled(IconComponent)`
	position: absolute;
	font-size: 20px;
	padding-left: 16px;
	padding-top: 9px;
	transition: all 0.3s ease-in-out;
	z-index: 1;
`

export default Icon
