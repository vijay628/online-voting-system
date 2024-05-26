import axios from 'axios';
import React, { useState, useEffect } from 'react';

const CandidateUpdate = () => {
  const [formData, setFormData] = useState({
    name: '',
    party: '',
    age: ''
  });

  const [candidateId, setCandidateId] = useState('');
  const [candidateList, setCandidateList] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleCandidateSelect = (e) => {
    const selectedCandidateId = e.target.value;
    const selectedCandidate = candidateList.find(candidate => candidate.id === selectedCandidateId);
    setFormData({
      name: selectedCandidate.name,
      party: selectedCandidate.party,
      age: selectedCandidate.age
    });
    setCandidateId(selectedCandidateId);
  };

  useEffect(() => {
    const fetchCandidateList = async () => {
      try {
        const response = await axios.get('https://voting-app-server-8cny.onrender.com/candidate/candidateList');
        setCandidateList(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCandidateList();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const token = sessionStorage.getItem('token');
    try {
      const response = await axios.put(`https://voting-app-server-8cny.onrender.com/candidate/${candidateId}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log(response.data);
      // Reset form fields after successful update
      setFormData({
        name: '',
        party: '',
        age: ''
      });
      setCandidateId('');
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='container border-dark card mt-3'>
      <div>
        {/* <h3 className='text-center'>Update Details Carefully</h3> */}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="candidateSelect">Select Candidate</label>
            <select 
              id="candidateSelect" 
              className="form-control" 
              onChange={handleCandidateSelect}
              value={candidateId}
            >
              <option value="" disabled>Select a candidate</option>
              {candidateList.map(candidate => (
                <option key={candidate.id} value={candidate.id}>
                  {candidate.name} - {candidate.party}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="candidateName">Candidate Name</label>
            <input
              type="text"
              onChange={handleChange}
              value={formData.name}
              name='name'
              className="form-control"
              id="candidateName"
              placeholder="Enter Candidate Name"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="partyName">Party Name</label>
            <input
              type="text"
              onChange={handleChange}
              value={formData.party}
              name='party'
              className="form-control"
              id="partyName"
              placeholder="Enter Party Name"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="candidateAge">Candidate Age</label>
            <input
              type="number"
              onChange={handleChange}
              value={formData.age}
              name='age'
              className="form-control"
              id="candidateAge"
              placeholder="Enter Candidate Age"
            />
          </div>
          <div className='mb-3 card border-primary'>
          <h5>Your candidate Id: {candidateId}</h5>
          </div>
          <div className='text-center my-3'>
          <button type="submit" disabled={loading} className="btn btn-primary">
            {loading ? 'Updating...' : 'Update'}
          </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CandidateUpdate;
