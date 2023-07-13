import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Home, MaliciousURLIndex, PageNotFound, SpamDetectionIndex } from "../pages/Index";

import ScrollToTop from "../utils/ScrollToTop";

const AppRoutes = () => {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/spam-detection" element={<SpamDetectionIndex />} />
        <Route path="/malicious-url-detection" element={<MaliciousURLIndex />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
