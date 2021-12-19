import React from 'react';
import Chart from 'chart.js/auto';
import { Bar } from 'react-chartjs-2';

function Barchart({labels, datasets}) {  
  return (
    <div>
      <Bar
        data={{ labels, datasets}}
        options={{
          title: {
            display: false
          },
          legend: {
            display: true,
            position: 'right'
          }
        }}
      />
    </div>
  )
}

export default Barchart;