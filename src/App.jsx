import React from "react";
import { BrowserRouter as Router, Route, Routes,Navigate } from "react-router-dom";
import { AuthProvider } from "./context/context";
import Auth from "./components/auth";
import Dashboard from "./components/dashboard";
import Admin from "./components/admin";
import SearchCitasModule from "./components/searchCitas";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => (
  <AuthProvider>
    <Router>
      <Routes>
      <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/login" element={<Auth />} />
        <Route
          path="/dashboard"
          element={ 
            
            
              <Dashboard />
          }
        />
        <Route
          path="/admin"
          element={
            
              <Admin />
            
          }
        />
        <Route
          path="/search-citas"
          element={
            <ProtectedRoute>
              <SearchCitasModule />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  </AuthProvider>
);

export default App;
