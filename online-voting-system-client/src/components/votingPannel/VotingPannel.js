import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './VotingPannel.css';
function VotingPannel() {
  const [votedCandidateID, setVotedCandidateID] = useState(null);
  const [candidates, setCandidates] = useState([]);
  const [partySymbols, setPartySymbols] = useState([]);
  const [loading, setLoading] = useState(false);
const [error, setError] = useState('');
  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const response = await axios.get('https://voting-app-server-8cny.onrender.com/candidate/candidateList');
        setLoading(true);
        setCandidates(response.data);
      } catch (error) {
        console.error('Error fetching candidate list:', error);
      }
    };

    const fetchPartySymbols = async () => {
      try {
        const response = await axios.get('https://image-gallery-pmeq.onrender.com/api/images');
        setPartySymbols(response.data);
      } catch (error) {
        console.error('Error fetching party symbols:', error);
      }finally{
        setLoading(false);
      }
    };

    fetchCandidates();
    fetchPartySymbols();
  }, []);

  const handleVote = async (candidateID) => {
    setLoading(true);
    try {
      await axios.post(`https://voting-app-server-8cny.onrender.com/candidate/vote/${candidateID}`, null, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('token')}`
        }
      });
      setVotedCandidateID(candidateID);
      setTimeout(
        function() {
          window.location.reload();
        },2000);
    } catch (error) {
      console.error('Error voting:', error);
      setError(error);
    }finally{
      setLoading(false);
    }
  };

if (loading){
  return(
    <div className='d-flex justify-content-center mt-3'>
     <div class="spinner-border text-primary" role="status">
  <span class="visually-hidden">Loading...</span>
  </div>
  </div>
  );
} 
  
if (error) return <p style={{ color: 'red' }}>{error.message}</p>;

  const arrayBufferToBase64 = (buffer) => {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  };

  return (
    <div className='container mt-3'>
      <table className="table table-dark table-hover table-bordered border-primary">
        <thead>
          <tr>
            <th scope="col">S.No.</th>
            <th scope="col">Candidate Name</th>
            <th scope="col">Party Name</th>
            <th scope="col">Click to Vote</th>
          </tr>
        </thead>
        <tbody>
          {candidates.map((candidate, index) => (
            <tr key={index}>
              <th scope="row">{index + 1}</th>
              <td>{candidate.name}</td>
              <td>{candidate.party}</td>
              <td>
                <div className='container mt-2'>
                  {partySymbols.map((symbol, symbolIndex) => (
                    <React.Fragment key={symbolIndex}>
                      {symbol.name === candidate.name && symbol.desc === candidate.party && (
                        <label class="switch">
                          <input
                            onClick={() => handleVote(candidate.id)}
                            type="checkbox"
                            checked={votedCandidateID === candidate.id}
                            disabled={votedCandidateID !== null}
                            style={{ backgroundColor: votedCandidateID === candidate.id ? 'green' : '' }}
                          />
                          <span class="slider"></span>

                          <img src={`data:${symbol.img.contentType};base64,${arrayBufferToBase64(symbol.img.data.data)}`}
                            alt={candidate.party}
                            className='off' />

                          <img src={`data:${symbol.img.contentType};base64,${arrayBufferToBase64(symbol.img.data.data)}`}
                            alt={candidate.party}
                            className='on' />
                        </label>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default VotingPannel;