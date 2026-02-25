import { Certificate } from "@/types/certificate";
import { Award, Calendar, Building2, Trash2 } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface CertificateCardProps {
  certificate: Certificate;
  onDelete: (id: string) => void;
  index: number;
}

const categoryColors: Record<string, string> = {
  Tecnologia: "bg-primary/10 text-primary",
  Idiomas: "bg-accent text-accent-foreground",
  Gestão: "bg-secondary text-secondary-foreground",
  Design: "bg-primary/15 text-primary",
  Marketing: "bg-accent text-accent-foreground",
  Outros: "bg-muted text-muted-foreground",
};

const CertificateCard = ({ certificate, onDelete, index }: CertificateCardProps) => {
  return (
    <div
      className="group relative bg-card border border-border rounded-lg overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 animate-fade-in"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      {/* Certificate image */}
      {certificate.imageUrl && (
        <div className="w-full h-44 overflow-hidden bg-muted">
          <img
            src={certificate.imageUrl}
            alt={`Certificado: ${certificate.title}`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      )}

      <div className="p-5">
        {/* Delete button */}
        <button
          onClick={() => onDelete(certificate.id)}
          className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-md bg-card/80 backdrop-blur-sm hover:bg-destructive/10 text-muted-foreground hover:text-destructive"
          aria-label="Remover certificado"
        >
          <Trash2 className="w-4 h-4" />
        </button>

        {/* Category badge */}
        <span
          className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium mb-3 ${
            categoryColors[certificate.category] || categoryColors.Outros
          }`}
        >
          {certificate.category}
        </span>

        {/* Title */}
        <h3 className="font-display text-lg font-semibold text-card-foreground mb-3 pr-6 leading-tight">
          {certificate.title}
        </h3>

        {/* Meta */}
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Building2 className="w-3.5 h-3.5" />
            <span>{certificate.issuer}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="w-3.5 h-3.5" />
            <span>
              {format(new Date(certificate.date), "dd MMM yyyy", { locale: ptBR })}
            </span>
          </div>
        </div>
      </div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-4 right-4 h-0.5 bg-primary/0 group-hover:bg-primary/40 transition-all duration-300 rounded-full" />
    </div>
  );
};

export default CertificateCard;
