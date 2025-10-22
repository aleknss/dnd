import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./Layout/Header";
import { Suspense, lazy } from "react";

function App() {
  const ClassPage = lazy(() => import("./pages/ClassPage"));
  const Classes = lazy(() => import("./pages/Classes"));

  return (
    <>
      <Header />
      <Suspense fallback={<div>Cargando...</div>}>
        <Routes>
          <Route path="/dnd/" element={<Home />} />
          <Route path="/dnd/classes" element={<Classes />} />
          <Route path="/dnd/classes/:id" element={<ClassPage />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
