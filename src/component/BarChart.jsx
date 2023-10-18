import { Bar } from "react-chartjs-2";
import {Chart} from "chart.js/auto";
import { CategoryScale } from "chart.js";

Chart.register(CategoryScale);
const simpleCard = ({ chartData }) => {
  

  return (
    <div className='h-48 w-96 rounded  border-2 border-r-2 flex flex-col p-4 mt-20 max-sm:w-72'>
        <h2 style={{ fontWeight:'bold' }}>Totals and close</h2>
      <Bar data={chartData} />
      
    </div>
  )
}

export default simpleCard
