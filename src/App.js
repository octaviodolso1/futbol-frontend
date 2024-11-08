import React from "react";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import TournamentsPage from "./pages/TournamentsPage";
import TournamentDetailPage from "./pages/TournamentDetailPage";
import AddTournamentPage from "./pages/AddTournamentPage";
import AddTeamPage from "./pages/AddTeamPage";
import AddMatchPage from "./pages/AddMatchPage";
import AddResultPage from "./pages/AddResultPage";
import EditTournamentPage from "./pages/EditTournamentPage";
import EditTeamPage from "./pages/EditTeamPage";
import EditMatchPage from "./pages/EditMatchPage";
import EditResultPage from "./pages/EditResultPage";
import TeamPage from "./pages/TeamPage";

const App = () => {
  return (
    <AuthProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route
          path="/tournaments"
          element={
            <PrivateRoute>
              <TournamentsPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/tournaments/new"
          element={
            <PrivateRoute>
              <AddTournamentPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/tournaments/:tournamentId"
          element={
            <PrivateRoute>
              <TournamentDetailPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/tournaments/:tournamentId/teams/new"
          element={
            <PrivateRoute>
              <AddTeamPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/tournaments/:tournamentId/matches/new"
          element={
            <PrivateRoute>
              <AddMatchPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/tournaments/:tournamentId/matches/:matchId/result"
          element={
            <PrivateRoute>
              <AddResultPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/tournaments/:tournamentId/edit"
          element={
            <PrivateRoute>
              <EditTournamentPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/tournaments/:tournamentId/teams/:teamId/edit"
          element={
            <PrivateRoute>
              <EditTeamPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/tournaments/:tournamentId/matches/:matchId/edit"
          element={
            <PrivateRoute>
              <EditMatchPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/tournaments/:tournamentId/matches/:matchId/result/edit"
          element={
            <PrivateRoute>
              <EditResultPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/teams/:teamId"
          element={
            <PrivateRoute>
              <TeamPage />
            </PrivateRoute>
          }
        />
      </Routes>
    </AuthProvider>
  );
};

export default App;
