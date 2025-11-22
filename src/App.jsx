import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import History from "./pages/History/History";
import Scheduler from "./pages/Scheduler/Scheduler";
import Todo from "./pages/Todo/Todo";
import Login from "./components/Home/Login";
import { AuthProvider } from "./context/AuthContext";
import Register from "./components/Home/Register";
import NotFound from "./pages/NotFound/NotFound";


function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/history" element={<History />} />
          <Route path="/scheduler" element={<Scheduler />} />
          <Route path="/todo" element={<Todo />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
export default App;
