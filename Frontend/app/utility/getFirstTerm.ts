export default function getFirstTerm(secondTerm, enumObj) {
	for (let key in enumObj) {
		if (enumObj.hasOwnProperty(key) && enumObj[key] === secondTerm) {
			return key
		}
	}
	return null // If the second term is not found
}
