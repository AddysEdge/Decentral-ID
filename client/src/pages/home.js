import { useContext, useEffect } from 'react'
import { TransactionContext } from '../context/TransactionContext'
import { useNavigate } from 'react-router-dom'
import Nav from '../components/nav'

const statusLabel = (status) => {
	if (status === 0) return { text: 'PROCESSING', className: 'text-yellow-600' }
	if (status === 1) return { text: 'ACCEPTED', className: 'text-green-600' }
	return { text: 'REJECTED', className: 'text-red-600' }
}

const Home = () => {
	const { currentAccount, loadUserList, userVReqList, isAdmin } = useContext(TransactionContext)
	const navigate = useNavigate()

	useEffect(() => {
		loadUserList();
	}, [])

	useEffect(() => {
		if (currentAccount !== undefined && currentAccount !== "" && isAdmin !== undefined) {
			if (isAdmin)
				navigate('/admin')
		}
	}, [currentAccount, isAdmin]);

	return (
		<div className='w-full h-full overflow-x-hidden'>
			<Nav />

			<div className='flex flex-col items-center w-full h-full'>
				<h1 className='text-3xl font-bold m-7'>My Request Status</h1>

				{userVReqList.length === 0 ? (
					<p className='text-gray-500'>You haven't submitted any verification requests yet.</p>
				) : (
					<table className='w-2/4 rounded-lg border-2 border-gray'>
						<thead className='bg-blue-300'>
							<tr>
								<th scope='col' className='text-sm font-medium px-6 py-4 text-left'>
									Id
								</th>
								<th scope='col' className='text-sm font-medium px-6 py-4 text-left'>
									Verifier
								</th>
								<th scope='col' className='text-sm font-medium px-6 py-4 text-left'>
									Status
								</th>
							</tr>
						</thead>

						<tbody>
							{userVReqList.map(({ verifier, status }, index) => {
								const { text, className } = statusLabel(status)
								return (
									<tr className='bg-gray-100 border-b' key={index}>
										<td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
											{index}
										</td>
										<td className='text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap'>
											{verifier}
										</td>
										<td className={`text-sm font-medium px-6 py-4 whitespace-nowrap ${className}`}>
											{text}
										</td>
									</tr>
								)
							})}
						</tbody>
					</table>
				)}
			</div>
		</div>
	)
}

export default Home
