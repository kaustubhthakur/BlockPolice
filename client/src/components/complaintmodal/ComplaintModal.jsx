import React from 'react';
import './ComplaintModal.css'; // Import the modal-specific CSS

function ComplaintModal({ complaint, onClose }) {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>&times;</button>
        <h2>Complaint Details</h2>
        <p><strong>Complaint:</strong> {complaint.complaint}</p>
        <p><strong>Location:</strong> {complaint.location}</p>
        <p><strong>Status:</strong> {complaint.resolved ? "Resolved" : "Unresolved"}</p>
        <p><strong>User:</strong> {complaint.user}</p>
      </div>
    </div>
  );
}

export default ComplaintModal;
