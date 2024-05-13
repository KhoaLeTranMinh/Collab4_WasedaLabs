import { promises as fs } from "fs"
import path from "path"

export default async function getLocalData() {
	const filePath = path.join(process.cwd(), "public/Data/FSE/CSCE.json")
	console.log(filePath)

	const file = await fs.readFile(filePath, "utf-8")
	const data = await JSON.parse(file)
	return data
}
