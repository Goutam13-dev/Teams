import React, { useEffect, useState } from "react";
import ATMDialog from "../../atom/ATMDialog/ATMDialog";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useCreateInvitationFormMutation, useGetInvitationsQuery, useGetRequirementByIdQuery, useUpdateInviteRequirementsMutation } from "../../redux/service/zivahireServices";
import { Spinner, Toast, Toaster, ToastTitle, useToastController } from "@fluentui/react-components";
import ATMBackdrop from "../../atom/ATMBackdrop/ATMBackdrop";
import * as Yup from "yup";
import { Form, Formik, ErrorMessage } from "formik";
import { format } from "date-fns";
import { Edit12Regular } from '@fluentui/react-icons';
import {Tooltip } from "@fluentui/react-components";


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
  const [invitationnRequirement, setInvitationRequirement] = useState<any>({})
  const [wantToEdit , setWantToEdit] = useState(false)

  const [addRequirements, addDataIsLoading] = useCreateInvitationFormMutation()
  const [updateRequirements, updateDataIsLoading] =useUpdateInviteRequirementsMutation()
  const position = "top";
  const { dispatchToast } = useToastController('1234589');
  const notify = () =>
    dispatchToast(
      <Toast>
        <ToastTitle>Requirement added  successfully.</ToastTitle>
      </Toast>,
      { position, intent: "success" }
    );

  const { useId , userName } = useSelector((state: RootState) => state.counter);

  const { data, isFetching, isLoading } = useGetInvitationsQuery(useId, { skip: !useId });
  const {data:InvitationRequirementData , isFetching:InvitationRequirementDataIsFetching , isLoading :InvitationRequirementDataIsLoading}=useGetRequirementByIdQuery(selectedInvitationId , {skip:!selectedInvitationId})
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
    sawMachineAccess: invitationnRequirement?.submitted_by_name || false,
    jobRole: invitationnRequirement?.job_role || "",
    managers: invitationnRequirement?.managers_to_work_with || "",
    groupName: invitationnRequirement?.group_name || "",
    location: invitationnRequirement?.location_remote || "",
    positions: invitationnRequirement?.no_of_positions || "",
    task: invitationnRequirement?.task || "",
    skillset: invitationnRequirement?.required_skillset || "",
    level: invitationnRequirement?.level || "",
    team: invitationnRequirement?.team || "",
    project: invitationnRequirement?.project || "",
    vendorName: invitationnRequirement?.vendor_name || "",
    startDate: invitationnRequirement?.start_date || "",
    notes: invitationnRequirement?.notes || "",
    canadaOk:invitationnRequirement?.canada_ok  || false,
    timezoneOk:invitationnRequirement?.et_mt_ct_timezone_ok  || false,
    status:invitationnRequirement?.status  || "Open",
  }


  const handleSubmit = async (values: any) => {
    const formattedValue = {
      requirement: selectedInvitationId,
      submitted_by : [{ [useId]: userName }],
      submitted_by_name:userName,
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
      start_date:values.startDate ?  format(new Date(values.startDate), "yyyy-MM-dd") :null,
      status: values?.status
    }
    if(InvitationRequirementData?.present){
      try {
        await  updateRequirements(formattedValue).unwrap();
        setIsOpenFormDialog(false)
        notify()
      } catch (error) {
        console.error('Failed to save the post:', error);
      }
    }else{
      try {
        await addRequirements(formattedValue).unwrap();
        setIsOpenFormDialog(false)
        notify()
      } catch (error) {
        console.error('Failed to save the post:', error);
      }
    }
  };

  useEffect(()=>{
    if (!isFetching && !isLoading) {
      setInvitationsData(data?.data)
    }
  }, [data, isFetching, isLoading])

  useEffect(()=>{
    if (!InvitationRequirementDataIsLoading && !InvitationRequirementDataIsFetching) {
      setInvitationRequirement(InvitationRequirementData?.data?.[0])
      setWantToEdit(InvitationRequirementData?.present)
    }
  }, [InvitationRequirementDataIsFetching, InvitationRequirementData, InvitationRequirementDataIsLoading])

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
        .atm-table tr:nth-child(odd) {
            background-color:#F8F9FA;}
        .atm-table tr:nth-child(even) {
             background-color: white;}
        .atm-table th {
          background-color: #6264A7;
          color: white;
          font-size: 14px;
          font-weight: 500;
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
          invitationsData?.length ?
          <div>
             <table className="atm-table">
            <thead>
              <tr>
                {["Serial No.", "Name", "Created By", "Created At", "Actions"].map(
                  (header) => (
                    <th key={header}>{header}</th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {invitationsData.map((row: any , index:number) => (
                <tr key={row.id}>
                  <td>{index+1}</td>
                  <td>{row.name}</td>
                  <td>{row.created_by_name}</td>
                  <td>{format(new Date(row.created_at), "dd MMM yyyy hh:mm a")}</td>
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
        <div>
         {InvitationRequirementData?.present &&  <div onClick={()=>setWantToEdit(!wantToEdit)} style={{display:'flex' , justifyContent:'end', cursor:'pointer'}}>
            <Tooltip content="Edit" relationship="label" >
            <Edit12Regular style={{width:'20px' , height:'30px' , color: !wantToEdit?  '#6264A7':'red'}}/>
             </Tooltip>
          </div>}
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
              
              {(InvitationRequirementDataIsLoading || InvitationRequirementDataIsLoading  ) && <ATMBackdrop />}
              <div style={{ marginBottom: "15px" }}>
                <label style={{ display: "flex", alignItems: "center", gap: "5px", fontWeight: "bold" }}>
                  <input
                  disabled={wantToEdit}
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
                       disabled={wantToEdit}
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
                 disabled={wantToEdit}
                placeholder="Write note..."
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
                   disabled={wantToEdit}
                    type="checkbox"
                    name="canadaOk"
                    checked={values.canadaOk}
                    onChange={(e) => setFieldValue("canadaOk", e.target.checked)}
                  />
                  Canada OK?
                </label>
                <label style={{ display: "flex", alignItems: "center", gap: "5px", fontWeight: "bold" }}>
                  <input
                   disabled={wantToEdit}
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
                 disabled={wantToEdit}
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
                {(addDataIsLoading?.isLoading || updateDataIsLoading?.isLoading) ? <Spinner size='tiny'/> :'Submit'}
              </button>
            </Form>
          )}
        </Formik>
        </div>
      </ATMDialog>}
    </div>
  )
}

export default Invitations