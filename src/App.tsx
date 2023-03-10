import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Employees from "./pages/Employees";
import Home from "./pages/Home";
import Jobs from "./pages/Jobs";

function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/employees" element={<Employees />} />
              <Route path="/jobs" element={<Jobs />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
