import React, { useEffect, useState } from 'react'
import ATMTable from '../../atom/ATMTable/ATMTable';
import ATMDialog from '../../atom/ATMDialog/ATMDialog';
import { useAddInviteUsersMutation, useCreateRequiremmentMutation, useGetRequirementByIdQuery, useGetRequirementQuery } from '../../redux/service/zivahireServices';
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
import * as microsoftTeams from "@microsoft/teams-js";
import { format } from 'date-fns';
import { useSearchOrganizationUsersQuery } from '../../redux/service/usersearchService';


type User = {
  id: number;
  displayName: string;
};
const Requirement = () => {
  const { useId , userName } = useSelector((state: RootState) => state.counter);

  const [addRequirements, addDataIsLoading] = useCreateRequiremmentMutation()
  const [addInvite , addInviteInfo] = useAddInviteUsersMutation()


  const [isOpenDialog, setIsOpenDialog] = useState(false)
  const [isOpenInviteDialog, setIsOpenInviteDialog] = useState(false)
  const [isOpenShowRequiremet, setIsOpenShowRequiremet] = useState(false)
  const [serachValue, setSearchValue] = useState('')
  const [inviteUserValue, setinviteUserValue] = useState('')
  const [showError, setShowError] = useState(false)
  const [requirementsData, setRequirementsData] = useState([])
  const [selectedRequirementId, setSelectedRequirementId] = useState('')
   const [searchUserStateData  , setSearchUserStateData] = useState([])
  const [singleJobDetails, setSingleJobDetails] = useState<any>({})
  const [graphTokenState , setGraphTokenState] = useState('')
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  
  const handleAddRequirements = async () => {
    try {
      await addRequirements({ name: serachValue, created_by: useId , created_by_name : userName }).unwrap();
      setIsOpenDialog(false)
      notify('Requirement added  successfully.')
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
      setSingleJobDetails(singleRequirementData?.data?.[0])
    }
  }, [singleRequirementData, singleRequirementDataIsFetching, singleRequirementDataIsLoading, selectedRequirementId, isOpenShowRequiremet])

  useEffect(() => {
    const fetchTokens = async () => {
      try {
        const accessToken = await getClientSideToken();
        const graphToken = await getOboToken(accessToken);
        setGraphTokenState(graphToken);
      } catch (error) {
        console.error("Error fetching tokens:", error);
      }
    };
    fetchTokens();
  }, []);
 

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
          return data.accessToken;
        } catch (error) {
          console.error("Error fetching OBO token:", error);
          return null;
        }
      };
  
    
    const  {data:searchUserData , isLoading:searchUserDataIsLoading , isFetching:searchUserDataIsFetching}=useSearchOrganizationUsersQuery({graphToken:graphTokenState , query:inviteUserValue})
  
    useEffect(()=>{
 if(!searchUserDataIsLoading && !searchUserDataIsFetching ){
  setSearchUserStateData(searchUserData?.value)
 }
    },[searchUserDataIsLoading ,searchUserDataIsFetching , searchUserData])


  const { dispatchToast } = useToastController('12345');
  const position = "top";
  const notify = (message:string) =>
    dispatchToast(
      <Toast>
        <ToastTitle>{message}</ToastTitle>
      </Toast>,
      { position, intent: "success" }
    );


    const handleAddInviteUserAPI = async ()=>{
      try {
        await addInvite({ invitedUsers: [selectedUsers], requirementId: selectedRequirementId }).unwrap();
        notify('User Invited successfully.')
        setSelectedUsers([])
        setinviteUserValue('')
        setIsOpenInviteDialog(false)
      } catch (error) {
        console.error('Failed to save the post:', error);
      }
    }

    const handleSearchUsers = (e: React.ChangeEvent<HTMLInputElement>) => {
      setinviteUserValue(e.target.value);
    };
  
    const handleAddInviteUser = (user: any) => {
      if (!selectedUsers.some((u) => u.id === user.id)) {
        let newValue={
          id:user?.id,
          displayName:user?.displayName
        }
        setSelectedUsers([...selectedUsers, newValue]);
        setinviteUserValue(""); 
      }
    };
  
    const handleRemoveUser = (id: number) => {
      setSelectedUsers(selectedUsers.filter((user) => user.id !== id));
    };
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
      {isOpenInviteDialog && <ATMDialog size='largeMedium' onClose={() => setIsOpenInviteDialog(false)} title='Invite Users'>
        <div style={{ overflowY: "auto", padding: "12px"}}>

        <div style={{ flex: "1", minWidth: "45%", display: "flex", flexDirection: "column" }}>
          <div style={{display:'flex' , gap:'5px'}}>
            <span style={{fontSize:'12px' , fontWeight:500 , color:'black'}}>Note :</span>
          <span style={{fontSize:'12px' , fontWeight:500 , color:'#DD960F'}}>You can invite multiple users.</span>
          </div>
      <label style={{ fontWeight: "bold", marginBottom: "5px" }}>Search User</label>
      
      <div style={{ display: "flex", flexWrap: "wrap", gap: "5px", marginBottom: "5px" }}>
        {selectedUsers.map((user) => (
          <div key={user.id} style={{ display: "flex", alignItems: "center", background: "#3B82F6", color: "white", padding: "3px 5px", borderRadius: "15px" , fontSize:'10px' }}>
            {user.displayName}
            <span 
              onClick={() => handleRemoveUser(user.id)} 
              style={{ marginLeft: "8px", cursor: "pointer", fontWeight: "bold" }}>
              &times;
            </span>
          </div>
        ))}
      </div>

      <input
        placeholder="Enter user name"
        value={inviteUserValue}
        onChange={handleSearchUsers}
        style={{ width: "100%", padding: "8px", border: "1px solid #ccc", borderRadius: "4px" }}
      />

      {searchUserStateData?.length ? (
        searchUserStateData
          ?.filter((el:any) => el?.displayName.toLowerCase()?.includes(inviteUserValue?.toLowerCase()))
          ?.map((el :any, index) => (
            <div key={index} style={{ display: "flex", justifyContent: "space-between", margin: "10px" }}>
              <div style={{ fontSize: "14px", fontWeight: 600 }}>
                {index + 1}. {el?.displayName}
              </div>
              <button
                onClick={() => handleAddInviteUser(el)}
                disabled={selectedUsers?.some((u) =>u.id === el.id)}
                style={{
                  padding: "4px 16px",
                  backgroundColor: "#3B82F6",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontSize: "14px"
                }}
              >
                {selectedUsers?.some((u) => u.id === el.id) ? "Added" : "Invite"}
              </button>
            </div>
          ))
      ) : (
        <div style={{ display: "flex", justifyContent: "center", fontWeight: 600, fontSize: "16px", color: "red", marginTop: "50px" }}>
          User not found
        </div>
      )}
    </div>
    <div style={{display:'flex', justifyContent:'end' , alignItems:'end', marginTop:'30px', borderTop:'1px solid black' , paddingTop:'10px'}}>
    <button
                type="submit"
                onClick={()=>handleAddInviteUserAPI()}
                style={{
                  width: "18%",
                  padding: "5px",
                  backgroundColor: "#3B82F6",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                {addInviteInfo?.isLoading ?  <Spinner size='tiny'/> : 'Invite All'}
              </button>
    </div>
        </div>
        </ATMDialog>}
      {isOpenShowRequiremet && <ATMDialog size='large' onClose={() => setIsOpenShowRequiremet(false)} title='Requiremt Details'>
      <div style={{ overflowY: "auto", padding: "12px" }}>
        {(singleRequirementDataIsFetching || singleRequirementDataIsLoading) && <ATMBackdrop/>}
      {singleRequirementData?.data?.length ?  <div>
        <div style={{ flex: "1", minWidth: "45%", display: "flex", gap: "5px" , border:'1px solid gray' , padding:'8px' , borderRadius:'10px', marginBottom:'10px' }}>
          <span style={{ fontWeight: 600 }}>Submitted By:</span>
          <span>{singleJobDetails?.submitted_by}</span>
        </div>
        <div style={{ flex: "1", minWidth: "45%", display: "flex", gap: "5px" , border:'1px solid gray' , padding:'8px' , borderRadius:'10px' }}>
          <span style={{ fontWeight: 600 }}>Submitted Date:</span>
          <span>{singleJobDetails?.submitted_date ? format(new Date(singleJobDetails?.submitted_date), "dd MMM yyyy hh:mm:ss a"): '-'}</span>
        </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", paddingBottom: '8px' , paddingTop:'8px' }}>
        <div style={{ flex: "1", minWidth: "45%", display: "flex", gap: "5px",  border:'1px solid gray' , padding:'8px' , borderRadius:'10px' }}>
          <span style={{ fontWeight: 600 }}>Job Role:</span>
          <span>{singleJobDetails?.job_role}</span>
        </div>
        <div style={{ flex: "1", minWidth: "45%", display: "flex", gap: "5px",  border:'1px solid gray' , padding:'8px' , borderRadius:'10px' }}>
          <span style={{ fontWeight: 600 }}>Managers:</span>
          <span>{singleJobDetails?.managers_to_work_with}</span>
        </div>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", paddingBottom: '8px' , paddingTop:'8px' }}>
        <div style={{ flex: "1", minWidth: "45%", display: "flex", gap: "5px",  border:'1px solid gray' , padding:'8px' , borderRadius:'10px' }}>
          <span style={{ fontWeight: 600 }}>Group:</span>
          <span>{singleJobDetails?.group_name}</span>
        </div>
        <div style={{ flex: "1", minWidth: "45%", display: "flex", gap: "5px",  border:'1px solid gray' , padding:'8px' , borderRadius:'10px' }}>
          <span style={{ fontWeight: 600 }}>Location:</span>
          <span>{singleJobDetails?.location_remote}</span>
        </div>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", paddingBottom: '8px' , paddingTop:'8px' }}>
        <div style={{ flex: "1", minWidth: "45%", display: "flex", gap: "5px",  border:'1px solid gray' , padding:'8px' , borderRadius:'10px' }}>
          <span style={{ fontWeight: 600 }}>Positions:</span>
          <span>{singleJobDetails?.no_of_positions}</span>
        </div>
        <div style={{ flex: "1", minWidth: "45%", display: "flex", gap: "5px",  border:'1px solid gray' , padding:'8px' , borderRadius:'10px' }}>
          <span style={{ fontWeight: 600 }}>Task:</span>
          <span>{singleJobDetails?.task}</span>
        </div>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", paddingBottom: '8px' , paddingTop:'8px' }}>
        <div style={{ flex: "1", minWidth: "45%", display: "flex", gap: "5px",  border:'1px solid gray' , padding:'8px' , borderRadius:'10px' }}>
          <span style={{ fontWeight: 600 }}>Skills:</span>
          <span>{singleJobDetails?.required_skillset}</span>
        </div>
        <div style={{ flex: "1", minWidth: "45%", display: "flex", gap: "5px",  border:'1px solid gray' , padding:'8px' , borderRadius:'10px' }}>
          <span style={{ fontWeight: 600 }}>Level:</span>
          <span>{singleJobDetails?.level}</span>
        </div>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", paddingBottom: '8px' , paddingTop:'8px' }}>
        <div style={{ flex: "1", minWidth: "45%", display: "flex", gap: "5px",  border:'1px solid gray' , padding:'8px' , borderRadius:'10px' }}>
          <span style={{ fontWeight: 600 }}>Notes:</span>
          <span>{singleJobDetails?.notes}</span>
        </div>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", paddingBottom: '8px' , paddingTop:'8px' }}>
        <div style={{ flex: "1", minWidth: "45%", display: "flex", gap: "5px",  border:'1px solid gray' , padding:'8px' , borderRadius:'10px' }}>
          <span style={{ fontWeight: 600 }}>Team:</span>
          <span>{singleJobDetails?.team}</span>
        </div>
        <div style={{ flex: "1", minWidth: "45%", display: "flex", gap: "5px",  border:'1px solid gray' , padding:'8px' , borderRadius:'10px' }}>
          <span style={{ fontWeight: 600 }}>Project:</span>
          <span>{singleJobDetails?.project}</span>
        </div>
      </div>
      </div>: <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '250px', fontSize: '24px', fontWeight: 600 , color:'red' }}> {(!singleRequirementDataIsFetching || !singleRequirementDataIsLoading) &&'No Requirement Found'}</div> }
    </div>
        
        </ATMDialog>}
        <div>Graph : {graphTokenState}</div>
    </div>
  )
}

export default Requirement