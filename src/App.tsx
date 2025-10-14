import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Classes from "./pages/Classes";
import Header from "./Layout/Header";
import ClassPage from "./pages/ClassPage";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/classes" element={<Classes />} />
        <Route path="/classes/:id" element={<ClassPage />} />
      </Routes>
    </>
  );
}

export default App;
