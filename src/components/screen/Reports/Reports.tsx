import React from 'react'
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip as chartTooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, chartTooltip, Legend);

const Reports = () => {
    const chartData : any = {
        labels: ["Node", "SQL", "React", "Git", "Java" , "ROR" , 'Python'],
        datasets: [
          {
            label: "Requirement",
            data: [29, 24, 20, 15, 18, 20,25],
            backgroundColor: ["#36A2EB", "#4BC0C0", "#FF6384", "#9966FF", "#FFCE56"],
            borderRadius: 8,
          },
        ],
      };
      
      const options = {
        responsive: true,
        plugins: {
          legend: {
            position: "top" as const,
          },
          title: {
            display: true,
            text: "Requirements Reports",
          },
        },
      };

  return (
   <div style={{backgroundColor:'#EDEDED', padding:'0px'}}>
     <div style={{display:'flex', justifyContent:'center' , alignContent:'center' , position:'absolute' , top:'50%' , left:'45%' , fontSize:'30px' , fontWeight:500}}>
       Coming Soon 
     </div>
     <Bar data={chartData} options={options} />;
   </div>
  )
}

export default Reports