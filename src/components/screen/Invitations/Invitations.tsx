import React, { useEffect, useState } from "react";
import ATMDialog from "../../atom/ATMDialog/ATMDialog";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useCreateInvitationFormMutation, useGetInvitationsQuery } from "../../redux/service/zivahireServices";
import { Spinner, Toast, Toaster, ToastTitle, useToastController } from "@fluentui/react-components";
import ATMBackdrop from "../../atom/ATMBackdrop/ATMBackdrop";
import * as Yup from "yup";
import * as microsoftTeams from "@microsoft/teams-js";
import { Form, Formik, ErrorMessage } from "formik";
import { format } from "date-fns";

interface FormValues {
  sawMachineAccess: boolean;
  jobRole: string;
  managers: string;
  groupName: string;
  location: string;
  positions: string;
  task: string;
  skillset: string;
  level: string;
  team: string;
  project: string;
  vendorName: string;
  startDate: string;
  notes: string;
  canadaOk: boolean;
  timezoneOk: boolean;
  status: string;
}
const Invitations = () => {
  const [isOpenFormDialog, setIsOpenFormDialog] = useState(false);
  const [invitationsData, setInvitationsData] = useState([]);
  const [selectedInvitationId, setSelectedInvitationId] = useState('')
  const [token , setToken] = useState('')
  const [graphtoken , setgraphToken] = useState('')
  const [errorMessage , seterrorMessage] = useState('')
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
  const validationSchema = Yup.object({
    sawMachineAccess: Yup.boolean(),
    jobRole: Yup.string().required("Job Role is required"),
    managers: Yup.string(),
    groupName: Yup.string(),
    location: Yup.string().required("Location/Remote is required"),
    positions: Yup.number().required("No of Positions is required"),
    task: Yup.string() ,
    skillset: Yup.string(),
    level: Yup.string(),
    team: Yup.string(),
    project: Yup.string(),
    vendorName: Yup.string(),
    startDate: Yup.date(),
    notes: Yup.string(),
    canadaOk: Yup.boolean(),
    timezoneOk: Yup.boolean(),
    status: Yup.string(),
  });

  const initialValues: FormValues = {
    sawMachineAccess: false,
    jobRole: "",
    managers: "",
    groupName: "",
    location: "",
    positions: "",
    task: "",
    skillset: "",
    level: "",
    team: "",
    project: "",
    vendorName: "",
    startDate: "",
    notes: "",
    canadaOk: false,
    timezoneOk: false,
    status: "Open",
  }


  const handleSubmit = async (values: any) => {
    const formattedValue = {
      requirement: selectedInvitationId,
      submitted_by:useId, 
      saw_machine_access: values?.sawMachineAccess,
      job_role: values?.jobRole,
      managers_to_work_with: values?.managers,
      group_name: values?.groupName,
      location_remote: values?.location,
      no_of_positions: values?.positions,
      task: values?.task,
      required_skillset: values?.skillset,
      level: values?.level,
      notes: values?.notes,
      canada_ok: values?.canadaOk,
      et_mt_ct_timezone_ok: values?.timezoneOk,
      team: values?.team,
      project: values?.project,
      vendor_name: values?.vendorName,
      start_date: format(new Date(values.startDate), "yyyy-MM-dd"),
      status: values?.status
    }
    try {
      await addRequirements(formattedValue).unwrap();
      setIsOpenFormDialog(false)
      notify()
    } catch (error) {
      console.error('Failed to save the post:', error);
    }
  };


  const { data, isFetching, isLoading } = useGetInvitationsQuery(useId, { skip: !useId });

  useEffect(() => {
    searchUsers()
    if (!isFetching && !isLoading) {
      setInvitationsData(data?.data)
    }
  }, [data, isFetching, isLoading])

  const getClientSideToken = async () => {
    try {
      return await microsoftTeams.authentication.getAuthToken();
    } catch (error) {
      console.error("Error getting client-side token:", error);
      return null;
    }
  };

  const getOboToken = async (accessToken: string | null) => {
      if (!accessToken) {
        console.error("No access token received");
        return null;
      }
   
      try {
        const response = await fetch("https://api.upswap.cloud/api/get/obo-token/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ idToken: accessToken }),
        });
   
        const data = await response.json();
        localStorage.setItem("graphToken", data.accessToken);
        seterrorMessage(data.error)
        return data.accessToken;
      } catch (error) {
        console.error("Error fetching OBO token:", error);
        return null;
      }
    };

  const searchUsers = async () => {
    const accessToken = await getClientSideToken();
    const graphToken = await getOboToken(accessToken) ;
    setgraphToken(graphToken || '')
    setToken(accessToken || '')
    const url = `https://graph.microsoft.com/v1.0/users/?$filter=startswith(displayName, '${encodeURIComponent('rahul')}')`;

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${graphToken}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      return data.results; // List of users
    } catch (error) {
      console.error("Error searching users:", error);
      return [];
    }
  };

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
      <div style={{fontSize:'14px'}}> Error : {errorMessage}</div>
      <div style={{fontSize:'14px'}}> GraphToken : {graphtoken}</div>
      <div style={{fontSize:'14px'}}> AccessToken  : {token}</div>

        {(isLoading || isFetching) ? <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '300px' }}><Spinner size="huge" /></div> :
          invitationsData?.length ?
          <div>
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
          </table>
          </div> : <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '250px', fontSize: '24px', fontWeight: 600 }}>No Invitations Found</div>}
      </div>
      {isOpenFormDialog && <ATMDialog size='large' title='Invitation Details' onClose={() => setIsOpenFormDialog(false)}>
        <Formik<FormValues>
          enableReinitialize
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, values, setFieldValue }) => (
            <Form
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
              <div style={{ marginBottom: "15px" }}>
                <label style={{ display: "flex", alignItems: "center", gap: "5px", fontWeight: "bold" }}>
                  <input
                    type="checkbox"
                    name="sawMachineAccess"
                    checked={values.sawMachineAccess}
                    onChange={(e) => setFieldValue("sawMachineAccess", e.target.checked)}
                  />
                  SAW Machine Access
                </label>
              </div>

              {[
                ["jobRole", "managers"],
                ["groupName", "location"],
                ["positions", "task"],
                ["skillset", "level"],
                ["team", "project"],
                ["vendorName", "startDate"],
              ].map(([name1, name2]) => (
                <div key={name1} style={{ display: "flex", gap: "20px", marginBottom: '8px' }}>
                  {[name1, name2].map((name) => (
                    <div key={name} style={{ flex: "1" }}>
                      <label style={{ fontWeight: "bold", display: "block", marginBottom: "5px" }}>
                        {name.replace(/([A-Z])/g, " $1").trim()}
                      </label>
                      <input
                        placeholder={`Enter ${name}`}
                        type={name === "positions" ? "number" : name === "startDate" ? "date" : "text"}
                        name={name}
                        value={
                          typeof values[name as keyof FormValues] === "boolean"
                            ? ""
                            : (values[name as keyof FormValues] as string | number)
                        }
                        onChange={(e) => setFieldValue(name as keyof FormValues, e.target.value)}
                        style={{ width: "100%", padding: "8px", border: "1px solid #ccc", borderRadius: "4px" }}
                      />
                      <ErrorMessage name={name}>
                        {(msg) => <div style={{ color: "red", fontSize: "12px" }}>{msg}</div>}
                      </ErrorMessage>
                    </div>
                  ))}
                </div>
              ))}

              <div style={{ marginBottom: '15px' }}>
                <label style={{ fontWeight: "bold", display: "block", marginBottom: "5px" }}>Notes</label>
                <textarea
                  name="notes"
                  rows={3}
                  value={values.notes}
                  onChange={(e) => setFieldValue("notes", e.target.value)}
                  style={{ width: "100%", padding: "8px", border: "1px solid #ccc", borderRadius: "4px", resize: "none" }}
                />
                <ErrorMessage name="notes">
                  {(msg) => <div style={{ color: "red", fontSize: "12px" }}>{msg}</div>}
                </ErrorMessage>
              </div>

              <div style={{ display: "flex", gap: "20px", marginBottom: '15px' }}>
                <label style={{ display: "flex", alignItems: "center", gap: "5px", fontWeight: "bold" }}>
                  <input
                    type="checkbox"
                    name="canadaOk"
                    checked={values.canadaOk}
                    onChange={(e) => setFieldValue("canadaOk", e.target.checked)}
                  />
                  Canada OK?
                </label>
                <label style={{ display: "flex", alignItems: "center", gap: "5px", fontWeight: "bold" }}>
                  <input
                    type="checkbox"
                    name="timezoneOk"
                    checked={values.timezoneOk}
                    onChange={(e) => setFieldValue("timezoneOk", e.target.checked)}
                  />
                  ET/MT/CT Timezone OK?
                </label>
              </div>

              <div style={{ marginBottom: '15px' }}>
                <label style={{ fontWeight: "bold", display: "block", marginBottom: "5px" }}>Status</label>
                <select
                  name="status"
                  value={values.status}
                  onChange={(e) => setFieldValue("status", e.target.value)}
                  style={{ width: "100%", padding: "8px", border: "1px solid #ccc", borderRadius: "4px" }}
                >
                  <option value="Open">Open</option>
                  <option value="Closed">Closed</option>
                  <option value="Pending">Pending</option>
                </select>
                <ErrorMessage name="status">
                  {(msg) => <div style={{ color: "red", fontSize: "12px" }}>{msg}</div>}
                </ErrorMessage>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
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
            </Form>
          )}
        </Formik>
      </ATMDialog>}
    </div>
  )
}

export default Invitations