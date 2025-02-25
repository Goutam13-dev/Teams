import React, { useState } from 'react'
import ATMTable from '../../atom/ATMTable/ATMTable';
import Requirement from '../Requirements/Requirement';
import Invitations from '../Invitations/Invitations';
const sampleData = [
    {
      id: 1,
      name: "req1",
      createdBy: "rahul.dey@spectralshifttech.com",
      createdAt: "7/2/2025, 4:38:16 pm",
      invitedUser: "Bitthal Ladiwal",
      submittedAt: "",
    },
    {
      id: 2,
      name: "req2",
      createdBy: "rahul.dey@spectralshifttech.com",
      createdAt: "7/2/2025, 4:38:35 pm",
      invitedUser: "Rahul Dey",
      submittedAt: "7/2/2025, 5:05:49 pm",
    },
    {
      id: 3,
      name: "req3",
      createdBy: "rahul.dey@spectralshifttech.com",
      createdAt: "7/2/2025, 4:58:04 pm",
      invitedUser: "Bitthal Ladiwal",
      submittedAt: "",
    },
    {
      id: 4,
      name: "req3",
      createdBy: "rahul.dey@spectralshifttech.com",
      createdAt: "7/2/2025, 5:24:35 pm",
      invitedUser: "",
      submittedAt: "",
    },
    {
      id: 5,
      name: "req5",
      createdBy: "rahul.dey@spectralshifttech.com",
      createdAt: "8/2/2025, 6:54:20 pm",
      invitedUser: "",
      submittedAt: "",
    },
    {
      id: 6,
      name: "req6",
      createdBy: "rahul.dey@spectralshifttech.com",
      createdAt: "14/2/2025, 11:11:46 am",
      invitedUser: "Bitthal Ladiwal",
      submittedAt: "",
    },
    {
      id: 7,
      name: "req99",
      createdBy: "rahul.dey@spectralshifttech.com",
      createdAt: "22/2/2025, 3:50:06 pm",
      invitedUser: "Rahul Dey",
      submittedAt: "22/2/2025, 3:51:50 pm",
    },
  ];
const Zivahire = () => {
    const [selectTab , setSelectedTab] = useState(0)
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
    {/* Non-Scrollable Header Section */}
    <div style={{ flexShrink: 0 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          fontSize: "20px",
          fontWeight: 600,
          marginTop: "20px",
        }}
      >
        Ziva Hire
      </div>
      <div
        style={{
          display: "flex",
          gap: "8px",
          borderBottom: "1px solid #6264A7",
          padding: "10px",
        }}
      >
        <p
          style={{
            padding: "8px",
            fontSize: "14px",
            fontWeight: 500,
            color: selectTab === 0 ? "white" : "black",
            backgroundColor: selectTab === 0 ? "#6264A7" : "white",
            borderRadius: "10px",
            cursor: "pointer",
          }}
          onClick={() => {
            setSelectedTab(0);
          }}
        >
          Requirements
        </p>
        <p
          style={{
            padding: "8px",
            fontSize: "14px",
            borderRadius: "10px",
            fontWeight: 500,
            color: selectTab === 1 ? "white" : "black",
            backgroundColor: selectTab === 1 ? "#6264A7" : "white",
            cursor: "pointer",
          }}
          onClick={() => {
            setSelectedTab(1);
          }}
        >
          Invitations
        </p>
      </div>
    </div>
  
    {/* Scrollable Content Section */}
    <div
      style={{
        flexGrow: 1,
        overflowY: "auto",
        padding: "20px",
      }}
    >
      {selectTab === 0 && <Requirement />}
      {selectTab === 1 && <Invitations />}
    </div>
  </div>
  
  )
}

export default Zivahire