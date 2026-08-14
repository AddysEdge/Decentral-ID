import { useContext } from "react"
import { Link, useLocation } from "react-router-dom"
import { TransactionContext } from "../context/TransactionContext"

export default function Nav() {
	const {currentAccount,isAdmin} = useContext(TransactionContext)
	const {pathname} = useLocation()

	return (
			<div className='flex justify-between w-full p-10'>
				<h1 className='text-3xl font-bold'>DecentralID</h1>
				{pathname != '/admin' && (
				<div className='flex space-x-5'>
					<Link
						to='/home/addDocument'
						className='p-3 bg-blue-300 rounded-md hover:bg-blue-500'
					>
						Add Verification Request
					</Link>
					<Link
						to='/home'
						className='p-3 bg-blue-300 rounded-md hover:bg-blue-500'
					>
						My Requests Status
					</Link>
				</div>)
				}
			</div>
	)
}
