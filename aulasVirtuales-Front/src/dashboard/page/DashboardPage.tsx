import { Card } from "../../components/ui/Card";
import { Container } from "../../components/ui/Container";

export const DashboardPage = () => {
  return (
    <Container>
      <h2 className="text-2xl text-[var(--usmp-red)] mb-10">
        Módulos
      </h2>

      <div className="grid gap-8 md:grid-cols-3">
        <Card
          title="Descargar Matriculados"
          description="Descargar Matriculados AV"
          to="/structure" 
        />

      
      </div>
    </Container>
  );
};