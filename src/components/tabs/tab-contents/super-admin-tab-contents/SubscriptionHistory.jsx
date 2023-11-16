import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Modal, { useModal } from '../../../modals/MODAL_CARROT_SUITE/Modal'
import Loading from '../../../Loading'
import useFetch from '../../../../hooks/useFetch'
import { Api } from '../../../../axios'
import { toast } from 'react-toastify'
import Table from '../../../tables/Table'
import { formatDate } from '../../../../utils/formatDate'

const SubscriptionHistory = () => {
  const { loading, companyListPlans, isLoading, plan, startDate, endDate, setEndDate, selectedPlan, setStartDate, setSelectedPlan, setPeriod, handleSubscribe } = useSubscriptionHistory()
  const { isModalClosed, closeModal, openModal } = useModal()

  if (loading || isLoading) {
    return <Loading />;
  }

  return (
    <><div>
      <div className="flex justify-between items-center p-2 bg-gray-200 rounded-md mb-2">
        <p className='text-xl font-bold'>Subscription History</p>
        <button onClick={openModal} className="bg-lightblue  text-white font-bold py-3 px-5 rounded-md cursor-pointer">
          Subscribe To a Plan
        </button>
      </div>
    </div>

      {/* //?? =========== TABLE  =========== */}
      <Table data={companyListPlans} headings={[
        'current_life_plan',
        'expiring_date',
        'next_renewer_date',
        'period',
        'plan',
        'start_date',
        'plan',
        'interval_remaining',
      ]}
        fieldsKeys={[
          'current_life_plan',
          'expiring_date',
          'next_renewer_date',
          'period',
          'plan',
          'start_date',
          'plan',
          'interval_remaining',
        ]}
      />

      {/* //!! ========== MODAL ===========  */}
      <Modal isModalClosed={isModalClosed} closeModal={closeModal}>
        <div className='w-screen max-w-lg h-full bg-white rounded-md p-6'>
          <h2 className='text-xl font-bold p-2 mb-5'>Subscribe this company to a plan</h2>
          <div className='flex flex-col gap-3 mb-5'>
            <label htmlFor="" className='font-semibold'>Start Date</label>
            <input value={startDate} onChange={(e) => setStartDate(e.target.value)} type="datetime-local" className='border rounded p-2' />
          </div>
          <div className='flex flex-col gap-3 mb-5'>
            <label htmlFor="" className='font-semibold'>End Date</label>
            <input value={endDate} onChange={(e) => setEndDate(e.target.value)} type="datetime-local" className='border rounded p-2' />
          </div>
          <div className='flex flex-col gap-3 mb-5'>
            <label htmlFor="" className='font-semibold'>Select Plan</label>
            <select value={selectedPlan} onChange={(e) => setSelectedPlan(e.target.value)} className='border rounded p-2'>
              <option hidden value="">Select Plan</option>
              {plan?.map((plan, idx) => {
                return <option key={idx} value={plan.id}>{plan.plan_name}</option>
              })}
            </select>
          </div>
          <div className='flex flex-col gap-3 mb-5'>
            <label htmlFor="" className='font-semibold'>Period</label>
            <select onChange={(e) => setPeriod(e.target.value)} className='border rounded p-2' name="" id="">
              <option hidden value="">Select Period</option>
              <option value="month">Month</option>
              <option value="year">Year</option>
            </select>
          </div>
          <button onClick={() => { handleSubscribe(), closeModal() }} className='bg-lightblue  text-white font-bold py-3 px-5 rounded-md'>Subscribe</button>
        </div>
      </Modal>
    </>
  )
}

export default SubscriptionHistory



const useSubscriptionHistory = () => {
  const param = useParams().companyId
  const [selectedPlan, setSelectedPlan] = useState("")
  const [period, setPeriod] = useState()
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [plan, setPlans] = useState()
  const [isLoading, setIsLoading] = useState(false)
  const { loading, data } = useFetch("admin/plans", []);

  useEffect(() => {
    setPlans(data?.data);
  }, [loading]);

  // ?? ====== SUBMIT SUBSCRIBE COMPANY TO A NEW PLAN MODAL ====== ?? //
  const handleSubscribe = () => {
    setIsLoading(true)
    Api.put(`/admin/companies/${param}/plans`, {
      "start_date": startDate,
      "end_date": endDate,
      "plan": selectedPlan,
      "period": period
    }).then(res => {
      setIsLoading(false)
      toast.success("Subscription Successful");
    }).catch(err => {
      setIsLoading(false)
      toast.error(err || "Unable to Subscribe, Subscription Failed");
    })
  }


  // !!! ================ ..... SHOW ALL LIST OF COMPANIES PREVIOS SUBSCRIBPTION .....==============//
  const getCompanyPlans = useFetch(`/admin/company-plan-log/${param}`, []).data?.subscriptionPlanLogs
  const [companyListPlans, setCompanyListPlans] = useState([])

  useEffect(() => {
    console.log(getCompanyPlans, "");
    const companyList = getCompanyPlans?.map(plan => {
      return {
        current_life_plan: plan.current_life_plan,
        expiring_date: formatDate(plan.expiring_date),
        next_renewer_date: formatDate(plan.next_renewer_date),
        period: plan.period,
        plan: plan.plan,
        start_date: formatDate(plan.start_date),
        interval_remaining: plan.interval_remaining,
      }
    })

    setCompanyListPlans(companyList);
  }, [getCompanyPlans])

  return { plan, loading, companyListPlans, isLoading, selectedPlan, endDate, setEndDate, startDate, setStartDate, setSelectedPlan, setPeriod, handleSubscribe }
}