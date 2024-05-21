import styles from "./Spinner.module.css"

import React from "react"

export function Spinner() {
	return (
		<div className={styles.spinnerOverlay}>
			<div className={styles.spinner}></div>
		</div>
	)
}

export default Spinner
