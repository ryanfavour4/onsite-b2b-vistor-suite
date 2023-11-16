import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';

const VisitorsStatsPieChart  = ({title, chartData}) => {
  return (
    <div className="bg-white text-dark drop-shadow-xl mx-2 flex-1 border-solid border-[1px] border-lightestblue rounded-md capitalize my-4">
        <h5 className="bg-lightest font-semibold p-3 rounded-t-md border-solid border-b-[1px] border-lightestblue">
            {title}
        </h5>
        <div className='h-64 text-center flex justify-center p-2'>
          <Pie
          data={chartData}
          />
        </div>
    </div>
  )
}

export default VisitorsStatsPieChart