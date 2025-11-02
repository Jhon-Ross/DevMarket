export default async function PerfilPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return (
    <section>
      <h1>Perfil: {slug}</h1>
      <p>Página pública de perfil (placeholder). Em breve: dados do Sanity e ISR.</p>
    </section>
  );
}