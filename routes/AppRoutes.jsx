import { Routes, Route } from "react-router-dom";
import AppShell from "../components/layout/AppShell";
import Overview from "../pages/Overview";
import Forecast from "../pages/Forecast";
import About from "../pages/About";
import NotFound from "../pages/NotFound";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AppShell />}>
        <Route index element={<Overview />} />
        <Route path="forecast" element={<Forecast />} />
        <Route path="about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
