import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useLocation,
} from "react-router-dom";
import { useEffect, useState } from "react";
import Layout from "./pages/visitorPages/Layout";
import Home from "./pages/visitorPages/Home";
import ExclusiveRoomSection from "./components/visitorComponents/ExclusiveRoomSection";
import QuestsLandingPage from "./pages/userPages/QuestsLandingPage";
import SingleAffiliatedProduct from "./pages/userPages/SingleAffiliatedProduct";

import DashbaordLayout from "./pages/userPages/DashboardLayout";
import Community from "./pages/userPages/Community";
import CommunityPostModal from "./pages/userPages/CommunityPostModal";
import Profile from "./pages/userPages/Profile";
import AffiliatedTools from "./pages/userPages/AffiliatedTools";
import Chats from "./pages/userPages/Chats";
import ChatsNewModal from "./pages/userPages/ChatsNewModal";
import QuestsDashboard from "./pages/userPages/QuestsDashboard";
import EditNewQModal from "./pages/userPages/EditNewQModal";
import QuestsApps from "./pages/userPages/QuestsApps";
import QuestMeeting from "./pages/userPages/QuestMeeting";
import QuestStatusModal from "./pages/userPages/QuestStatusModal";
import QuestBookingModal from "./components/questModals/QuestBookingModal.jsx";
import PublishNewQAppModal from "./pages/userPages/PublishNewQAppModal";
import AiPostModal from "./pages/userPages/AiPostModal";

import AboutUs from "./pages/userProfileDashboard/AboutUs";
import TermsofServices from "./pages/userProfileDashboard/TermsOfServices";
import PrivacyPolicy from "./pages/userProfileDashboard/PrivacyPolicy";
import Wallet from "./pages/userProfileDashboard/Wallet";
import MyEventsPurchasedEvents from "./pages/userProfileDashboard/MyEventsPurchasedEvents";
import Events from "./pages/userProfileDashboard/Events";
// import PaymentMethod from "./pages/userProfileDashboard/PaymentMethod";
import AccountDetails from "./pages/userProfileDashboard/AccountDetails";
import OrderPage from "./pages/userProfileDashboard/OrderPage";
import NotificationsPage from "./pages/userProfileDashboard/NotificationsPage";
import AddressPage from "./pages/userProfileDashboard/AddressPage";
import SubscriptionsPage from "./pages/userProfileDashboard/SubscriptionsPage";
import PublishEvents from "./components/userComponents/PublishEvents";
import ChoosePayMethod from "./components/visitorComponents/ChoosePayMethod";
import UpgradePlan from "././pages/userPages/UpgradeplanModal";
import PaymentSuccessfull from "./components/visitorComponents/PaymentSuccessful";
import PaymentCancel from "./components/visitorComponents/PaymentCancel";
// import { Provider } from "react-redux";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import UserCommunityPostsPage from "./pages/userPages/user-community-posts.jsx";
// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
  "pk_live_51OlUeFCEMBb05tfo4zMHI5T9Kwr39paTSkXuJHOzmPnjX1MrmvaFciiFdjsPbAKvviaDNZQsg0ktjkr67JItFv8S00tFBBIbdV"
);
// const stripePromise = loadStripe(
//   "pk_test_51OlUeFCEMBb05tfoA3MW2e4BOosyL9ybs7UIvnKYqanTva89DNzvLZbgK95Kc70uRPK9MvRF5fMBcBI415iOgt9400VhYdWYIY"
// );
// import PageNotFound from "./PageNotFound";

// import AffiliateProductRequestPage from "./pages/visitorPages/AffiliateProductRequestPage ";
// import RequestAffilateProduct from "./pages/userPages/RequestAffilateProduct";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  // const [user, setUser] = useState(() =>
  //   JSON.parse(localStorage.getItem("user"))
  // );

  return (
    <Elements stripe={stripePromise}>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/payment_success" element={<PaymentSuccessfull />} />
          <Route path="/payment_cancel" element={<PaymentCancel />} />

          {/* Vistor Pages Routers */}
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            {/* <Route path="homecontainer" element={<HomeContainer />} /> */}
            <Route path="aboutus" element={<AboutUs />} />
            <Route path="privacy-policy" element={<PrivacyPolicy />} />
            <Route path="terms-of-services" element={<TermsofServices />} />
            <Route path="exclusive" element={<ExclusiveRoomSection />} />
            <Route path="subscriptions" element={<SubscriptionsPage />} />
            <Route path="choose-pay" element={<ChoosePayMethod />} />
            <Route
              path="exclusive/subscriptions"
              element={<SubscriptionsPage />}
            />
          </Route>
          {/* User Pages Router */}
          <Route path="/dashboard" element={<DashbaordLayout />}>
            <Route index element={<QuestsLandingPage />} />
            <Route path="community" element={<Community />} />
            <Route path="community-post" element={<CommunityPostModal />} />
            <Route
              path="user-community-posts"
              element={<UserCommunityPostsPage />}
            />
            <Route path="community-ai" element={<AiPostModal />} />
            <Route path="chats" element={<Chats />} />
            <Route path="new-chat" element={<ChatsNewModal />} />
            <Route path="affiliatetools" element={<AffiliatedTools />} />
            <Route
              path="single-affiliate-product/:id"
              element={<SingleAffiliatedProduct />}
            />
            {/* User Dashboard router */}

            <Route path="quests-dashboard" element={<QuestsDashboard />} />
            <Route path="edit-quest" element={<EditNewQModal />} />
            <Route path="deploy-plugin" element={<PublishNewQAppModal />} />
            <Route path="quests-apps" element={<QuestsApps />} />
            <Route path="quests-meeting" element={<QuestMeeting />} />
            <Route path="quests-status" element={<QuestStatusModal />} />
            <Route path="quests-call-booking" element={<QuestBookingModal />} />
            <Route path="subscriptions" element={<SubscriptionsPage />} />
            <Route path="profile" element={<Profile />} />
            <Route path="account-details" element={<AccountDetails />} />
            <Route path="order-page" element={<OrderPage />} />
            <Route path="notifications-page" element={<NotificationsPage />} />
            <Route path="address-page" element={<AddressPage />} />
            <Route path="about" element={<AboutUs />} />
            <Route path="termsofservices" element={<TermsofServices />} />
            <Route path="privacypolicy" element={<PrivacyPolicy />} />
            <Route path="upgrade-plan" element={<UpgradePlan />} />
            <Route path="wallet" element={<Wallet />} />
            <Route
              path="purchased-events"
              element={<MyEventsPurchasedEvents />}
            />
            <Route path="events" element={<Events />} />
            <Route path="publishevents" element={<PublishEvents />} />
            {/* <Route path="payment-method" element={<PaymentMethod />} /> */}
            <Route path="choose-pay" element={<ChoosePayMethod />} />

            {/* <Route path="contact" element={<ContactUs />} /> */}

            {/* <Route
                        path="request-affiliation"
                        element={<RequestAffilateProduct />}
                        /> */}
          </Route>

          {/*  */}
          <Route path="/logout" element={<Navigate to="/" replace />} />
          {/*  */}

          {/* <Route path='*' element={<PageNotFound />} /> */}
        </Routes>
      </Router>
    </Elements>
  );
}

export default App;
