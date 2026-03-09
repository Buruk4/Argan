import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./component/Navbar";
import Footer from "./component/Footer";
import RegisterBusiness from "./Pages/RegisterBusiness";
import HomePage from "./Pages/HomePage";
import AddProfilePicture from "./Pages/AddProfilePicture";
import SignupPage from "./Pages/SingupPage";
import LoginPage from "./Pages/LoginPage";
import BusinessDashboard from "./Pages/BusinessDashboard";
import ExplorePage from "./Pages/ExplorePage/ExplorePage";
import BusinessDetailPage from "./Pages/DetailBusinessPage/BusinessDetailPage";

function App() {
  return (
    <div className="min-h-full">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register-business" element={<RegisterBusiness />} />
          <Route path="/sing-up" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/upload-profile-image" element={<AddProfilePicture />} />
          <Route path="/business-dashboard" element={<BusinessDashboard />} />
          <Route path="/explore" element={<ExplorePage />} />
          <Route
            path="/business-details/:id"
            element={<BusinessDetailPage />}
          />
        </Routes>

        <Footer />
      </Router>
    </div>
  );
}

export default App;
