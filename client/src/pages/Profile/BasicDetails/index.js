import moment from "moment";
import React, { useState } from "react";
import { useSelector } from "react-redux";

function BasicDetails() {
  const { user } = useSelector((state) => state.users);
  const [profileImage, setProfileImage] = useState(user.profileImage || "/room-interior-design.jpg");

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-details">
          <div className="profile-info">
            <span className="info-label">Name:</span>
            <span className="info-value">{user.name}</span>
          </div>
          <div className="profile-info">
            <span className="info-label">Email:</span>
            <span className="info-value">{user.email}</span>
          </div>
          <div className="profile-info">
            <span className="info-label">Phone:</span>
            <span className="info-value">{user.phone}</span>
          </div>
          <div className="profile-info">
            <span className="info-label">Role:</span>
            <span className="info-value uppercase">{user.role}</span>
          </div>
          <div className="profile-info">
            <span className="info-label">Registered On:</span>
            <span className="info-value">
              {moment(user.createdAt).format("MMM Do YYYY, h:mm a")}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BasicDetails;
