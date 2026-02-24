import { useState, useMemo } from "react";
import { Award, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import CertificateCard from "@/components/CertificateCard";
import AddCertificateDialog from "@/components/AddCertificateDialog";
import EmptyState from "@/components/EmptyState";
import { Certificate, CATEGORIES } from "@/types/certificate";
import { mockCertificates } from "@/data/mock-certificates";
import heroCert from "@/assets/hero-certificate.png";

const Index = () => {
  const [certificates, setCertificates] = useState<Certificate[]>(mockCertificates);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return certificates.filter((c) => {
      const matchesSearch =
        c.title.toLowerCase().includes(search.toLowerCase()) ||
        c.issuer.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = !activeCategory || c.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [certificates, search, activeCategory]);

  const handleAdd = (cert: Certificate) => {
    setCertificates((prev) => [cert, ...prev]);
  };

  const handleDelete = (id: string) => {
    setCertificates((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <header className="relative overflow-hidden bg-foreground text-primary-foreground">
        <div className="absolute inset-0 opacity-10">
          <img
            src={heroCert}
            alt=""
            className="w-full h-full object-cover"
            aria-hidden="true"
          />
        </div>
        <div className="relative container mx-auto px-4 py-16 md:py-20">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
              <Award className="w-5 h-5 text-primary-foreground" />
            </div>
            <h1 className="font-display text-2xl font-bold tracking-tight">
              MeusCertificados
            </h1>
          </div>
          <p className="text-primary-foreground/70 max-w-md text-sm md:text-base">
            Seu cofre digital de certificados. Acesse de qualquer lugar, a qualquer momento.
          </p>
          <div className="mt-6 flex items-center gap-3 text-xs text-primary-foreground/50">
            <span>{certificates.length} certificados</span>
            <span>•</span>
            <span>
              {new Set(certificates.map((c) => c.category)).size} categorias
            </span>
          </div>
        </div>
      </header>

      {/* Controls */}
      <main className="container mx-auto px-4 -mt-6 relative z-10">
        <div className="bg-card rounded-xl border border-border shadow-card p-4 mb-6 flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
          <div className="relative flex-1 w-full sm:max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Buscar certificados..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
          <AddCertificateDialog onAdd={handleAdd} />
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap gap-2 mb-6">
          <Badge
            variant={activeCategory === null ? "default" : "outline"}
            className="cursor-pointer transition-colors"
            onClick={() => setActiveCategory(null)}
          >
            Todos
          </Badge>
          {CATEGORIES.map((cat) => (
            <Badge
              key={cat}
              variant={activeCategory === cat ? "default" : "outline"}
              className="cursor-pointer transition-colors"
              onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}
            >
              {cat}
            </Badge>
          ))}
        </div>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pb-16">
            {filtered.map((cert, i) => (
              <CertificateCard
                key={cert.id}
                certificate={cert}
                onDelete={handleDelete}
                index={i}
              />
            ))}
          </div>
        ) : (
          <EmptyState />
        )}
      </main>
    </div>
  );
};

export default Index;
