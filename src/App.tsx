import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/some-route" element={<div>Some Route</div>} />
    </Routes>
  );
}

export default App;
