"use client";
import React from "react";
import { Button, Card, CardHeader, CardBody, CardFooter, Avatar, Tag, Grid, MediaGallery } from "@devmarket/ui";

export default function PreviewPage() {
  return (
    <div style={{ padding: 24, fontFamily: "ui-sans-serif, system-ui" }}>
      <h1 style={{ marginBottom: 16 }}>UI Preview</h1>

      <section style={{ marginBottom: 24 }}>
        <h2>Button</h2>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
          <Button>Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="destructive">Destructive</Button>
          <Button loading>Loading</Button>
        </div>
      </section>

      <section style={{ marginBottom: 24 }}>
        <h2>Card</h2>
        <Card elevated>
          <CardHeader>
            <strong>Card Title</strong>
          </CardHeader>
          <CardBody>
            This is the card body using semantic CSS tokens.
          </CardBody>
          <CardFooter>
            <Button size="sm">Action</Button>
          </CardFooter>
        </Card>
      </section>

      <section style={{ marginBottom: 24 }}>
        <h2>Avatar</h2>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <Avatar name="Dev Market" size="sm" />
          <Avatar name="Dev Market" size="md" />
          <Avatar name="Dev Market" size="lg" />
        </div>
      </section>

      <section style={{ marginBottom: 24 }}>
        <h2>Tag</h2>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
          <Tag>Default</Tag>
          <Tag variant="primary">Primary</Tag>
          <Tag variant="success">Success</Tag>
          <Tag variant="warning">Warning</Tag>
          <Tag variant="danger">Danger</Tag>
        </div>
      </section>

      <section style={{ marginBottom: 24 }}>
        <h2>Grid</h2>
        <Grid columns={4} gap="sm">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} style={{ background: "#f8fafc", border: "1px solid #e2e8f0", padding: 12, borderRadius: 8 }}>
              Item {i + 1}
            </div>
          ))}
        </Grid>
      </section>

      <section>
        <h2>MediaGallery</h2>
        <MediaGallery
          items={[
            { src: "https://picsum.photos/id/1015/400/300", alt: "Mountain" },
            { src: "https://picsum.photos/id/1025/400/300", alt: "Dog" },
            { src: "https://picsum.photos/id/1042/400/300", alt: "Bridge" },
          ]}
        />
      </section>
    </div>
  );
}