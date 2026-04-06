import { Footer } from "../common/Footer";
import { Header } from "../common/Header";

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="app-container">
      <Header />
      <main className="flex-1 p-10">{children}</main>
      <Footer />
    </div>
  );
};