import React from 'react';
import BarChart from './BarChart';
import PieChart from './PieChart';

export default function VoteCounter() {
  return (
    <div className='container text-center'>
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
  )
}
