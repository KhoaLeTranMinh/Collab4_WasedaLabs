import useSWR from "swr"
const fetcher = (url) => fetch(url).then((res) => res.json())
export default function GetLab() {
	const { data } = useSWR(`http://localhost:3000/labs/get/FSE/CSCE`, fetcher)
	console.log(data)

	return {
		labData: data,
	}
}
