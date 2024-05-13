import Image from "next/image"
import Link from "next/link"
import home from "/public/home.png"
import find from "/public/find.png"
import userImage from "/public/user.png"

// Top navbar
export default function Navbar() {
	const user = null
	const username = null

	return (
		<nav className='navbar'>
			<ul>
				<li>
					<Link href={"/"}>
						<Image src={home} alt='home-image' width={80} height={80} />
					</Link>
				</li>
				<li>
					<Link href='/'>
						<Image src={find} alt='find-image' width={80} height={80} />
					</Link>
				</li>
				<li>
					<Link href='/'>
						<Image src={userImage} alt='user-image' width={80} height={80} />
					</Link>
				</li>

				{/* user is signed-in and has username */}
				{/* {username && (
					<>
						<li className='push-left'>
							<Link href='/admin'>
								<button className='btn-blue'>Write Posts</button>
							</Link>
						</li>
						<li>
							<Link href={`/${username}`}>
								<Image src={user?.photoURL} alt='' />
							</Link>
						</li>
					</>
				)} */}

				{/* user is not signed OR has not created username */}
				{/* {!username && (
					<li>
						<Link href='/enter'>
							<button className='btn-blue'>Log in</button>
						</Link>
					</li>
				)} */}
			</ul>
		</nav>
	)
}
