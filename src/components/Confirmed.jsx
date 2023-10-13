import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Loadingmodal from './Loadingmodal';
import '../styles/users.css'
import * as XLSX from 'xlsx';

function Confirmed() {
  const [ConfirmedUsers, setConfirmedUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch user data from the API endpoint
    axios
      .get('https://emerald-sockeye-tux.cyclic.app/api/confirm/all')
      .then((response) => {
        setConfirmedUsers(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
        setLoading(false);
        // Handle the error here, e.g., toast.error('Failed to fetch users');
      });
  }, []);

  function downloadExcel(data) {
    // Create a worksheet from your data
    const ws = XLSX.utils.json_to_sheet(data);
  
    // Create a workbook with the worksheet
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  
    // Generate a data URL for the Excel file
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const dataURL = URL.createObjectURL(blob);
  
    // Create a download link and trigger a click event to download the file
    const a = document.createElement('a');
    a.href = dataURL;
    a.download = 'users.xlsx';
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
  
  const handleDelete = (userId) => {
    // Send a DELETE request to your backend to delete the user
    axios
      .delete(`https://emerald-sockeye-tux.cyclic.app/api/confirm/delete/${userId}`)
      .then(() => {
        // Remove the deleted user from the state
        setConfirmedUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
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
        <h5>Confirmed Users List</h5>
      </div>
      <div className="download text-center mb-3">
      <button className='btn bg-success text-white p-3' onClick={() => downloadExcel(ConfirmedUsers)}><i class="bi bi-file-earmark-arrow-down-fill"></i> Download Excel</button>
      </div>
      <div className="container all-users">
        <div className="row">
          {ConfirmedUsers.map((user) => (
            <div className="col-12 col-md-6 col-lg-4" key={user._id}>
              <div className="user">
                <div className="p-2 bg-success">
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
                        <div className="delete"  onClick={() => handleDelete(user._id)}>
                        <i class="bi bi-trash3-fill mx-1"></i>  delete
                        </div>
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

export default Confirmed;
