import "./App.css";

import Home from "./pages/Home/Home";
import History from "./pages/History/History";
import Scheduler from "./pages/Scheduler/Scheduler";
import Todo from "./pages/Todo/Todo";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/history" element={<History />} />
        <Route path="/scheduler" element={<Scheduler />} />
        <Route path="/todo" element={<Todo />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
