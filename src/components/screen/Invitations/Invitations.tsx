import React, { useEffect, useState } from 'react'
import ATMDialog from '../../atom/ATMDialog/ATMDialog';
import * as microsoftTeams from "@microsoft/teams-js";


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
const Invitations = () => {  
   
    const  [isOpenFormDialog , setIsOpenFormDialog] = useState(false) 
    
 
    const [formData, setFormData] = useState<any>({
      sawMachineAccess: false,
      jobRole: "",
      managers: "",
      groupName: "",
      location: "",
      positions: "",
      task: "",
      skillset: "",
      level: "",
      notes: "",
      canadaOk: false,
      timezoneOk: false,
      team: "",
      project: "",
      vendorName: "",
      startDate: "",
      status: "Open",
    });
  
    
    const handleChange = (e: any) => {
      const { name, value, type, checked } = e.target;
      setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
    };
  
    const handleSubmit = (e: any) => {
      e.preventDefault();
      console.log("Form Data:", formData);
    };
  
    useEffect(() => {
      microsoftTeams.app.initialize().then(() => {
        microsoftTeams.app.getContext().then((context) => {
          console.log(context?.user?.userPrincipalName || null);
        });
      });
    }, []);

  
return (
    <div>
              <style>{`
        .table-container {
          overflow-x: auto;
          border: 1px solid #ddd;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          padding: 16px;
        }
        .atm-table {
          width: 100%;
          border-collapse: collapse;
        }
        .atm-table th {
          background-color: #3F3D56;
          color: white;
          padding: 12px;
          text-align: left;
        }
        .atm-table td {
          padding: 12px;
          border-top: 1px solid #ddd;
        }
        .atm-table tr:hover {
          background-color: #f5f5f5;
        }
        .invite-button {
          background-color: #6264A7;
          color: white;
          padding: 6px 12px;
          border: none;
          cursor: pointer;
          border-radius: 4px;
          margin-right: 8px;
        }
        .requirement-button {
          background-color: #28a745;
          color: white;
          padding: 6px 12px;
          border: none;
          cursor: pointer;
          border-radius: 4px;
        }
        .invite-button:hover {
          background-color: #6264A7;
        }
        .requirement-button:hover {
          background-color: #218838;
        }
      `}</style>
      <div className="table-container">
        <table className="atm-table">
          <thead>
            <tr>
              {["ID", "Name", "Created By", "Created At", "Invited User", "Submitted At", "Actions"].map(
                (header) => (
                  <th key={header}>{header}</th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {sampleData.map((row :any) => (
              <tr key={row.id}>
                <td>{row.id}</td>
                <td>{row.name}</td>
                <td>{row.createdBy}</td>
                <td>{row.createdAt}</td>
                <td>{row.invitedUser || "-"}</td>
                <td>{row.submittedAt || "-"}</td>
                <td>
                  <button  onClick={()=>setIsOpenFormDialog(true)} className="invite-button">Fill Form</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isOpenFormDialog && <ATMDialog size='large' title='Invitation Details' onClose={()=>setIsOpenFormDialog(false)}>
      <form
      onSubmit={handleSubmit}
      style={{
        margin: "auto",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        maxWidth: "700px",
        backgroundColor: "#fff",
      }}
    >
      {/* Checkbox */}
      <div style={{ marginBottom: "15px" }}>
        <label style={{ display: "flex", alignItems: "center", gap: "5px"  ,  fontWeight: "bold",}}>
          <input
            type="checkbox"
            name="sawMachineAccess"
            checked={formData.sawMachineAccess}
            onChange={handleChange}
          />
          SAW Machine Access
        </label>
      </div>

      {/* Fields */}
      {[
        ["jobRole", "Job Role", "managers", "Managers to Work With"],
        ["groupName", "Group Name", "location", "Location/Remote"],
        ["positions", "No of Positions", "task", "Task"],
        ["skillset", "Required Skillset", "level", "Level"],
        ["team", "Team", "project", "Project"],
        ["vendorName", "Vendor Name", "startDate", "Start Date"],
      ].map(([name1, label1, name2, label2]) => (
        <div key={name1} style={{ display: "flex", gap: "20px", marginBottom: "15px" }}>
          <div style={{ flex: "1" }}>
            <label style={{ fontWeight: "bold", display: "block", marginBottom: "5px" }}>
              {label1}
            </label>
            <input
              type={name1 === "positions" ? "number" : name1 === "startDate" ? "date" : "text"}
              name={name1}
              value={formData[name1]}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "8px",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
            />
          </div>
          <div style={{ flex: "1" }}>
            <label style={{ fontWeight: "bold", display: "block", marginBottom: "5px" }}>
              {label2}
            </label>
            <input
              type={name2 === "positions" ? "number" : name2 === "startDate" ? "date" : "text"}
              name={name2}
              value={formData[name2]}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "8px",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
            />
          </div>
        </div>
      ))}

      {/* Notes Field */}
      <div style={{ marginBottom: "15px" }}>
        <label style={{ fontWeight: "bold", display: "block", marginBottom: "5px" , }}>
          Notes
        </label>
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          rows={3}
          style={{
            width: "100%",
            padding: "8px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            resize: "none",
          }}
        />
      </div>

      {/* Checkboxes */}
      <div style={{ display: "flex", gap: "20px", marginBottom: "15px" }}>
        <label style={{ display: "flex", alignItems: "center", gap: "5px" , fontWeight: "bold", }}>
          <input
            type="checkbox"
            name="canadaOk"
            checked={formData.canadaOk}
            onChange={handleChange}
          />
          Canada OK?
        </label>
        <label style={{ display: "flex", alignItems: "center", gap: "5px" , fontWeight: "bold", }}>
          <input
            type="checkbox"
            name="timezoneOk"
            checked={formData.timezoneOk}
            onChange={handleChange}
          />
          ET/MT/CT Timezone OK?
        </label>
      </div>

      {/* Status Dropdown */}
      <div style={{ marginBottom: "15px" }}>
        <label style={{ fontWeight: "bold", display: "block", marginBottom: "5px" }}>
          Status
        </label>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          style={{
            width: "100%",
            padding: "8px",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        >
          <option value="Open">Open</option>
          <option value="Closed">Closed</option>
          <option value="Pending">Pending</option>
        </select>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        style={{
          width: "100%",
          padding: "10px",
          backgroundColor: "#3B82F6",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Submit
      </button>
    </form>
      </ATMDialog>}
    </div>
  )
}

export default Invitations