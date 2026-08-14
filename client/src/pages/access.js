import { useContext, useEffect, useState } from 'react'
import { TiTick } from 'react-icons/ti'
import { RxCrossCircled } from 'react-icons/rx'
import { useSearchParams } from 'react-router-dom'
import { TransactionContext } from "../context/TransactionContext";

export default function Access() {
	const [orgName, setOrgName] = useState('');
	const { checkIfWalletIsConnect, giveAccess, currentAccount, getVerifierName, isLoading, errorMessage } = useContext(TransactionContext);

	const [searchParams] = useSearchParams();
	const [query] = useState({
		org: searchParams.get("org"),
		callback: searchParams.get("callback"),
		name: searchParams.get("name")==='1',
        sex: searchParams.get("sex")==='1',
        dob: searchParams.get("dob")==='1',
        mobile: searchParams.get("mobile")==='1',
        email: searchParams.get("email")==='1',
        college: searchParams.get("college")==='1',
        isOver18: searchParams.get("isOver18")==='1',
        isCollegeStudent: searchParams.get("isCollegeStudent")==='1'
	})

	useEffect(() => {
		checkIfWalletIsConnect();

		if (!query.org) return;

		getVerifierName(query.org.toLowerCase()).then((name) => {
			setOrgName(name);
		}).catch(err => console.log(err));
	}, []);

	const accept = async e => {
		e.preventDefault();
		if (!query.callback) return;

		await giveAccess(
			query.org,
			query.callback,
			query.name,
			query.sex,
			query.dob,
			query.mobile,
			query.email,
			query.college,
			query.isOver18,
			query.isCollegeStudent
		);

		const url = new URL(query.callback);
		url.searchParams.set("status", "200");
		url.searchParams.set("user", currentAccount);
		window.location.replace(url.href);
	};

	const reject = e => {
		e.preventDefault();
		if (!query.callback) return;

		const url = new URL(query.callback);
		url.searchParams.set("status", "401");
		window.location.replace(url.href);
	};

	return (
		<div className='flex flex-col items-center justify-center w-full h-full'>
			<div className='h-[80%] w-[30%] flex flex-col justify-center items-center bg-gray-100 rounded-md'>
				<h1 className='text-3xl font-bold m-7'>Approval request</h1>
				<h3 className='m-3 text-2xl font-semibold'>Request from: {orgName}</h3>

				<div className='flex flex-col justify-start my-10 space-y-5 text-center w-60'>
					<h1 className='underline'>Request For:</h1>
					{query.name && <h3>Name</h3>}
					{query.sex && <h3>Sex</h3>}
					{query.dob && <h3>Date of Birth</h3>}
					{query.mobile && <h3>Mobile</h3>}
					{query.email && <h3>Email</h3>}
					{query.college && <h3>College</h3>}
					{query.isOver18 && <h3>Is Over 18?</h3>}
					{query.isCollegeStudent && <h3>Is College Student?</h3>}
				</div>

				<div className='flex space-x-5'>
					<button
						className='flex items-center p-2 bg-red-300 rounded hover:bg-red-400 transition-colors disabled:opacity-60'
						onClick={reject}
						disabled={isLoading}
					>
						<RxCrossCircled className='mr-2' />
						Reject
					</button>
					<button
						className='flex items-center p-2 rounded bg-lime-300 hover:bg-lime-400 transition-colors disabled:opacity-60'
						onClick={accept}
						disabled={isLoading}
					>
						<TiTick className='mr-2' /> {isLoading ? "Approving..." : "Approve"}
					</button>
				</div>
				{errorMessage && <p className='mt-4 text-red-600 text-center'>{errorMessage}</p>}
			</div>
		</div>
	)
}
