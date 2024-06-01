import "@/app/global.css"
import { inter } from "@/app/fonts"
import LogInContextProvider from "./utility/logInContextProvider"
export default async function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang='en'>
			<body className={`${inter.className} antialiased`}>
				<LogInContextProvider>{children}</LogInContextProvider>
			</body>
		</html>
	)
}
