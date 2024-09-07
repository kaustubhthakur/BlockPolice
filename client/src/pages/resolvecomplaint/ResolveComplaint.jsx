import React, { useState } from 'react';
import { ethers } from 'ethers';
import './Resolvecomplaint.css';
import { Link } from 'react-router-dom';

const  contractAddress="0x3725dccf810180db9915abc9bcf939bb2cda1324"
const  contractABI =[
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "string",
				"name": "complaint",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "location",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "Id",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "bool",
				"name": "resolved",
				"type": "bool"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "user",
				"type": "address"
			}
		],
		"name": "complaintRegistered",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "Id",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "bool",
				"name": "resolved",
				"type": "bool"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "user",
				"type": "address"
			}
		],
		"name": "complaintResolved",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_complaint",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_location",
				"type": "string"
			}
		],
		"name": "register",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_Id",
				"type": "uint256"
			}
		],
		"name": "resolvecomplaint",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "activecomplaints",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "complaints",
		"outputs": [
			{
				"internalType": "string",
				"name": "complaint",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "location",
				"type": "string"
			},
			{
				"internalType": "bool",
				"name": "resolved",
				"type": "bool"
			},
			{
				"internalType": "address",
				"name": "user",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getAllComplaints",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "complaint",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "location",
						"type": "string"
					},
					{
						"internalType": "bool",
						"name": "resolved",
						"type": "bool"
					},
					{
						"internalType": "address",
						"name": "user",
						"type": "address"
					}
				],
				"internalType": "struct FIRRegistration.Complaint[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_Id",
				"type": "uint256"
			}
		],
		"name": "getcomplaint",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalcomplaints",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]
function ResolveComplaint() {
    const [complaintId, setComplaintId] = useState('');
    const [complaint, setComplaint] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
  
    const resolveComplaint = async () => {
      if (!complaintId) {
        alert('Please enter a complaint ID');
        return;
      }
      setIsLoading(true);
      setError(null);
      try {
        if (!window.ethereum) {
          alert('Please install MetaMask');
          return;
        }
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, contractABI, signer);
  
        // Resolve the complaint
        const tx = await contract.resolvecomplaint(complaintId);
        await tx.wait();
        alert('Complaint resolved successfully!');
        setComplaint((prev) => ({ ...prev, resolved: true }));
      } catch (err) {
        console.error('Error resolving complaint:', err);
        setError('Failed to resolve complaint. Check console for details.');
      } finally {
        setIsLoading(false);
      }
    };
  
    return (
      <div className="resolve-complaint-container">
        <h1>Resolve Complaint</h1>
        <div className="form-group">
          <label htmlFor="complaintId">Complaint ID:</label>
          <input
            id="complaintId"
            type="number"
            value={complaintId}
            onChange={(e) => setComplaintId(e.target.value)}
          />
        </div>
        <button onClick={resolveComplaint} className="btn" disabled={isLoading}>
          {isLoading ? 'Processing...' : 'Resolve Complaint'}
        </button>
  
        {error && <p className="error-message">{error}</p>}
        <Link to='/'>Home</Link>
      </div>
    );
  }
  
  export default ResolveComplaint;
  
