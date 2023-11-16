import { useParams } from "react-router-dom"
import SubscriptionHistory from "../../components/tabs/tab-contents/super-admin-tab-contents/SubscriptionHistory"
import Summary from "../../components/tabs/tab-contents/super-admin-tab-contents/Summary"
import SubCompanies from "../../components/tabs/tab-contents/super-admin-tab-contents/SubCompanies"
import AllStaffs from "../../components/tabs/tab-contents/super-admin-tab-contents/AllStaffs"
import VisitationNumbers from "../../components/tabs/tab-contents/super-admin-tab-contents/VisitationNumbers"
import Integrations from "../../components/tabs/tab-contents/super-admin-tab-contents/Integrations"
import Tabs from "../../components/tabs/Tabs"

const CompanyDetails = () => {
  const { companyId } = useParams()

  const tabTitles = ['summary', 'subscription history', 'sub companies', 'all staffs', 'visitation numbers', 'integrations']
  const tabContents = [<Summary />, <SubscriptionHistory />, <SubCompanies />, <AllStaffs />, <VisitationNumbers />, <Integrations />]

  return (
    <div className="p-2">
      <Tabs tabTitles={tabTitles} tabContents={tabContents} />
    </div>
  )
}

export default CompanyDetails