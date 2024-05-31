import React, { useEffect, useState } from "react";
import axios from "axios";

const VotingWindowDelete = () => {
    const [formData, setFormData] = useState({
        votingType: '',
        startDate: '',
        endDate: ''
      });

    const [activeWindow, setActiveWindow] = useState([]);
    const [votingWindowId, setVotingWindowId] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getVotingWindow = async () => {
            try {
                const token = sessionStorage.getItem('token');

                const response = await axios.get('http://localhost:8080/candidate/voting-window', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setActiveWindow(response.data);
            } catch (error) {
                console.log(error);

            }
        };
        getVotingWindow();
    }, [])

    const handleVotingWindowSelect = (e) => {
        const selectedVotingWindowId = e.target.value;
        const selectedVotingWindow = [activeWindow].find(activewindow => activewindow._id === selectedVotingWindowId);
        setFormData({
          votingType: selectedVotingWindow.votingType,
          startDate: selectedVotingWindow.startDate,
          endDate: selectedVotingWindow.endDate
        });
        setVotingWindowId(selectedVotingWindowId);
      };
    


    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const token = sessionStorage.getItem('token');
        try {
          await axios.delete(`https://voting-app-server-8cny.onrender.com/candidate/voting-window/${votingWindowId}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          // Reset form fields after successful update
          alert('Voting Window Deleted!');
          setFormData({
            votingType: '',
            startDate: '',
            endDate: ''
          });
          setVotingWindowId('');
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      };

    return (
        <div className='container border-dark card mt-3'>
      <div>
        {/* <h3 className='text-center'>Candidate Delete</h3> */}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="candidateSelect">Select Voting Window to Delete</label>
            <select 
              id="candidateSelect" 
              className="form-control" 
              onChange={handleVotingWindowSelect}
              value={votingWindowId}
            >
              <option value="" disabled>Select a voting window</option>
              {[activeWindow].map(activewindow => (
                <option key={activewindow._id} value={activewindow._id}>
                  {activewindow.votingType} - {activewindow.startDate} - {activewindow.endDate}
                </option>
              ))}
            </select>
          </div>
          <div className='mb-3 card border-primary'>
          <h5>Your Voting Window Id: {votingWindowId}</h5>
          </div>
          <div className="mb-3">
            <label htmlFor="candidateName">Voting type</label>
            <input
              type="text"
              value={formData.votingType}
              name='votingType'
              className="form-control"
              id="candidateName"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="partyName">Start Date</label>
            <input
              type="text"
              value={formData.startDate}
              name='startDate'
              className="form-control"
              id="partyName"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="partyName">End Date</label>
            <input
              type="text"
              value={formData.endDate}
              name='endDate'
              className="form-control"
              id="partyName"
            />
          </div>
        <div className='text-center my-3'>
          <button type="submit" disabled={loading} className="btn btn-primary">
            {loading ? 'Deleting...' : 'Delete'}
          </button>
        </div>
        </form>
      </div>
    </div>
  );
}

export default VotingWindowDelete;