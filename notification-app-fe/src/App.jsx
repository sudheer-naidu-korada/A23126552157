import { Routes, Route, BrowserRouter } from "react-router-dom";
import { NotificationsPage } from "./pages/NotificationsPage";
import CreateNotificationPage from "./pages/CreateNotificationPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<NotificationsPage />} />
        <Route path="/create" element={<CreateNotificationPage />} />
      </Routes>
    </BrowserRouter>
  );
}
