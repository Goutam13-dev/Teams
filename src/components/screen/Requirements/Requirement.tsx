import React, { useEffect, useState }  from 'react'
import ATMTable from '../../atom/ATMTable/ATMTable';
import ATMDialog from '../../atom/ATMDialog/ATMDialog';
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
  const users = ["John Doe", "Jane Smith", "Alice Brown", "Michael Lee"];
const Requirement = () => { 
  
  const [isOpenDialog , setIsOpenDialog] = useState(false)
  const [isOpenInviteDialog , setIsOpenInviteDialog] = useState(false)
  const [isOpenShowRequiremet , setIsOpenShowRequiremet] = useState(false)
  const [serachValue , setSearchValue] = useState('')
  const [inviteUserValue , setinviteUserValue] = useState('')
  const [showError , setShowError] = useState(false)
 
  return (
 <div>
  <div style={{display:'flex' , justifyContent:'end'}}>
 <button  style={{padding:'8px' , fontSize:'14px' ,borderRadius:'10px' , fontWeight:500 ,color: 'white', 
        backgroundColor : '#6264A7', cursor:'pointer', marginBottom:'10px'
            }} onClick={()=>{setIsOpenDialog(true)}}>Add Requirement</button>
  </div>
      <ATMTable data={sampleData} handleInviteUser={()=>setIsOpenInviteDialog(true)} handleSeeRequirements={()=>setIsOpenShowRequiremet(true)} />
      {isOpenDialog && <ATMDialog onClose={()=>setIsOpenDialog(false)} title='Add Requirement'>
      <div style={{ overflowY: "auto", padding: "12px" }}>
          <label style={{ display: "block", fontWeight: "bold", marginBottom: "8px" }}>
             Requirement <span style={{ color: "red" }}>*</span>
          </label>
          <input
            type="text"
            value={serachValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Enter your Requirement"
            style={{
              width: "100%",
              padding: "8px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              
            }}
          />
          {(!serachValue && showError) ? <span style={{color:'red' , fontSize:'12px'}}>field  is  required</span> : null }
          <div style={{ display: "flex", justifyContent: "end" , gap:'10px' , marginTop:'10px', alignContent:'end'}}>
            <button
            onClick={()=>setShowError(true)}
              style={{
                padding: "8px 16px",
                backgroundColor: "#3B82F6",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Add
            </button>
            <button
              onClick={()=>setIsOpenDialog(false)}
              style={{
                padding: "8px 16px",
                backgroundColor: "#DC2626",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Cancel
            </button>
          </div>
        </div></ATMDialog>}
        {isOpenInviteDialog && <ATMDialog onClose={()=>setIsOpenInviteDialog(false)} title='Invite Users'>
      <div style={{ overflowY: "auto", padding: "12px" }}>
         
      <div style={{ flex: '1', minWidth: '45%', display: 'flex', flexDirection: 'column' }}>
          <label style={{ fontWeight: 'bold', marginBottom: '5px' }}>Select User:</label>
          <select name="userType" value={inviteUserValue} onChange={(e:any)=>{
            setinviteUserValue(e.target.value)
          }} required style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}>
            <option value="">Select a user</option>
            {users.map((user, index) => (
              <option key={index} value={user}>{user}</option>
            ))}
          </select>
        </div>
          <div style={{ display: "flex", justifyContent: "end" , gap:'10px' , marginTop:'10px', alignContent:'end'}}>
            <button
            onClick={()=>setShowError(true)}
              style={{
                padding: "8px 16px",
                backgroundColor: "#3B82F6",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Invite
            </button>
            <button
              onClick={()=>setIsOpenDialog(false)}
              style={{
                padding: "8px 16px",
                backgroundColor: "#DC2626",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Cancel
            </button>
          </div>
        </div></ATMDialog>}
        {isOpenShowRequiremet && <ATMDialog onClose={()=>setIsOpenShowRequiremet(false)} title='Requiremt Details'>
        <div style={{ overflowY: "auto", padding: "12px" }}>
  <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" , padding:'8px' }}>
    <div style={{ flex: "1", minWidth: "45%", display: "flex", gap: "5px" }}>
      <span style={{ fontWeight: 600 }}>Name:</span>
      <span>Rahul Dey</span>
    </div>
    <div style={{ flex: "1", minWidth: "45%", display: "flex", gap: "5px" }}>
      <span style={{ fontWeight: 600 }}>Mobile:</span>
      <span>7878787878</span>
    </div>
  </div>
  <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" , padding:'8px' }}>
    <div style={{ flex: "1", minWidth: "45%", display: "flex", gap: "5px" }}>
      <span style={{ fontWeight: 600 }}>Email:</span>
      <span>goutamm@gmail.com</span>
    </div>
    <div style={{ flex: "1", minWidth: "45%", display: "flex", gap: "5px" }}>
      <span style={{ fontWeight: 600 }}>Tech:</span>
      <span>React JS</span>
    </div>
  </div>
  <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", padding:'8px' }}>
    <div style={{ flex: "1", minWidth: "45%", display: "flex", gap: "5px" }}>
      <span style={{ fontWeight: 600 }}>Experience:</span>
      <span>2+ years</span>
    </div>
  </div>
</div></ATMDialog>}
 </div>
  )
}

export default Requirement