import React, { useState, useEffect } from "react";
import Navbar from "../../components/navbar/Navbar";
import { ethers } from "ethers";
import "./Homepage.css"; // Import the CSS file
import ComplaintModal from "../../components/complaintmodal/ComplaintModal";
const contractAddress = "0x3725dccf810180db9915abc9bcf939bb2cda1324";
const contractABI = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "complaint",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string",
        name: "location",
        type: "string",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "Id",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "resolved",
        type: "bool",
      },
      {
        indexed: false,
        internalType: "address",
        name: "user",
        type: "address",
      },
    ],
    name: "complaintRegistered",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "Id",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "resolved",
        type: "bool",
      },
      {
        indexed: false,
        internalType: "address",
        name: "user",
        type: "address",
      },
    ],
    name: "complaintResolved",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_complaint",
        type: "string",
      },
      {
        internalType: "string",
        name: "_location",
        type: "string",
      },
    ],
    name: "register",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_Id",
        type: "uint256",
      },
    ],
    name: "resolvecomplaint",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "activecomplaints",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "complaints",
    outputs: [
      {
        internalType: "string",
        name: "complaint",
        type: "string",
      },
      {
        internalType: "string",
        name: "location",
        type: "string",
      },
      {
        internalType: "bool",
        name: "resolved",
        type: "bool",
      },
      {
        internalType: "address",
        name: "user",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getAllComplaints",
    outputs: [
      {
        components: [
          {
            internalType: "string",
            name: "complaint",
            type: "string",
          },
          {
            internalType: "string",
            name: "location",
            type: "string",
          },
          {
            internalType: "bool",
            name: "resolved",
            type: "bool",
          },
          {
            internalType: "address",
            name: "user",
            type: "address",
          },
        ],
        internalType: "struct FIRRegistration.Complaint[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_Id",
        type: "uint256",
      },
    ],
    name: "getcomplaint",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalcomplaints",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];
const Homepage = () => {
  const [complaints, setComplaints] = useState([]);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch all complaints from the contract
  const fetchComplaints = async () => {
    try {
      if (!window.ethereum) {
        alert("Please install MetaMask");
        return;
      }
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        provider
      );
      const allComplaints = await contract.getAllComplaints();
      setComplaints(allComplaints);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching complaints:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="homepage-container">
        {isLoading ? (
          <p>Loading complaints...</p>
        ) : (
          <div className="complaints-list">
            {complaints.map((complaint, index) => (
              <div
                key={index}
                className="complaint-card"
                onClick={() => setSelectedComplaint(complaint)}
              >
                <h3>complaint: {complaint.complaint}</h3>
                <p>
                  <strong>Location:</strong> {complaint.location}
                </p>
                <p>
                  <strong>User ID:</strong> {index + 1}
                </p>
                <p>
                  <strong>User Address:</strong> {complaint.user}
                </p>
                <p>
                  <strong>Status:</strong>{" "}
                  {complaint.resolved ? "Resolved" : "UnResolved"}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Complaint Modal */}
        {selectedComplaint && (
          <ComplaintModal
            complaint={selectedComplaint}
            onClose={() => setSelectedComplaint(null)}
          />
        )}
      </div>
    </div>
  );
};

export default Homepage;
