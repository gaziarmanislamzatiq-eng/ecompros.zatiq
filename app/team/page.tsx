import type { Metadata } from "next";

import ScrollCinematics from "@/components/motion/ScrollCinematics";
import TeamProfileExplorer from "@/components/team/TeamProfileExplorer";
import { brand } from "@/lib/brand";
import { teamMembers } from "@/lib/team";

const pageTitle = "Team |EcomPros";
const pageDescription =
  "Meet theEcomPros founding and leadership team behind software engineering, cybersecurity, motion, operations, and growth.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: "/team",
  },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: "/team",
    siteName: brand.name,
    images: [
      {
        url: "/team/images/Gazi%20Arman%20Islam.png",
        width: 800,
        height: 800,
        alt: "Ecom ProDesk team portrait",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: pageDescription,
    images: ["/team/images/Gazi%20Arman%20Islam.png"],
  },
};

export default function TeamPage() {
  return (
    <div className="team-page page-shell">
      <ScrollCinematics />

      <section className="team-hero" aria-labelledby="team-title">
        <div className="team-hero__inner">
          <div className="team-hero__content">
            <p className="section__label" data-cinematic="rise">
              Team roster
            </p>
            <h1 className="team-hero__title" data-cinematic="clip" id="team-title">
              The people behindEcomPros.
            </h1>
          </div>
          <p className="team-hero__copy" data-cinematic="rise" data-cinematic-delay="1">
            Gazi Arman Islam leads technical execution across full-stack
            software and AI engineering. Select his card to review the role
            evidence behind the designation.
          </p>
        </div>
      </section>

      <section className="team-catalog section" aria-labelledby="team-catalog-title">
        <div className="team-catalog__inner">
          <div className="team-catalog__head">
            <h2
              className="section__title"
              data-cinematic="clip"
              id="team-catalog-title"
            >
              One compact leadership roster.
            </h2>
            <p className="section__copy" data-cinematic="rise" data-cinematic-delay="1">
              Each card opens a formatted profile built from the member&apos;s listed
              work history, skills, education, and credentials.
            </p>
          </div>

          <TeamProfileExplorer members={teamMembers} />
        </div>
      </section>
    </div>
  );
}
