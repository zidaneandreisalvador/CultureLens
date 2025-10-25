import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LoginScreen } from './screens/auth/LoginScreen';
import { RegisterScreen } from './screens/auth/RegisterScreen';
import { HomeScreen } from './screens/home/HomeScreen';
import { SearchScreen } from './screens/search/SearchScreen';
import { BuddyScreen } from './screens/buddy/BuddyScreen';
import { GuideScreen } from './screens/guide/GuideScreen';
import { AccountScreen } from './screens/account/AccountScreen';
import { TranslateScreen } from './screens/translate/TranslateScreen';
import { ItineraryScreen } from './screens/itinerary/ItineraryScreen';
import { PlanTripScreen } from './screens/plan/PlanTripScreen';
import { MainLayout } from './components/layouts/MainLayout';
import { AuthLayout } from './components/layouts/AuthLayout';
import { WelcomeScreen } from './screens/welcome/WelcomeScreen';
import { PostExperienceScreen } from './screens/experience/PostExperienceScreen';
import { CommunityExperiencesScreen } from './screens/experience/CommunityExperiencesScreen';
import { SavedTripsScreen } from './screens/saved-trips/SavedTripsScreen';
export function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const handleLogin = () => {
    setIsAuthenticated(true);
  };
  const handleLogout = () => {
    setIsAuthenticated(false);
  };
  return <BrowserRouter>
      <Routes>
        {/* Welcome Screen */}
        <Route path="/" element={!isAuthenticated ? <WelcomeScreen /> : <Navigate to="/home" replace />} />
        {/* Auth Routes */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={!isAuthenticated ? <LoginScreen onLogin={handleLogin} /> : <Navigate to="/home" replace />} />
          <Route path="/register" element={!isAuthenticated ? <RegisterScreen onRegister={handleLogin} /> : <Navigate to="/home" replace />} />
        </Route>
        {/* Protected Routes */}
        <Route element={isAuthenticated ? <MainLayout onLogout={handleLogout} /> : <Navigate to="/" replace />}>
          <Route path="/home" element={<HomeScreen />} />
          <Route path="/search" element={<SearchScreen />} />
          <Route path="/buddy" element={<BuddyScreen />} />
          <Route path="/guide" element={<GuideScreen />} />
          <Route path="/itinerary" element={<ItineraryScreen />} />
          <Route path="/account" element={<AccountScreen onLogout={handleLogout} />} />
          <Route path="/translate" element={<TranslateScreen />} />
          <Route path="/plan-trip" element={<PlanTripScreen />} />
          <Route path="/post-experience" element={<PostExperienceScreen />} />
          <Route path="/experiences" element={<CommunityExperiencesScreen />} />
          <Route path="/saved-trips" element={<SavedTripsScreen />} />
        </Route>
        {/* Redirect to welcome if not authenticated, home if authenticated */}
        <Route path="*" element={<Navigate to={isAuthenticated ? '/home' : '/'} replace />} />
      </Routes>
    </BrowserRouter>;
}