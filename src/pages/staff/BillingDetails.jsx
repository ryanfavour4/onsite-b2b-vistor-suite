import React from 'react'
import { useParams } from 'react-router-dom'
import Loading from '../../components/Loading'
import useFetch from '../../hooks/useFetch'

const BillingDetails = () => {
    const {id} = useParams()

    const {data, loading, error} = useFetch(`subscriptions/selected-plan/${id}`, [])

  return (
    <div className='text-center'>

        {
            loading ?
            <Loading />
            :
            <div>
                <div className="p-4 mt-4">

                  <h1 className="font-semibold text-lg my-1 text-blue">{data.data.plan_name}</h1>
                  <p>
                    {data.data.monthly_billing}$ per month
                  </p>
                  <p>
                    {data.data.yearly_billing}$ per year
                  </p>
                </div>
            </div>
        }
        
    </div>
  )
}

export default BillingDetails