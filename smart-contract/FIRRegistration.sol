// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.17;

contract FIRRegistration {
    address public owner;
    uint256 public totalcomplaints;
    uint256 public activecomplaints;
    struct Complaint {
        string complaint;
        string location;
        bool resolved;
        address user;
    }

    constructor() {
        owner = msg.sender;
    }

    mapping(uint256 => Complaint) public complaints;
    event complaintRegistered(
        string complaint,
        string location,
        uint256 Id,
        bool resolved,
        address user
    );
    event complaintResolved(uint256 Id, bool resolved, address user);
    modifier onlyowner() {
        require(msg.sender == owner, "not owner");
        _;
    }

    function register(string memory _complaint, string memory _location)
        public
    {
        totalcomplaints++;
        activecomplaints++;
        complaints[totalcomplaints] = Complaint(
            _complaint,
            _location,
            false,
            msg.sender
        );
        emit complaintRegistered(
            _complaint,
            _location,
            totalcomplaints,
            false,
            msg.sender
        );
    }

    function getcomplaint(uint256 _Id)
        public
        view
        onlyowner
        returns (
            string memory,
            address,
            bool
        )
    {
        require(_Id >= 1, "invalid id");
        return (
            complaints[_Id].complaint,
            complaints[_Id].user,
            complaints[_Id].resolved
        );
    }

    function resolvecomplaint(uint256 _Id) public onlyowner {
        require(!complaints[_Id].resolved, "complaint already resolved");
        complaints[_Id].resolved = true;
        emit complaintResolved(_Id, true, msg.sender);
    }

    function getAllComplaints() public view returns (Complaint[] memory) {
        Complaint[] memory allComplaints = new Complaint[](totalcomplaints);
        for (uint256 i = 1; i <= totalcomplaints; i++) {
            allComplaints[i - 1] = complaints[i];
        }
        return allComplaints;
    }
}
