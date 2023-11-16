import { Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "../../pages/super-admin/Dashboard";
import Layout from "../../components/layouts/super-admin-layout/Layout";
import NotFound from "../../pages/NotFound";
import Companies from "../../pages/super-admin/Companies";
import Subscriptons from "../../pages/super-admin/Subscriptons";
import CompanyDetails from "../../pages/super-admin/CompanyDetails";
import VisitorEBadge from "../../components/visitor-e-badge/VisitorEBadge";
import Profile from "../../pages/super-admin/Profile";
import Plans from "../../pages/super-admin/Plans";

const SuperAdminRoutes = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />

        <Route path="/" element={<Navigate replace to="/dashboard" />} />
        <Route path="/login" element={<Navigate replace to="/dashboard" />} />
        <Route path="/signup" element={<Navigate replace to="/dashboard" />} />
        <Route path="/companies" element={<Companies />} />
        <Route path="/companies/:companyId" element={<CompanyDetails />} />
        <Route path="/subscriptions" element={<Subscriptons />} />
        <Route path="/plans" element={<Plans />} />
        <Route path="/visitor-ebadge/:visitorId" element={<VisitorEBadge />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
};

export default SuperAdminRoutes;
