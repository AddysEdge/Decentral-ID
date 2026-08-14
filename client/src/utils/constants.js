import abi from './SmartContract.json';

export const contractABI = abi.abi;
export const contractAddress = '0x440A56F75A150bAdD27565792FCfDb23b3Dd73CA';

//IPFS - set these in client/.env (see .env.example), never commit real values
export const projectId = process.env.REACT_APP_IPFS_PROJECT_ID || '';
export const projectSecretKey = process.env.REACT_APP_IPFS_PROJECT_SECRET || '';