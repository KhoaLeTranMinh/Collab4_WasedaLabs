import TopNavbar from "../components/top-navbar"

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<div className='flex h-screen flex-col md:flex-row md:overflow-hidden'>
			<TopNavbar />
			<div className='flex-grow p-6 md:overflow-y-auto md:p-12'>{children}</div>
		</div>
	)
}
