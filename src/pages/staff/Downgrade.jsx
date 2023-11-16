import React from 'react'
import DowngradePlans from '../../components/tabs/tab-contents/billing-tab-contents/DowngradePlan'
import Tabs from '../../components/tabs/Tabs'


const Downgrade = () => {
    return (
        <div>
            <Tabs tabTitles={['Billing plans']} tabContents={[<DowngradePlans />]} />
        </div>
    )
}

export default Downgrade