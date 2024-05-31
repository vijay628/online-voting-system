import React, {useState, useEffect} from 'react';
import BarChart from './BarChart';
import PieChart from './PieChart';
import axios from 'axios';

export default function VoteCounter() {
  const [loading,setLoading] = useState(false);
  const [results, setResult] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:8080/candidate/vote/count');
        setResult(response.data);
      } catch (error) {
        console.error('Error fetching voting count:', error);
      }finally{
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  

  if (loading){
    return(
      <div className='d-flex justify-content-center mt-3'>
       <div class="spinner-border text-primary" role="status">
    <span class="visually-hidden">Loading...</span>
    </div>
    </div>
    );
  } 
  return (
    <>
    <div className='container card text-center mt-3'>
      <h2>Voting Count</h2>
      <p className='text-primary'>Party at the top position is the winner..</p>
      <table className='table table-hover table-bordered border-dark'>
      <thead>
    <tr>
      <th scope="col">S.No.</th>
      <th scope="col">Party</th>
      <th scope="col">Number of votes</th>
    </tr>
  </thead>
  <tbody>
{results.map((result,index)=>(
 <tr key={index}>
 <th scope="row">{index + 1}</th>
 <td>{result.party}</td>
 <td>{result.count}</td>
</tr>
    ))}
   
    </tbody>
      </table>
</div>
    <div className='container my-3 text-center'>
      <h1>Vote Results and Vote Percentage</h1>
      <div className='container text-center'>
      <div className="row">
        <div className="col mt-3">
          <BarChart />
        </div>
        <div className="col mt-3">
          <PieChart />
        </div>
        </div>
      </div>
    </div>
    </>
  )
}
