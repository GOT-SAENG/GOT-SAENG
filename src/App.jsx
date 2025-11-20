import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
// import Home from "./pages/Home/Home";
import Todo from "./pages/Todo/Todo";
// import Scheduler from "./pages/Scheduler/Scheduuler";
// import History from "./pages/History/History";

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         {/* <Route path="/" element={<Home />} /> */}
//         <Route path="/todo" element={<Todo />} />
//         {/* <Route path="/scheduler" element={<Scheduler />} /> */}
//         {/* <Route path="/history" element={<History />} /> */}
//       </Routes>
//     </BrowserRouter>
//   );
// }
function App() {
  return (
    // <div>
    <div style={{ background: "#134a2f" }}>
      <BrowserRouter>
        <Routes>
          <Route path="/todo" element={<Todo />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
