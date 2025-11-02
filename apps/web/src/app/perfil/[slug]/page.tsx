interface PerfilPageProps {
  params: { slug: string };
}

export default function PerfilPage({ params }: PerfilPageProps) {
  const { slug } = params;
  return (
    <section>
      <h1>Perfil: {slug}</h1>
      <p>Página pública de perfil (placeholder). Em breve: dados do Sanity e ISR.</p>
    </section>
  );
}