import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Loadingmodal from './Loadingmodal';
import '../styles/users.css'

function Users() {
  const [users, setUsers] = useState([]);
  const [ConfirmedUser, setConfirmedUser] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch user data from the API endpoint
    axios
      .get('https://emerald-sockeye-tux.cyclic.app/api/users/list')
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

  const confirm = (c_name, c_email, c_mobile, c_coupon, id) => {
    setLoading(true);
    const confirmedUser = {
      name: c_name,
      email: c_email,
      mobile: c_mobile,
      coupon: c_coupon,
    };

    try {
      axios
        .post('https://emerald-sockeye-tux.cyclic.app/api/confirm/add', confirmedUser)
        .then((response) => {
          setLoading(false);
          toast.success('You Confirmed This User');
          handleDelete(id);
        })
        .catch((error) => {
          setLoading(false);
          toast.error('Error confirming the user');
          console.error(error);
        });
    } catch (error) {
      setLoading(false);
      toast.error('An error occurred while confirming the user');
      console.error('Error:', error);
    }
  };

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
                        confirm(user.name, user.email, user.mobile, user.coupon, user._id)
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
