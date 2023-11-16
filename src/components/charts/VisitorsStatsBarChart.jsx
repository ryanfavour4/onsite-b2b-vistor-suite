import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';

const VisitorsStatsBarChart = ({ title, chartData }) => {
  return (
    <div className="bg-white text-dark shadow-xl flex-1 border-solid border-[1px] border-lightestblue rounded-md capitalize my-4 lg:max-w-[49%] h-max" >
      <h5 className="bg-lightest font-semibold p-3 rounded-t-md border-solid border-b-[1px] border-lightestblue">
        {title}
      </h5>
      <div className='h-100 text-center flex p-2 w-full'>
        <Bar
          data={chartData}
          className='w-max h-full'
        />
      </div>
    </div>
  )
}

export default VisitorsStatsBarChart