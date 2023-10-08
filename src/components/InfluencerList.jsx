import React, { useState, useEffect } from 'react';
import '../styles/influencerslist.css'
import axios from 'axios';
import { toast } from 'react-toastify';

function InfluencerList() {
  const [influencers, setInfluencers] = useState([]);

  useEffect(() => {
    // Fetch influencer data from the API endpoint
    axios.get('https://teal-fluffy-hen.cyclic.app/api/influencers/list')
      .then((response) => {
        setInfluencers(response.data);
      })
      .catch((error) => {
        console.error('Error fetching influencers:', error);
      });
  }, []);
  const handleDelete = (influencerId) => {
    // Send a DELETE request to your backend to delete the influencer
    axios.delete(`https://teal-fluffy-hen.cyclic.app/api/influencers/delete/${influencerId}`)
      .then(() => {
        // Remove the deleted influencer from the state
        setInfluencers((prevInfluencers) => prevInfluencers.filter((influencer) => influencer._id !== influencerId));
        toast.success('Influencer deleted successfully');
      })
      .catch((error) => {
        console.error('Error deleting influencer:', error);
        toast.error('An error occurred while deleting the influencer. Please try again.');
      });
  };

  return (
    <div>
    <div className="banner text-center p-4 mb-3">
    <h5>Influencers List</h5>
    </div>
      <div className='container all-influencers'>
    <div className="row">
    {influencers.map((influencer) => (
     <div className="col-12 col-md-6 col-lg-4">
             <div className='influencer' key={influencer._id}>
                <div className="name">
                <h5 className='text-white'> <i class="bi bi-person-fill"></i> {influencer.name}</h5>
                </div>
                
                    <div className="info p-3">
                       
                       {/* <hr /> */}
                       <p className='text-secondary'><i class="bi bi-envelope-arrow-up-fill mx-1"></i>  {influencer.email}</p>
                       <small className=''>Coupon code</small> <br />
                     <div className="coupon-code mt-2">
                     <p><i>{influencer.couponCode}</i></p>
                     <i class="bi bi-copy"></i>
                     </div>
                       {/* <hr /> */}
                       <div className="btns mt-4">
                        <div className="send">
                        <i class="bi bi-envelope-arrow-up-fill mx-1"></i> Mail
                        </div>
                        <div className="delete"  onClick={() => handleDelete(influencer._id)}>
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

export default InfluencerList;
