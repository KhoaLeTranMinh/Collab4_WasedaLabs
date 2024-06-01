import LabContextProvider from "../../../../utility/labContextProvider"
import { useRouter } from "next/router"

export default function Layout({
	children,
	params,
}: {
	children: React.ReactNode
	params: {
		school: string
		major: string
	}
}) {
	const { school, major } = params
	return (
		<LabContextProvider school={school} major={major}>
			{children}
		</LabContextProvider>
	)
}
