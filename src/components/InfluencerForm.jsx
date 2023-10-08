import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import axios from 'axios';
import Loadingmodal from './Loadingmodal';

function InfluencerForm() {
    const [loading, setLoading] = useState(false);
  const [influencer, setInfluencer] = useState({
    name: '',
    email: '',
    couponCode: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInfluencer({ ...influencer, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(influencer)
    setLoading(true)
    try {
        axios.post('https://teal-fluffy-hen.cyclic.app/api/influencers/add', influencer)
        .then(response => {
          // Handle the response data here
        setLoading(false)
          toast.success("influencer created successfully")
          console.log(response);
        })
        .catch(error => {
          // Handle any errors here
         setLoading(false)
          toast.error(error)
          console.error(error);
        });
    } catch (error) {
      // Handle any network errors or server-side errors here
      console.error('Error:', error);
      toast.error('An error occurred while creating the influencer. Please try again.');
    }
  };

  return (
    <div>
        {
            loading?<Loadingmodal/> : null
        }
      <div className="banner text-center p-3">
      <h5>Create Influencer</h5>
      </div>
      <div className="container mt-3">
        <div className="row">
            <div className="col-12">
            <div className="card p-3">
          <form onSubmit={handleSubmit}>
          <div className="form-group mt-2">
                <label htmlFor="name" className="form-label">Influencer Name</label>
                <input type="text" name='name' onChange={handleChange} value={influencer.name} className="form-control"  placeholder='Enter Name'/>
            </div>
            <div className="form-group mt-2">
                <label htmlFor="email" className="form-label">Influencer Email</label>
                <input type="text" name='email' onChange={handleChange} value={influencer.email} className="form-control"  placeholder='Enter Email'/>
            </div>
            <div className="form-group mt-2">
                <label htmlFor="couponCode" className="form-label">Influencer Coupon Code</label>
                <input type="text" name='couponCode' onChange={handleChange} value={influencer.couponCode} className="form-control" placeholder='Enter Coupon Code' />
            </div>
            <div className="form-group mt-4">
            <button type="submit" className='btn bg-primary text-white fs-6'>Create New Influencer</button>
            </div>
          </form>
        </div>
            </div>
        </div>
      </div>
    
    </div>
  );
}

export default InfluencerForm;
