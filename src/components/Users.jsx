import React, { useState, useEffect } from 'react';
import '../styles/influencerslist.css'
import axios from 'axios';
import { toast } from 'react-toastify';
import Loadingmodal from './Loadingmodal';

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch influencer data from the API endpoint
    axios.get('https://teal-fluffy-hen.cyclic.app/api/users/list')
      .then((response) => {
        setUsers(response.data);
        setLoading(false)
      })
      .catch((error) => {
        console.error('Error fetching influencers:', error);
        setLoading(true)
      });
  }, []);
  const handleDelete = (userId) => {
    // Send a DELETE request to your backend to delete the influencer
    axios.delete(`https://teal-fluffy-hen.cyclic.app/api/influencers/delete/${userId}`)
      .then(() => {
        // Remove the deleted influencer from the state
        setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
        toast.success('Influencer deleted successfully');
      })
      .catch((error) => {
        console.error('Error deleting influencer:', error);
        toast.error('An error occurred while deleting the influencer. Please try again.');
      });
  };

  return (
    <div>
                {
            loading?<Loadingmodal/> : null
        }
    <div className="banner text-center p-4 mb-3">
    <h5>Users List</h5>
    </div>
      <div className='container all-influencers'>
    <div className="row">
    {users.map((user) => (
     <div className="col-12 col-md-6 col-lg-4">
             <div className='influencer' key={user._id}>
                <div className="p-2 bg-success">
                <h5 className='text-white'> <i class="bi bi-person-fill"></i> {user.name}</h5>
                </div>
                
                    <div className="info p-3">
                       
                       {/* <hr /> */}
                       <p className='text-secondary'><i class="bi bi-envelope-arrow-up-fill mx-1"></i>  {user.email}</p>
                       <p className='text-success'><i class="bi bi-telephone-fill mx-1"></i>  {user.mobile}</p>
                       <small className='text-success'>Coupon code</small> <br />
                     <div className="coupon-code mt-2">
                     <p><i>{user.coupon}</i></p>
                     <i class="bi bi-copy"></i>
                     </div>
                       {/* <hr /> */}
                       <div className="btns mt-4">
                        <div className="send">
                        <i class="bi bi-envelope-arrow-up-fill mx-1"></i> Mail
                        </div>
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

export default Users;
