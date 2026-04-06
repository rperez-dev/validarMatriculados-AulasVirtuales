import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainLayout } from "../../components/layouts/MainLayout";
import { DashboardPage } from "../../dashboard/page/DashboardPage";
import { StructurePage } from "../../aulasVirtuales/pages/StructurePage";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/structure" element={<StructurePage />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
};
