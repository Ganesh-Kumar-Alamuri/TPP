import "./App.css";
import DashBoard from "./Components/DashBoard";
import UnderDevelopment from "./Components/UnderDevelopment";
import NavBar from "./Components/NavBar";
import Login from "./Components/Login";
import CompanyGrid from "./Components/Company/CompanyGrid";
import AddCandidate from "./Components/Candidate Profile/AddCandidate";
import AccountDashBoard from "./Components/Account/AccountDashBoard";
import AddAccount from "./Components/Account/AddAccount";
import ProfileDashBoard from "./Components/Candidate Profile/ProfileDashBoard";
import InstituteDashBoard from "./Components/Institute/InstituteDashBoard";
import CompanyDashBoard from "./Components/Company/CompanyDashBoard";
import AddCompany from "./Components/Company/AddCompany";
import EditCandidate from "./Components/Candidate Profile/EditCandidate";
import EditEmployee from "./Components/Account/EditEmployee";
import SearchProfile from "./Components/Candidate Profile/SearchProfile";
import EditEmpanelled from "./Components/Company/EditEmpanelled";
import CandidateGrid from "./Components/Candidate Profile/CandidateGrid";
import EditRole from "./Components/Company/EditRole";
import AccountGrid from "./Components/Account/AccountGrid";
import AddRole from "./Components/Company/AddRole";
import AssignCandidate from "./Components/Candidate Profile/AssignCandidate";
// import EmpanelledGrid from "./Components/Company/EmpanelledGrid";
import PotentialLeads from "./Components/Candidate Profile/PotentailLeads";
import ChangePassword from "./Components/ChangePassword";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import ProtectedRoute from "./Components/protectedRoute";
import FileInput from "./Components/BulkUpload";
import AssignCandidateGrid from "./Components/Candidate Profile/AssignCandidateGrid";
import AddExtras from "./Components/AddExtras";
import { ToastContainer } from "react-toastify";
function App() {
  const [user, setUser] = useState();
  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/Login" element={<Login setUser={setUser} />} />
          <Route
            element={
              <ProtectedRoute user={user} setUser={setUser}>
                <NavBar user={user} setUser={setUser} />
              </ProtectedRoute>
            }
          >
            <Route
              path="/ChangePassword"
              element={<ChangePassword user={user} setUser={setUser} />}
            />
            <Route
              path="/AddCandidate"
              element={<AddCandidate user={user} />}
            />
            <Route path="/CompanyGrid" element={<CompanyGrid user={user} />} />
            <Route
              path="/SearchProfile"
              element={<SearchProfile user={user} />}
            />
            <Route
              path="/EditRole/:companyId/:id"
              element={<EditRole user={user} />}
            />
            <Route path="/AccountGrid" element={<AccountGrid user={user} />} />
            <Route
              path="/CandidateGrid"
              element={<CandidateGrid user={user} />}
            />
            <Route
              path="/EditEmployee/:id"
              element={<EditEmployee user={user} />}
            />
            <Route
              path="/EditCandidate/:id"
              element={<EditCandidate user={user} />}
            />
            <Route
              path="/EditEmpanelled/:id"
              element={<EditEmpanelled user={user} />}
            />
            <Route path="/AddExtras" element={<AddExtras user={user} />} />
            <Route
              path="/UnderDevelopment"
              element={<UnderDevelopment user={user} />}
            />
            <Route
              path="/CompanyDashBoard"
              element={<CompanyDashBoard user={user} />}
            />
            <Route
              path="/AccountDashBoard"
              element={<AccountDashBoard user={user} />}
            />
            <Route
              path="/AccountDashBoard/AddAccount"
              element={<AddAccount user={user} />}
            />
            <Route path="/" element={<ProfileDashBoard user={user} />} />
            <Route
              path="/InstituteDashBoard"
              element={<InstituteDashBoard user={user} />}
            />
            <Route
              path="/CompanyDashBoard/AddCompany"
              element={<AddCompany user={user} />}
            />
            {/* <Route
              path="/CompanyDashBoard/EmpanelledGrid"
              element={<EmpanelledGrid user={user} />}
            /> */}
            <Route
              path="/AssignCandidate"
              element={<AssignCandidate user={user} />}
            />
            <Route
              path="/AssignCandidateGrid"
              element={<AssignCandidateGrid user={user} />}
            />
            <Route
              path="/PotentialLeads"
              element={<PotentialLeads user={user} />}
            />
            <Route path="/Bulkupload" element={<FileInput user={user} />} />
            <Route path="/AddRole/:id" element={<AddRole user={user} />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
