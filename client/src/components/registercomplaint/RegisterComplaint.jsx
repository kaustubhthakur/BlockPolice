import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ethers } from 'ethers';
import './RegisterComplaint.css';  // Import the CSS file
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
function RegisterComplaint() {
  const [complaint, setComplaint] = useState('');
  const [location, setLocation] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    
    if (!complaint || !location) {
      alert('Please fill in all fields');
      return;
    }
  
    try {
      if (typeof window.ethereum === 'undefined') {
        alert('Please install MetaMask');
        return;
      }
  
      setIsLoading(true);
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, contractABI, signer);
  
      const tx = await contract.register(complaint, location);
      await tx.wait(); // Wait for the transaction to be mined
  
      alert('Complaint registered successfully!');
      setComplaint('');
      setLocation('');
    } catch (error) {
      console.error('Error registering complaint:', error);  // Log the error
      alert('There was an error registering your complaint. Check the console for more details.');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="register-container">
      <h2>Register Complaint</h2>
      <form onSubmit={handleRegister} className="register-form">
        <div className="form-group">
          <label>Complaint</label>
          <textarea
            value={complaint}
            onChange={(e) => setComplaint(e.target.value)}
            placeholder="Describe your complaint"
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label>Location</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter the location"
            required
          />
        </div>
        <button type="submit" className="btn-submit" disabled={isLoading}>
          {isLoading ? 'Registering...' : 'Register Complaint'}
        </button>
        <Link to='/'>Home</Link>
      </form>
    </div>
  );
}

export default RegisterComplaint;
