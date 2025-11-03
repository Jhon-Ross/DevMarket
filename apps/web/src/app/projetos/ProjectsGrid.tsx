"use client";
import Link from "next/link";
import React from "react";
import { Card, CardHeader, CardBody, Tag, Grid, Avatar } from "@devmarket/ui";

type PublicProject = {
  _id: string;
  title: string;
  slug: string;
  techTags?: string[];
  owner?: { _id: string; name: string; slug: string } | null;
  coverUrl?: string | null;
};

export default function ProjectsGrid({ projects }: { projects: PublicProject[] }) {
  const [activeTag, setActiveTag] = React.useState<string | null>(null);

  const allTags = React.useMemo(() => {
    const set = new Set<string>();
    projects.forEach((p) => p.techTags?.forEach((t) => set.add(t)));
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [projects]);

  const filtered = React.useMemo(() => {
    if (!activeTag) return projects;
    return projects.filter((p) => p.techTags?.includes(activeTag));
  }, [projects, activeTag]);

  return (
    <div>
      <div style={{ marginBottom: "var(--space-4)" }}>
        <h2 style={{ marginBottom: "var(--space-2)" }}>Filtros</h2>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <Tag variant={activeTag === null ? "primary" : undefined} onClick={() => setActiveTag(null)}>
            Todos
          </Tag>
          {allTags.map((t) => (
            <Tag key={t} variant={activeTag === t ? "primary" : undefined} onClick={() => setActiveTag(t)}>
              {t}
            </Tag>
          ))}
        </div>
      </div>

      <Grid columns={3} gap="sm">
        {filtered.map((p) => (
          <Card key={p._id} elevated>
            <CardHeader>
              <strong>{p.title}</strong>
            </CardHeader>
            <CardBody>
              {p.coverUrl ? (
                <img src={p.coverUrl} alt={p.title} style={{ width: "100%", borderRadius: 8, marginBottom: 8 }} />
              ) : null}
              {p.owner?.slug ? (
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                  <Avatar name={p.owner.name} size="sm" />
                  <span>
                    por {" "}
                    <Link href={`/perfil/${p.owner.slug}`} style={{ color: "var(--text-secondary)" }}>
                      {p.owner.name}
                    </Link>
                  </span>
                </div>
              ) : null}
              {p.techTags?.length ? (
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  {p.techTags.map((t) => (
                    <Tag key={t}>{t}</Tag>
                  ))}
                </div>
              ) : null}
            </CardBody>
          </Card>
        ))}
      </Grid>
    </div>
  );
}