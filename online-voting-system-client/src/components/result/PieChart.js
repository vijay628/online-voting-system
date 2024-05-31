import React, { useRef, useEffect, useState } from 'react';
import Chart from 'chart.js/auto';
import axios from 'axios';

function PieChart() {
  const chartRef = useRef(null);
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/candidate/vote/count');
        setChartData(response.data);
      } catch (error) {
        console.error('Error fetching voting count:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (chartRef.current && chartData) {
      // Destroy existing chart instance if it exists
      if (chartRef.current.chartInstance) {
        chartRef.current.chartInstance.destroy();
      }

        // Generate random background colors for each bar
        const backgroundColors = Array.from({ length: chartData.length }, () => {
          const r = Math.floor(Math.random() * 256);
          const g = Math.floor(Math.random() * 256);
          const b = Math.floor(Math.random() * 256);
          return `rgba(${r}, ${g}, ${b}, 0.2)`;
        });

      // Calculate total votes
      const totalVotes = chartData.reduce((sum, item) => sum + item.count, 0);

      // Calculate percentages and generate labels
      const labels = chartData.map(item => `${item.party} (${((item.count / totalVotes) * 100).toFixed(2)}%)`);
      const data = chartData.map(item => item.count);

      // Create new chart instance
      const ctx = chartRef.current.getContext('2d');
      const newChart = new Chart(ctx, {
        type: 'pie',
        data: {
          labels: labels,
          datasets: [{
            label: 'Vote Percentage',
            data: data,
            backgroundColor: backgroundColors,
            borderColor:backgroundColors.map(color => color.replace('0.2', '1')),
            borderWidth: 1
          }]
        },
        options: {
          // scales: {
          //   y: {
          //     beginAtZero: true
          //   }
          // }
        }
      });

      // Save the chart instance to the ref
      chartRef.current.chartInstance = newChart;
    }
  }, [chartData]);

  return (
    <div className='container text-center card' style={{height:'25rem'}}>
      {chartData && (
        <canvas ref={chartRef}></canvas>
      )}
    </div>
  );
}

export default PieChart;
