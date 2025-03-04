import React from 'react'
import { format } from 'date-fns';

  // Define the type for the table data
interface TableRowData {
    id: number;
    name: string;
    created_at: string;
    invited_users: any;
    submittedAt: string;
  }
  
  // Define the props for the table component
  interface TableComponentProps {
    data: TableRowData[];
    handleInviteUser:()=>void;
    handleSeeRequirements:()=>void;
    setSelectedRequirementId:any;
  }

const ATMTable : React.FC<TableComponentProps> = ({ data , handleSeeRequirements, handleInviteUser, setSelectedRequirementId }) => {
  return (
    <>
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
          margin-bottom :5px
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
          background-color: #5a54e0;
        }
        .requirement-button:hover {
          background-color: #218838;
        }
      `}</style>
      {data?.length ? <div className="table-container">
        <table className="atm-table">
          <thead>
            <tr>
              {["ID", "Name", "Created At", "Invited User", "Submitted At", "Actions"].map(
                (header) => (
                  <th key={header}>{header}</th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr key={row.id}>
                <td>{row.id}</td>
                <td>{row.name}</td>
                <td>{format(new Date(row.created_at), "dd MMM yyyy hh:mm:ss a")}</td>
                <td>{row.invited_users?.length ? row?.invited_users.map((el:any)=>el) : "-"}</td>
                <td>{row.submittedAt || "-"}</td>
                <td >
                  <button onClick={()=>{handleInviteUser() , setSelectedRequirementId(row.id)}} className="invite-button">Invite User</button>
                  <button onClick={()=>{handleSeeRequirements() , setSelectedRequirementId(row.id)}} className="requirement-button">See Requirement</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div> : <div style={{display:'flex' , justifyContent:'center', alignItems:'end' , height:'250px' , fontSize:'24px' , fontWeight:600}}>No requirement Found</div> }
    </>
  )
}

export default ATMTable