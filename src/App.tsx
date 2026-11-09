import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import MusicPlayer from "./components/MusicPlayer";
import JourneyLayout, { ScrollToTop } from "./components/JourneyLayout";
import HomePage from "./pages/HomePage";
import CommunicationPage from "./pages/CommunicationPage";
import FirstDatePage from "./pages/FirstDatePage";
import AppreciationPage from "./pages/AppreciationPage";
import ChildhoodPage from "./pages/ChildhoodPage";
import EvaluationPage from "./pages/EvaluationPage";
import ProposalPage from "./pages/ProposalPage";
import YesPage from "./pages/YesPage";
import NotNowPage from "./pages/NotNowPage";

function App() {
  return (
    <BrowserRouter>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <ScrollToTop />
      <MusicPlayer />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route element={<JourneyLayout />}>
          <Route path="/communication" element={<CommunicationPage />} />
          <Route path="/first-date" element={<FirstDatePage />} />
          <Route path="/appreciation" element={<AppreciationPage />} />
          <Route path="/childhood" element={<ChildhoodPage />} />
          <Route path="/evaluation" element={<EvaluationPage />} />
          <Route path="/proposal" element={<ProposalPage />} />
        </Route>
        <Route path="/yes" element={<YesPage />} />
        <Route path="/not-now" element={<NotNowPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
