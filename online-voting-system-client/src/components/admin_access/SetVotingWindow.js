import React, { useState } from 'react';
import axios from 'axios';

const SetVotingWindow = () => {
    const [formData, setFormData] = useState({
        votingType: '',
        startDate: '',
        endDate: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        setError('')
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        if(formData.endDate < formData.startDate){
            setError('End date should be greater than start date');
            setLoading(false);
            return;
        }
        if(!formData.votingType && !formData.startDate && !formData.endDate){
            setError('Please fill all the fields');
            setLoading(false);
            return;
        }
        const token = sessionStorage.getItem('token');
        try {
          await axios.post('http://localhost:8080/candidate/voting-window',formData, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          alert('Voting Window Set Successfully.');
          // Reset form fields after successful update
          setFormData({
            votingType: '',
            startDate: '',
            endDate: ''
          });
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      };
    return (
        <div className='container border-dark card mt-3'>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="votingType">Set Voting Type</label>
                    <input
                        type="text"
                        onChange={handleChange}
                        value={formData.votingType}
                        name='votingType'
                        className="form-control"
                        id="votingType"
                        placeholder='Enter your voting type'
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="startDate">Start Date</label>
                    <input
                        type="datetime-local"
                        onChange={handleChange}
                        value={formData.startDate}
                        name='startDate'
                        className="form-control"
                        id="startDate"
                        placeholder='choose start date'
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="endDate">End Date</label>
                    <input
                        type="datetime-local"
                        onChange={handleChange}
                        value={formData.endDate}
                        name='endDate'
                        className="form-control"
                        id="endDate"
                        placeholder='choose end date'
                        required
                    />
                </div>
                {error && <p className='text-danger'>{error}</p>}
                <div className='text-center my-3'>
                    <button type="submit" disabled={loading} className="btn btn-primary">
                        {loading ? 'Setting...' : 'Set Time'}
                    </button>
                </div>
            </form>
        </div>
    )
}
export default SetVotingWindow;