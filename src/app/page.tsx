import { About } from "@/components/about";
import { Clients } from "@/components/clients";
import { Contact } from "@/components/contact";
import { CoverPhoto } from "@/components/cover-photo";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import { Nav } from "@/components/nav";
import { SkillsStrip } from "@/components/skills-strip";
import { Work } from "@/components/work";
import { site } from "@/content/site";
import { getSiteUrl } from "@/lib/site-url";

export default function Home() {
  const url = getSiteUrl();
  // Structured data so search engines understand who this portfolio belongs to.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    jobTitle: site.role,
    description: site.seo.description,
    url,
    email: `mailto:${site.email}`,
    sameAs: site.socials.map((s) => s.href),
    knowsAbout: [...site.specialties, ...site.skills],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <Nav />
      <main id="main">
        <Hero />
        <SkillsStrip />
        <CoverPhoto />
        <Work />
        <Clients />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
