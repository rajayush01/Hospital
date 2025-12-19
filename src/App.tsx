import { Routes, Route, Outlet } from "react-router-dom";
import { lazy, Suspense } from "react";
import MainLayout from "./components/layout/MainLayout";
import { useState, useEffect } from "react";

import DairyLoadingAnimation from "./components/ui/Loading";
import NotFound from "./pages/NotFound";
import DrJayaMishra from "./pages/DrJayaMishra";
import DrKatyayanMishra from "./pages/DrKatyayanMishra";
import DrAnanyMishra from "./pages/DrAnanyMishra";



const Home = lazy(() => import("./pages/Home"));

// Responsive component wrapper

function App() {
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  useEffect(() => {
    // Set a timer to hide initial loading after animation completes
    const timer = setTimeout(() => {
      setIsInitialLoading(false);
    }, 3000); // Adjust this duration based on your loading animation

    return () => clearTimeout(timer);
  }, []);

  if (isInitialLoading) {
    return <DairyLoadingAnimation />;
  }

  return (
    <Suspense
      fallback={
        <div className="min-h-screen">
          <DairyLoadingAnimation />
        </div>
      }
    >
      <Routes>
        <Route
          path="/"
          element={
            <MainLayout>
              <Outlet />
            </MainLayout>
          }
        >
          <Route index element={<Home />} />
          <Route path="/jaya" element={<DrJayaMishra />} />
                    <Route path="/katyayan" element={<DrKatyayanMishra />} />
          <Route path="/Anany" element={<DrAnanyMishra />} />

        </Route>
        <Route
          path="/404"
          element={
            <MainLayout>
              <NotFound />
            </MainLayout>
          }
        />
        <Route
          path="*"
          element={
            <MainLayout>
              <NotFound />
            </MainLayout>
          }
        />
      </Routes>
    </Suspense>
  );
}

export default App;
