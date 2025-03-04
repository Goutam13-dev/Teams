import React, { useEffect, useState, useContext } from 'react'
import Requirement from '../Requirements/Requirement';
import Invitations from '../Invitations/Invitations';
import { TeamsFxContext } from "../../Context";
import { useData } from "@microsoft/teamsfx-react";
import { useDispatch } from 'react-redux';
import { setUserId } from '../../redux/slice/zivahireSlice';

const Zivahire = () => {
  const dispatch = useDispatch()
  const [selectTab, setSelectedTab] = useState(0)
  const { teamsUserCredential } = useContext(TeamsFxContext);

  const { data: userData } = useData(async () => {
    if (teamsUserCredential) {
      return await teamsUserCredential.getUserInfo();
    }
  });
  useEffect(() => {
    localStorage.setItem('userData', JSON.stringify(userData) as any)
    dispatch(setUserId(userData?.objectId))
  }, [userData])

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