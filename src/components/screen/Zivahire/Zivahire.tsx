import React, { useEffect, useState, useContext } from 'react'
import Requirement from '../Requirements/Requirement';
import Invitations from '../Invitations/Invitations';
import { TeamsFxContext } from "../../Context";
import { useData } from "@microsoft/teamsfx-react";
import { useDispatch } from 'react-redux';
import { setUserId, setUserName } from '../../redux/slice/zivahireSlice';

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
    dispatch(setUserName(userData?.displayName))

  }, [userData])

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
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
          JivaHire
        </div>
        <div
          style={{
            display: "flex",
            gap: "8px",
            borderBottom: "1px solid #6264A7",
            padding: "10px 10px 0px 20px",
          }}
        >
          <p
            style={{
              padding: "8px",
              fontSize: "14px",
              fontWeight: 500,
              color:  selectTab === 0 ? "#6264A7" : "black",
              cursor: "pointer",
              borderBottom : selectTab === 0 ? '3px solid #6264A7' :'none',
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
              fontWeight: 500,
              color:  selectTab === 1 ? "#6264A7" : "black",
              cursor: "pointer",
              borderBottom : selectTab === 1 ? '3px solid #6264A7' :'none',
            }}
            onClick={() => {
              setSelectedTab(1);
            }}
          >
            Invitations
          </p>
        </div>
      </div>

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