// CandidateList.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const VerifiedMemberList = () => {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [membersPerPage] = useState(10);
  const [partySymbols, setPartySymbols] = useState([]);

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const response = await axios.get('https://voting-app-server-8cny.onrender.com/candidate/candidateList');
        setCandidates(response.data);
      } catch (error) {
        console.error('Error fetching candidate list:', error);
        setError('Failed to fetch candidate list.');
      } finally {
        setLoading(false);
      }
    };

    const fetchPartySymbols = async () => {
      try {
        const response = await axios.get('https://image-gallery-pmeq.onrender.com/api/images');
        setPartySymbols(response.data);
      } catch (error) {
        console.error('Error fetching party symbols:', error);
      }
    };

    fetchCandidates();
    fetchPartySymbols();
  }, []);


  const arrayBufferToBase64 = (buffer) => {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  };

  if (loading) return <p>Loading candidate list...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  const indexOfLastMember = currentPage * membersPerPage;
  const indexOfFirstMember = indexOfLastMember - membersPerPage;

  const currentMembers = candidates.slice(indexOfFirstMember, indexOfLastMember);
  return (
    <>
      <div className='container text-center mt-3'>
        <table className="table table-dark table-hover table-bordered border-primary">
          <thead>
            <tr>
              <th scope="col">S.No.</th>
              <th scope="col">Candidate Name</th>
              <th scope="col">Part Name</th>
              <th scope="col">Party Symbol</th>
            </tr>
          </thead>
          <tbody>
            {currentMembers.map((candidate, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{candidate.name}</td>
                <td>{candidate.party}</td>
                <td>
                {/* Render the party symbol */}
                {partySymbols.map((symbol, symbolIndex) => (
                  <React.Fragment key={symbolIndex}>
                    {symbol.name === candidate.name && symbol.desc === candidate.party && (

                      <img src={`data:${symbol.img.contentType};base64,${arrayBufferToBase64(symbol.img.data.data)}`}
                        alt={candidate.party}
                        style={{ width: '50px', height: '50px' }} />
                    )}
                  </React.Fragment>
                ))}
              </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        <nav aria-label="...">
        <ul className="pagination justify-content-center">
          <li className={`page-item ${currentPage===1?'disabled':''}`}>
            <button className="page-link"  onClick={() => setCurrentPage(currentPage - 1)}>Previous</button>
          </li>
          {[...Array(Math.ceil(candidates.length / membersPerPage)).keys()].map(page => (
            <li key={page} className={`page-item ${currentPage===page+1? 'active':''}`}>
              <button className="page-link" onClick={() => setCurrentPage(page+1)}>{page+1}</button>
            </li>
          ))}
          <li className={`page-item ${currentPage===Math.ceil(candidates.length / membersPerPage)?'disabled':''}`}>
            <button className="page-link" href="#" onClick={() => setCurrentPage(currentPage + 1)} >Next</button>
          </li>
        </ul>
      </nav>
      
      </div>
    </>
  );
};

export default VerifiedMemberList;