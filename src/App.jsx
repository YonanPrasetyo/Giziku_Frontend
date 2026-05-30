import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './features/auth/context/AuthContext';
import { PrivateRoute } from './shared/components/PrivateRoute';
import Missions from './features/missions/pages/Missions';
import Home from './features/home/pages/Home';
import Login from './features/auth/pages/Login';
import Register from './features/auth/pages/Register';
import MissionUpload from "./features/missions/pages/MissionUpload";
import HistoryPage from "./features/missions/pages/HistoryPage";
import AdminMissions from "./features/missions/pages/AdminMissions";
import MissionForm from "./features/missions/pages/MissionForm";
import AdminRanks from "./features/rank/pages/AdminRanks";
import RankForm from "./features/rank/pages/RankForm";
import Profile from "./features/profile/pages/Profile";
import ProfileForm from "./features/profile/pages/ProfileForm";
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* User Routes */}
          <Route path="/" element={<PrivateRoute roles={['user']}> <Home /> </PrivateRoute>} />

          <Route path="/missions" element={<PrivateRoute roles={['user']}> <Missions /> </PrivateRoute>} />
          <Route path="/missions/upload" element={<PrivateRoute roles={['user']}> <MissionUpload /> </PrivateRoute>} />
          <Route path="/missions/history" element={<PrivateRoute roles={['user']}> <HistoryPage /> </PrivateRoute>} />

          <Route path="/profile" element={<PrivateRoute roles={['user']}> <Profile /> </PrivateRoute>} />
          <Route path="/profile/create" element={<PrivateRoute roles={['user']}> <ProfileForm /> </PrivateRoute>} />
          <Route path="/profile/edit/:id" element={<PrivateRoute roles={['user']}> <ProfileForm /> </PrivateRoute>} />

          {/* Admin Routes */}
          <Route path="/admin/missions" element={<PrivateRoute roles={["admin"]}> <AdminMissions /> </PrivateRoute>} />
          <Route path="/admin/missions/create" element={<PrivateRoute roles={["admin"]}> <MissionForm /> </PrivateRoute>} />
          <Route path="/admin/missions/edit/:id" element={<PrivateRoute roles={["admin"]}> <MissionForm /> </PrivateRoute>} />

          <Route path="/admin/ranks" element={<PrivateRoute roles={["admin"]}> <AdminRanks /> </PrivateRoute>} />
          <Route path="/admin/ranks/create" element={<PrivateRoute roles={["admin"]}> <RankForm /> </PrivateRoute>} />
          <Route path="/admin/ranks/edit/:id" element={<PrivateRoute roles={["admin"]}> <RankForm /> </PrivateRoute>} />

          {/* Catch all - redirect to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
