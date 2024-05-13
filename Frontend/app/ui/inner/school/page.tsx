import React from "react"
import BigButton from "../../components/schoolButton"
import SchoolFullscreenPopup from "../../components/SchoolFullscreenPopup"
import SimpleButton from "../../components/simpleButton"
import * as school from "../../../utility/constants.school"
import * as major from "../../../utility/constants.major"
import { Schools } from "../../../utility/constants.school"
import getFirstTerm from "@/app/utility/getFirstTerm"
export default function page() {
	const majors_fse = [major.CSCE, major.MS]
	const majors_cse = [major.CE, major.ME]
	const majors_ase = [major.PHY, major.CHEM, major.BIOS]
	// console.log(getFirstTerm(school.FSE, Schools))

	return (
		<div>
			<SchoolFullscreenPopup majors={majors_fse} school={school.FSE}></SchoolFullscreenPopup>
			<SchoolFullscreenPopup majors={majors_cse} school={school.CSE}></SchoolFullscreenPopup>
			<SchoolFullscreenPopup majors={majors_ase} school={school.ASE}></SchoolFullscreenPopup>
		</div>
	)
}
