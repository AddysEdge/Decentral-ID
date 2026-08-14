import { useContext } from "react"
import { Link, useLocation } from "react-router-dom"
import { TransactionContext } from "../context/TransactionContext"

export default function Nav() {
	const { currentAccount } = useContext(TransactionContext)
	const { pathname } = useLocation()

	const isAdminSection = pathname.startsWith('/admin')

	const linkClass = (path) =>
		`p-3 rounded-md transition-colors ${
			pathname === path
				? 'bg-blue-500 text-white'
				: 'bg-blue-300 hover:bg-blue-500'
		}`

	return (
			<div className='flex justify-between w-full p-10'>
				<h1 className='text-3xl font-bold'>DecentralID</h1>
				{!isAdminSection && (
				<div className='flex space-x-5'>
					<Link to='/home/addDocument' className={linkClass('/home/addDocument')}>
						Add Verification Request
					</Link>
					<Link to='/home' className={linkClass('/home')}>
						My Requests Status
					</Link>
				</div>)
				}
			</div>
	)
}
