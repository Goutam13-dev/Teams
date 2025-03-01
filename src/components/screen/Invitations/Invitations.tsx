import React, { useEffect, useState } from "react";
import ATMDialog from "../../atom/ATMDialog/ATMDialog";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useCreateInvitationFormMutation, useGetInvitationsQuery } from "../../redux/service/zivahireServices";
import { Spinner, Toast, Toaster, ToastTitle, useToastController } from "@fluentui/react-components";
import ATMBackdrop from "../../atom/ATMBackdrop/ATMBackdrop";


const Invitations = () => {
  const [isOpenFormDialog, setIsOpenFormDialog] = useState(false);
  const [invitationsData, setInvitationsData] = useState([]);
  const [selectedInvitationId, setSelectedInvitationId] = useState('')
  const [addRequirements, addDataIsLoading] = useCreateInvitationFormMutation()
  const position = "top";
  const { dispatchToast } = useToastController('1234589');
  const notify = () =>
    dispatchToast(
      <Toast>
        <ToastTitle>Requirement added  successfully.</ToastTitle>
      </Toast>,
      { position, intent: "success" }
    );

  const { useId } = useSelector((state: RootState) => state.counter);

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

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    const formattedValue = {
      requirement: selectedInvitationId,
      // submitted_by:useId, 
      submitted_by: '18fc5e1c-b1ae-463e-aa87',
      saw_machine_access: formData?.sawMachineAccess,
      job_role: formData?.jobRole,
      managers_to_work_with: formData?.managers,
      group_name: formData?.groupName,
      location_remote: formData?.location,
      no_of_positions: formData?.positions,
      task: formData?.task,
      required_skillset: formData?.skillset,
      level: formData?.level,
      notes: formData?.notes,
      canada_ok: formData?.canadaOk,
      et_mt_ct_timezone_ok: formData?.timezoneOk,
      team: formData?.team,
      project: formData?.project,
      vendor_name: formData?.vendorName,
      start_date: formData?.startDate,
      status: formData?.status
    }
    try {
      await addRequirements(formattedValue).unwrap();
      setIsOpenFormDialog(false)
      notify()
      setFormData({})
    } catch (error) {
      console.error('Failed to save the post:', error);
    }
  };


  const { data, isFetching, isLoading } = useGetInvitationsQuery(useId, { skip: !useId });

  useEffect(() => {
    if (!isFetching && !isLoading) {
      setInvitationsData(data?.data)
    }
  }, [data, isFetching, isLoading])

  // const getClientSideToken = async () => {
  //   try {
  //     return await microsoftTeams.authentication.getAuthToken();
  //   } catch (error) {
  //     console.error("Error getting client-side token:", error);
  //     return null;
  //   }
  // };
 
  // const getOboToken = async (accessToken: string | null) => {
  // console.log(accessToken ,'Goutam')
  //   if (!accessToken) {
  //     console.error("No access token received");
  //     return null;
  //   }
 
  //   try {
  //     const response = await fetch("https://api.upswap.cloud/api/get/obo-token/", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ idToken: accessToken }),
  //     });
 
  //     if (!response.ok) throw new Error("Failed to fetch OBO token");
 
  //     const data = await response.json();
  //     localStorage.setItem("graphToken", data.accessToken);
  //     return data.accessToken;
  //   } catch (error) {
  //     console.error("Error fetching OBO token:", error);
  //     return null;
  //   }
  // };
 
  // const searchUsers = async () => {
  //   const teamsToken = await getClientSideToken();
  //   const graphToken = await getOboToken(teamsToken);
  //   console.log(graphToken , teamsToken , 'Goutam')
 
  //   try {
  //     const response = await fetch("https://graph.microsoft.com/v1.0/users", {
  //       method: "GET",
  //       headers: {
  //         Authorization: `Bearer ${graphToken}`,
  //         ConsistencyLevel: "eventual",
  //       },
  //     });
 
  //     const data = await response.json();
  //     console.log("Fetched Users:", data);
  //   } catch (error) {
  //     console.error("Error fetching users:", error);
  //   }
  // };
 
  return (
    <div>
      <Toaster toasterId={"1234589"} />
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
        {(isLoading || isFetching) ? <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '300px' }}><Spinner size="huge" /></div> :
          invitationsData?.length ? <table className="atm-table">
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
              {invitationsData.map((row: any) => (
                <tr key={row.id}>
                  <td>{row.id}</td>
                  <td>{row.name}</td>
                  <td>{row.created_by}</td>
                  <td>{row.created_at}</td>
                  <td>{row.invited_users?.map((el: any) => el) || "-"}</td>
                  <td>{row.submitted_at || "-"}</td>
                  <td>
                    <button onClick={() => { setSelectedInvitationId(row.id), setIsOpenFormDialog(true) }} className="invite-button">Fill Form</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table> : <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'end', height: '250px', fontSize: '24px', fontWeight: 600 }}>No Invitations Found</div>}
      </div>
      {isOpenFormDialog && <ATMDialog size='large' title='Invitation Details' onClose={() => setIsOpenFormDialog(false)}>
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
          {addDataIsLoading?.isLoading && <ATMBackdrop />}
          {/* Checkbox */}
          <div style={{ marginBottom: "15px" }}>
            <label style={{ display: "flex", alignItems: "center", gap: "5px", fontWeight: "bold", }}>
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
            <label style={{ fontWeight: "bold", display: "block", marginBottom: "5px", }}>
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
            <label style={{ display: "flex", alignItems: "center", gap: "5px", fontWeight: "bold", }}>
              <input
                type="checkbox"
                name="canadaOk"
                checked={formData.canadaOk}
                onChange={handleChange}
              />
              Canada OK?
            </label>
            <label style={{ display: "flex", alignItems: "center", gap: "5px", fontWeight: "bold", }}>
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