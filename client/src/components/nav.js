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

	const shortAddress = currentAccount
		? `${currentAccount.slice(0, 6)}...${currentAccount.slice(-4)}`
		: ''

	return (
			<div className='flex justify-between w-full p-10'>
				<Link to='/home' className='text-3xl font-bold'>DecentralID</Link>
				<div className='flex items-center space-x-5'>
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
				{shortAddress && (
					<span className='px-3 py-2 text-sm font-medium bg-gray-100 rounded-md'>
						{shortAddress}
					</span>
				)}
				</div>
			</div>
	)
}
