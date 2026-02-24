export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  category: string;
  imageUrl?: string;
  fileUrl?: string;
}

export const CATEGORIES = [
  "Tecnologia",
  "Idiomas",
  "Gestão",
  "Design",
  "Marketing",
  "Outros",
] as const;
