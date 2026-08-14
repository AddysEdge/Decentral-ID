import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "../components/nav";
import { TransactionContext } from "../context/TransactionContext";

const Verifier = () => {
	const { currentAccount, isAdmin, verifierVReqList, loadVerifierList } = useContext(TransactionContext);
	const navigate = useNavigate();

	useEffect(() => {
		loadVerifierList();
	}, []);

	useEffect(() => {
		if (currentAccount !== "" && isAdmin !== undefined && !isAdmin) {
			navigate('/home')
		}
	}, [currentAccount, isAdmin]);

	return (
		<div className='items-center justify-center w-full h-full overflow-x-hidden'>
			<Nav />
			<div className='flex flex-col items-center w-full h-full'>

				<h1 className="pb-10 text-4xl">Verification Panel</h1>
				<table className='w-2/4 rounded-lg border-2 border-gray'>
					<thead className='bg-cyan-500'>
						<tr>
							<th
								scope='col'
								className='text-sm font-medium text-white px-6 py-4 text-left'
							>
								Id
							</th>
							<th
								scope='col'
								className='text-sm font-medium text-white px-6 py-4 text-left'
							>
								Address
							</th>
							<th
								scope='col'
								className='text-sm font-medium text-white px-6 py-4 text-left'
							>
								Verified
							</th>
							<td className='text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap'>
							</td>
						</tr>
					</thead>
					<tbody>
						{verifierVReqList.map(({ user, status }, index) => (
							<tr className='bg-gray-100 border-b' key={index}>
								<td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
									{index + 1}
								</td>
								<td className='text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap'>
									{user}
								</td>
								<td className='text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap'>
									{status === 0 && "PROCESSING"}
									{status === 1 && "ACCEPTED"}
									{status === -1 && "REJECTED"}
								</td>
								<td className='text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap'>
									{status === 0 && (
										<button
											onClick={() => navigate(`/admin/${index + 1}`)}
											className='p-3 bg-blue-300 rounded-md hover:bg-blue-500'
										>
											View
										</button>
									)}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	)
}

export default Verifier
