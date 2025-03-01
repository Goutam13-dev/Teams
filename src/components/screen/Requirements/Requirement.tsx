import React, { useEffect, useState } from 'react'
import ATMTable from '../../atom/ATMTable/ATMTable';
import ATMDialog from '../../atom/ATMDialog/ATMDialog';
import { useCreateRequiremmentMutation, useGetRequirementByIdQuery, useGetRequirementQuery } from '../../redux/service/zivahireServices';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import {
  Toaster,
  useToastController,
  ToastTitle,
  Toast,
  Spinner
} from "@fluentui/react-components";
import ATMBackdrop from '../../atom/ATMBackdrop/ATMBackdrop';

const users = ["John Doe", "Jane Smith", "Alice Brown", "Michael Lee"];
const Requirement = () => {
  const { useId } = useSelector((state: RootState) => state.counter);

  //Toast 
  const { dispatchToast } = useToastController('12345');
  const position = "top";
  const notify = () =>
    dispatchToast(
      <Toast>
        <ToastTitle>Requirement added  successfully.</ToastTitle>
      </Toast>,
      { position, intent: "success" }
    );

  const [addRequirements, addDataIsLoading] = useCreateRequiremmentMutation()
  const [isOpenDialog, setIsOpenDialog] = useState(false)
  const [isOpenInviteDialog, setIsOpenInviteDialog] = useState(false)
  const [isOpenShowRequiremet, setIsOpenShowRequiremet] = useState(false)
  const [serachValue, setSearchValue] = useState('')
  const [inviteUserValue, setinviteUserValue] = useState('')
  const [showError, setShowError] = useState(false)
  const [requirementsData, setRequirementsData] = useState([])
  const [selectedRequirementId, setSelectedRequirementId] = useState('')

  const handleAddRequirements = async () => {
    try {
      await addRequirements({ name: serachValue, created_by: '18fc5e1c-b1ae-463e-aa87' }).unwrap();
      setIsOpenDialog(false)
      notify()
    } catch (error) {
      console.error('Failed to save the post:', error);
    }
  };

  const { data, isFetching, isLoading } = useGetRequirementQuery(useId, { skip: !useId });
  const { data: singleRequirementData, isFetching: singleRequirementDataIsFetching, isLoading: singleRequirementDataIsLoading } = useGetRequirementByIdQuery(selectedRequirementId, { skip: !selectedRequirementId })
  useEffect(() => {
    if (!isFetching && !isLoading) {
      setRequirementsData(data?.data)
    }
  }, [data, isFetching, isLoading])

  useEffect(() => {
    if (!singleRequirementDataIsFetching && !singleRequirementDataIsLoading) {
      console.log(singleRequirementData, selectedRequirementId, "Goutam Bhaiya")
    }
  }, [data, isFetching, isLoading, selectedRequirementId, isOpenShowRequiremet])

  return (
    <div>
      <Toaster toasterId={"12345"} />
      <div style={{ display: 'flex', justifyContent: 'end' }}>
        <button style={{
          padding: '8px', fontSize: '14px', borderRadius: '10px', fontWeight: 500, color: 'white',
          backgroundColor: '#6264A7', cursor: 'pointer', marginBottom: '10px'
        }} onClick={() => { setIsOpenDialog(true) }}>Add Requirement</button>
      </div>
      {(isLoading && isFetching) ? <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'end', height: '250px' }}><Spinner size="huge" /></div>
        :
        <ATMTable data={requirementsData} handleInviteUser={() => setIsOpenInviteDialog(true)} handleSeeRequirements={() => setIsOpenShowRequiremet(true)} setSelectedRequirementId={setSelectedRequirementId} />
      }      {isOpenDialog && <ATMDialog onClose={() => setIsOpenDialog(false)} title='Add Requirement'>
        <div style={{ overflowY: "auto", padding: "12px" }}>
          {addDataIsLoading?.isLoading && <ATMBackdrop />}
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
          {(!serachValue && showError) ? <span style={{ color: 'red', fontSize: '12px' }}>field  is  required</span> : null}
          <div style={{ display: "flex", justifyContent: "end", gap: '10px', marginTop: '10px', alignContent: 'end' }}>
            <button
              disabled={addDataIsLoading?.isLoading}
              onClick={() => { handleAddRequirements(), setShowError(true) }}
              style={{
                padding: "8px 16px",
                backgroundColor: "#3B82F6",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              {addDataIsLoading?.isLoading ? 'Adding...' : 'Add'}
            </button>
            <button
              onClick={() => setIsOpenDialog(false)}
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
      {isOpenInviteDialog && <ATMDialog onClose={() => setIsOpenInviteDialog(false)} title='Invite Users'>
        <div style={{ overflowY: "auto", padding: "12px" }}>

          <div style={{ flex: '1', minWidth: '45%', display: 'flex', flexDirection: 'column' }}>
            <label style={{ fontWeight: 'bold', marginBottom: '5px' }}>Select User:</label>
            <select name="userType" value={inviteUserValue} onChange={(e: any) => {
              setinviteUserValue(e.target.value)
            }} required style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}>
              <option value="">Select a user</option>
              {users.map((user, index) => (
                <option key={index} value={user}>{user}</option>
              ))}
            </select>
          </div>
          <div style={{ display: "flex", justifyContent: "end", gap: '10px', marginTop: '10px', alignContent: 'end' }}>
            <button
              onClick={() => setShowError(true)}
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
              onClick={() => setIsOpenDialog(false)}
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
      {isOpenShowRequiremet && <ATMDialog onClose={() => setIsOpenShowRequiremet(false)} title='Requiremt Details'>
        <div style={{ overflowY: "auto", padding: "12px" }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", padding: '8px' }}>
            <div style={{ flex: "1", minWidth: "45%", display: "flex", gap: "5px" }}>
              <span style={{ fontWeight: 600 }}>Name:</span>
              <span>Rahul Dey</span>
            </div>
            <div style={{ flex: "1", minWidth: "45%", display: "flex", gap: "5px" }}>
              <span style={{ fontWeight: 600 }}>Mobile:</span>
              <span>7878787878</span>
            </div>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", padding: '8px' }}>
            <div style={{ flex: "1", minWidth: "45%", display: "flex", gap: "5px" }}>
              <span style={{ fontWeight: 600 }}>Email:</span>
              <span>goutamm@gmail.com</span>
            </div>
            <div style={{ flex: "1", minWidth: "45%", display: "flex", gap: "5px" }}>
              <span style={{ fontWeight: 600 }}>Tech:</span>
              <span>React JS</span>
            </div>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", padding: '8px' }}>
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