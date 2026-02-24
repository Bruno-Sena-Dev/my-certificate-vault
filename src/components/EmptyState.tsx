import { Award } from "lucide-react";

const EmptyState = () => (
  <div className="flex flex-col items-center justify-center py-20 animate-fade-in">
    <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center mb-4">
      <Award className="w-8 h-8 text-primary" />
    </div>
    <h3 className="font-display text-lg font-semibold text-foreground mb-1">
      Nenhum certificado encontrado
    </h3>
    <p className="text-muted-foreground text-sm">
      Adicione seu primeiro certificado ou ajuste a busca.
    </p>
  </div>
);

export default EmptyState;
