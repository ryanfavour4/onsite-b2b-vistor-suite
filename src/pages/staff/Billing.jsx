import React from 'react'
import BillingHistory from '../../components/tabs/tab-contents/billing-tab-contents/BillingHistory'
import BillingPlans from '../../components/tabs/tab-contents/billing-tab-contents/BillingPlans'
import Tabs from '../../components/tabs/Tabs'
import { BillingSummary } from '../../components/tabs/tab-contents/billing-tab-contents/BillingSummary'

const Billing = () => {
  return (
    <div>
      <Tabs tabTitles={['Billing Summary', 'Billing Plan', 'Billing History']} tabContents={[
        <BillingSummary />, <BillingPlans />, <BillingHistory />
      ]} />
    </div>
  )
}

export default Billing
