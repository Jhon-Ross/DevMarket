export default function Home() {
  return (
    <main style={{ 
      padding: "var(--space-8)", 
      maxWidth: "1200px", 
      margin: "0 auto",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center"
    }}>
      {/* Header */}
      <header style={{ textAlign: "center", marginBottom: "var(--space-8)" }}>
        <h1 style={{ 
          fontSize: "3rem", 
          fontWeight: "700",
          marginBottom: "var(--space-4)",
          color: "var(--text-primary)",
          letterSpacing: "-0.02em"
        }}>
          DevMarket
        </h1>
        <p style={{ 
          fontSize: "1.25rem",
          color: "var(--text-secondary)",
          marginBottom: "var(--space-6)",
          maxWidth: "600px",
          lineHeight: "1.6"
        }}>
          Marketplace para desenvolvedores. Conecte-se com talentos, encontre projetos incríveis e construa o futuro da tecnologia.
        </p>
        
        {/* CTA Buttons */}
        <div style={{ 
          display: "flex", 
          gap: "var(--space-4)", 
          justifyContent: "center",
          flexWrap: "wrap"
        }}>
          <button style={{
            background: "var(--accent)",
            color: "var(--accent-foreground)",
            border: "none",
            padding: "var(--space-3) var(--space-5)",
            borderRadius: "var(--radius-md)",
            fontSize: "1rem",
            fontWeight: "500",
            cursor: "pointer",
            transition: "all 0.2s ease",
            boxShadow: "var(--shadow-sm)"
          }}>
            Começar Agora
          </button>
          
          <button style={{
            background: "transparent",
            color: "var(--text-primary)",
            border: "1px solid var(--border-default)",
            padding: "var(--space-3) var(--space-5)",
            borderRadius: "var(--radius-md)",
            fontSize: "1rem",
            fontWeight: "500",
            cursor: "pointer",
            transition: "all 0.2s ease"
          }}>
            Saiba Mais
          </button>
        </div>
      </header>

      {/* Features Grid */}
      <section style={{ 
        display: "grid", 
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        gap: "var(--space-6)",
        width: "100%",
        marginBottom: "var(--space-8)"
      }}>
        <div style={{
          padding: "var(--space-6)",
          background: "var(--bg-muted)",
          borderRadius: "var(--radius-lg)",
          border: "1px solid var(--border-default)"
        }}>
          <h3 style={{ 
            color: "var(--text-primary)", 
            marginBottom: "var(--space-3)",
            fontSize: "1.25rem",
            fontWeight: "600"
          }}>
            Para Desenvolvedores
          </h3>
          <p style={{ 
            color: "var(--text-secondary)",
            lineHeight: "1.6"
          }}>
            Crie seu portfólio, mostre seus projetos e conecte-se com empresas que valorizam seu talento.
          </p>
        </div>

        <div style={{
          padding: "var(--space-6)",
          background: "var(--bg-muted)",
          borderRadius: "var(--radius-lg)",
          border: "1px solid var(--border-default)"
        }}>
          <h3 style={{ 
            color: "var(--text-primary)", 
            marginBottom: "var(--space-3)",
            fontSize: "1.25rem",
            fontWeight: "600"
          }}>
            Para Empresas
          </h3>
          <p style={{ 
            color: "var(--text-secondary)",
            lineHeight: "1.6"
          }}>
            Encontre desenvolvedores qualificados, analise portfólios reais e contrate com confiança.
          </p>
        </div>

        <div style={{
          padding: "var(--space-6)",
          background: "var(--bg-muted)",
          borderRadius: "var(--radius-lg)",
          border: "1px solid var(--border-default)"
        }}>
          <h3 style={{ 
            color: "var(--text-primary)", 
            marginBottom: "var(--space-3)",
            fontSize: "1.25rem",
            fontWeight: "600"
          }}>
            Projetos Reais
          </h3>
          <p style={{ 
            color: "var(--text-secondary)",
            lineHeight: "1.6"
          }}>
            Veja projetos em ação, código real e resultados que demonstram a qualidade do trabalho.
          </p>
        </div>
      </section>

      {/* Theme Toggle Demo */}
      <footer style={{ 
        textAlign: "center",
        padding: "var(--space-6)",
        borderTop: "1px solid var(--border-default)",
        width: "100%"
      }}>
        <p style={{ 
          color: "var(--text-muted)",
          fontSize: "0.875rem",
          marginBottom: "var(--space-3)"
        }}>
          Design System com Light/Dark Theme • Tokens CSS • TypeScript
        </p>
        <p style={{ 
          color: "var(--text-muted)",
          fontSize: "0.75rem"
        }}>
          Para testar o tema escuro, adicione a classe "dark" no elemento &lt;html&gt;
        </p>
      </footer>
    </main>
  );
}
