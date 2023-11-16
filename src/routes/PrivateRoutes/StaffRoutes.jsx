import { Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "../../pages/staff/Dashboard";
import Profile from "../../pages/staff/Profile";
import Layout from "../../components/layouts/staff-layout/Layout";
import VisitorLog from "../../pages/staff/VisitorLog";
import Directory from "../../pages/staff/Directory";
import Blacklist from "../../pages/staff/Blacklist";
import BlacklistImport from "../../pages/staff/BlacklistImport";
import StaffImport from "../../pages/staff/StaffImport";
import Staff from "../../pages/staff/Staff";
import Invitees from "../../pages/staff/Invitees";
import NotFound from "../../pages/NotFound";
import StaffDetails from "../../pages/staff/StaffDetails";
import VisitorDetails from "../../pages/staff/VisitorDetails";
import CheckInFields from "../../pages/staff/settings/CheckInFields";
import Location from "../../pages/staff/settings/Location";
import VisitorEBadge from "../../components/visitor-e-badge/VisitorEBadge";
import InviteDetails from "../../pages/staff/InviteDetails";
import Messaging from "../../pages/staff/Messaging";
import ListEvents from "../../pages/staff/ListEvents";
import Notification from "../../pages/staff/settings/Notifications";
import VisitorEBadgeQR from "../../components/visitor-e-badge/VisitorEBadgeQR";
import Billing from "../../pages/staff/Billing";
import BillingDetails from "../../pages/staff/BillingDetails";
import Integrations from "../../pages/staff/Integrations";
import Roles from "../../pages/staff/settings/Roles";
import ConfigureWelcomeMessage from "../../pages/staff/ConfigureWelcomeMessage";
import ListAttendees from "../../pages/staff/ListAttendees";
import WelcomeScreen from "../../pages/staff/settings/welcome-screen/WelcomeScreen";
import Mobile from "../../pages/staff/settings/Mobile";
import SignInFlow from "../../pages/staff/settings/SignInFlow";
import ExhibitionMode from "../../pages/staff/settings/ExhibitionMode";
import GeneralSettings from "../../pages/staff/settings/GeneralSettings";
import MessageTemplates from "../../pages/staff/settings/MessageTemplates";
import InviteeHistory from "../../pages/staff/InviteeHistory";
import Contact from "../../pages/staff/settings/contact/Contact";
import CheckoutPage from "../../pages/staff/settings/plan/Checkout";
import Trial from "../../pages/staff/settings/trial/Trial";
import Downgrade from "../../pages/staff/Downgrade";
import Expiry from "../../components/expiry/Expiry";
import EventDetails from "../../pages/staff/EventDetails";
import EventEdit from "../../pages/staff/EventEdit";
import EventSummary from "../../components/tabs/tab-contents/visitor-tab-contents/EventSummary";
import SetVisitType from "../../pages/staff/SetVisitType";
import AllNotifications from "../../components/AllNotifications";
import InviteeDetails from "../../pages/staff/InviteeDetails";
import VisitorAdd from "../../pages/staff/VisitorAdd";
import VisitorCustomQuestion from "../../pages/staff/VisitorCustomQuestion";
import VisitorImport from "../../pages/staff/VisitorImport";
import ApiKey from "../../pages/staff/settings/ApiKey";
import VisitorCheckInCode from "../../pages/staff/VisitorCheckInCode";
import Configuration from "../../pages/staff/settings/Configuration";
import EventAnalysis from "../../pages/staff/EventAnalysis";

const StaffRoutes = () => {
    return (
        <Layout>
            {/* <Expiry /> */}

            <Routes>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route
                    path="/"
                    element={<Navigate replace to="/dashboard" />}
                />
                <Route
                    path="/login"
                    element={<Navigate replace to="/dashboard" />}
                />
                <Route
                    path="/signup"
                    element={<Navigate replace to="/dashboard" />}
                />

                <Route path="/blacklist" element={<Blacklist />} />
                <Route
                    path="/import-blacklist-csv"
                    element={<BlacklistImport />}
                />
                <Route path="/directory" element={<Directory />} />
                <Route path="/set-visit-type/:id" element={<SetVisitType />} />
                <Route path="/import-visitor-csv" element={<VisitorImport />} />
                <Route path="/visitor-log" element={<VisitorLog />} />
                <Route
                    path="/visitor-log/add-visitor-checkin"
                    element={<VisitorAdd />}
                />
                <Route
                    path="/visitor-checkin-code"
                    element={<VisitorCheckInCode />}
                />
                <Route
                    path="/visitor-add-visitor-checkin/:pov"
                    element={<VisitorCustomQuestion />}
                />
                <Route
                    path="/visitor-log/:visitorId"
                    element={<VisitorDetails />}
                />
                <Route
                    path="/visitor-ebadge-qr"
                    element={<VisitorEBadgeQR />}
                />
                <Route
                    path="/visitor-ebadge/:visitorId"
                    element={<VisitorEBadge />}
                />
                <Route path="/purpose-of-visits" element={<Messaging />} />
                <Route
                    path="/invitee-log/:inviteeId"
                    element={<InviteeDetails />}
                />

                <Route
                    path="/event/:eventid/:attendeeid"
                    element={<EventSummary />}
                />
                <Route
                    path="/event-details/:eventId"
                    element={<EventDetails />}
                />
                <Route
                    path="/edit-event-details/:eventId"
                    element={<EventEdit />}
                />
                <Route
                    path="/view-event-analysis/:eventId"
                    element={<EventAnalysis />}
                />
                <Route
                    path="/invitee-history/:invitee"
                    element={<InviteeHistory />}
                />
                <Route path="/invitees/:inviteId" element={<InviteDetails />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/staff" element={<Staff />} />
                <Route path="/import-staff-csv" element={<StaffImport />} />
                <Route path="/staff/:staffId" element={<StaffDetails />} />
                <Route path="/invitees" element={<Invitees />} />
                <Route
                    path="/settings/check-in-fields"
                    element={<CheckInFields />}
                />
                <Route path="/settings/location" element={<Location />} />
                <Route path="/settings/roles" element={<Roles />} />
                <Route path="/settings/configurations" element={<Configuration />} />
                <Route path="/settings/api-key" element={<ApiKey />} />
                <Route path="/settings/notifications" element={<Notification />} />
                <Route
                    path="/settings/welcome-screen"
                    element={<WelcomeScreen />}
                />
                <Route path="/settings/mobile" element={<Mobile />} />
                <Route path="/settings/sign-in-flow" element={<SignInFlow />} />
                <Route
                    path="/settings/exhibition-mode"
                    element={<ExhibitionMode />}
                />
                <Route
                    path="/settings/general-settings"
                    element={<GeneralSettings />}
                />
                <Route
                    path="/settings/message-templates"
                    element={<MessageTemplates />}
                />
                <Route
                    path="/configure-welcome-message"
                    element={<ConfigureWelcomeMessage />}
                />

                <Route path="/events/attendees" element={<ListAttendees />} />
                <Route path="/events/list-events" element={<ListEvents />} />
                {/* <Route path="/notification" element={<Notification />} /> */}
                <Route path="/notification" element={<AllNotifications />} />

                <Route path="/billing" element={<Billing />} />
                <Route path="/billing/:id" element={<BillingDetails />} />
                <Route path="/billing/downgrade" element={<Downgrade />} />
                <Route path="/contact" element={<Contact />} />
                <Route
                    path="/checkoutpage/:plan/:method/:id"
                    element={<CheckoutPage />}
                />
                <Route path="/trial" element={<Trial />} />
                <Route path="/integrations" element={<Integrations />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Layout>
    );
};

export default StaffRoutes;
