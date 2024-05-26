import React, { useRef, useEffect, useState } from 'react';
import Chart from 'chart.js/auto';
import axios from 'axios';

function BarChart() {
  const chartRef = useRef(null);
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://voting-app-server-8cny.onrender.com/candidate/vote/count');
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

      // Create new chart instance
      const ctx = chartRef.current.getContext('2d');
      const newChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: chartData.map(item => item.party), // Use party names as labels
          datasets: [{
            label: 'Vote Counts',
            data: chartData.map(item => item.count), // Use vote counts as data
            backgroundColor: backgroundColors,
            borderColor: backgroundColors.map(color => color.replace('0.2', '1')),
            borderWidth: 1,
            barThickness: 30
          }]
        },
        options: {
          maintainAspectRatio: false, // Allow the chart to adjust its size
          aspectRatio: 1,
          indexAxis: 'y', 
        }
      });

      // Save the chart instance to the ref
      chartRef.current.chartInstance = newChart;
    }
  }, [chartData]);

  return (
    <div className='container card' style={{height:'25rem'}}>
      {chartData && (
        <canvas ref={chartRef}></canvas>
      )}
    </div>
  );
}

export default BarChart;
