import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Classes from "./pages/Classes";
import Header from "./components/Header";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/classes" element={<Classes />} />
      </Routes>
    </>
  );
}

export default App;
