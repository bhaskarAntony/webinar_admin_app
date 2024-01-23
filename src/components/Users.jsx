import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Loadingmodal from './Loadingmodal';
import InfluenceEmail from '../template/influence';
import '../styles/users.css'
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import Email from '../template/email';

const URL = "https://email-api-r1kd.onrender.com"

function Users() {
  const [users, setUsers] = useState([]);
  // const [ConfirmedUser, setConfirmedUser] = useState({});
  const [loading, setLoading] = useState(true);

  // //  const [influencers, setInfluencers] = useState([]);
  //   useEffect(() => {
  //     // Fetch influencer data from the API endpoint
  //     axios.get('https://dull-trousers-deer.cyclic.app/api/users/list')
  //       .then((response) => {
  //         setInfluencers(response.data);
  //         console.log("influencers", response.data);
  //       })
  //       .catch((error) => {
  //         console.error('Error fetching influencers:', error);
  //       });
  //   }, []);

    function downloadExcel(data) {
      // Create a worksheet from your data
      const ws = XLSX.utils.json_to_sheet(data);
    
      // Create a workbook with the worksheet
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    
      // Generate a data URI for the Excel file
      const excelDataURI = XLSX.write(wb, { bookType: 'xlsx', type: 'base64' });
    
      // Convert the data URI to binary data
      const byteCharacters = atob(excelDataURI);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
    
      // Create a Blob from the binary data
      const excelBlob = new Blob([byteArray], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    
      // Use FileSaver.js to save the Blob as a file
      saveAs(excelBlob, 'users.xlsx');
    }
  useEffect(() => {
    // Fetch user data from the API endpoint
    axios
      .get('https://dull-trousers-deer.cyclic.app/api/cloud/list')
      .then((response) => {
        setUsers(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
        setLoading(false);
        // Handle the error here, e.g., toast.error('Failed to fetch users');
      });
  }, []);

 
  const firstEmail = async (c_name, c_email, c_mobile) =>{
    setLoading(true)
    try {
      let data = Email(c_name, c_email, c_mobile);
      let to = c_email;
      let sub = "Wokshop Registration details";

      let final = {
        to,
        subject: sub,
        content: data,
      };

      setLoading(true);

      await axios
        .post(`${URL}/api/send/mail`, final)
        .then((res) => {
          setLoading(false)
          alert("👍")
        
        })
        .catch((err) => toast.error(err.message));
    } catch (err) {
      console.log(err.message);
      setLoading(false)
      alert(err.message)
    }
  }
  // const confirmAll = () => {
  //   setLoading(true);

  //   // Create an array of promises for each user confirmation
  //   const confirmationPromises = users.map((user) => {
  //     return confirm(user.name, user.email, user.mobile, user.coupon, user._id);
  //   });

  //   // Use Promise.all to wait for all confirmations to complete
  //   Promise.all(confirmationPromises)
  //     .then(() => {
  //       // After all confirmations are done, clear the users' state
  //       setUsers([]);
  //       setLoading(false);
  //       toast.success('All users confirmed and cleared from the list');
  //     })
  //     .catch((error) => {
  //       setLoading(false);
  //       toast.error('Error confirming users: ' + error);
  //       console.error(error);
  //     });
  // };

  const handleDelete = (userId) => {
    // Send a DELETE request to your backend to delete the user
    axios
      .delete(`https://emerald-sockeye-tux.cyclic.app/api/users/delete/${userId}`)
      .then(() => {
        // Remove the deleted user from the state
        setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
        toast.info('User deleted successfully');
      })
      .catch((error) => {
        console.error('Error deleting user:', error);
        toast.error('An error occurred while deleting the user. Please try again.');
      });
  };
 

  return (
    <div>
      {loading ? <Loadingmodal /> : null}
      <div className="banner text-center p-4 mb-3">
        <h5>Confirmation Pending Users List</h5>
      </div>
      <div className="download text-center mb-3">
      <button className='btn bg-success text-white p-3' onClick={() => downloadExcel(users)}><i class="bi bi-file-earmark-arrow-down-fill"></i> Download Excel</button>
      </div>
      {/* <div className="confirm-all text-center mb-3">
      <button className='btn bg-primary text-white p-3' id='confirm-all' onClick={confirmAll}><i class="bi bi-file-earmark-arrow-down-fill"></i> Confirm all</button>
      </div> */}
      <div className="container all-users">
        <div className="row">
          {users.map((user) => (
            <div className="col-12 col-md-6 col-lg-4" key={user._id}>
              <div className="user">
                <div className="p-2 bg-primary">
                  <h5 className="text-white">
                    <i className="bi bi-person-fill"></i> {user.name}
                  </h5>
                </div>
                <div className="info p-3">
                  <p className="text-secondary">
                    <i className="bi bi-envelope-arrow-up-fill mx-1"></i> {user.email}
                  </p>
                  <p className="text-success">
                    <i className="bi bi-telephone-fill mx-1"></i> {user.mobile}
                  </p>
                  <small className="text-success">Coupon code</small>
                  <div className="coupon-code mt-2">
                    <p>{user.coupon}</p>
                    <i className="bi bi-copy"></i>
                  </div>
                  <div className="btns mt-4">
                    <button
                      type="button"
                      className="btn bg-primary text-white"
                      onClick={() =>
                        firstEmail(user.name, user.email, user.mobile)
                      }
                    >
                      Confirm
                    </button>
                    <button className="btn bg-danger text-white" onClick={() => handleDelete(user._id)}>
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Users;
