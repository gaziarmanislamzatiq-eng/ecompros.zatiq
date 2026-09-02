import Link from "next/link";
import { ArrowRight } from "lucide-react";

import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import { brand } from "@/lib/brand";

export const metadata = {
  title: "Terms of Service | EcomPros",
  description: "Terms of service for EcomPros ecommerce operations and support services.",
};

export default function TermsPage() {
  return (
    <main className="site-body">
      <section className="section section--tight">
        <Container>
          <div style={{ marginBlock: "var(--space-4xl)" }}>
            <Link
              href="/"
              className="footer-link"
              style={{ marginBlockEnd: "var(--space-2xl)", display: "inline-block" }}
            >
              ← Back to home
            </Link>

            <h1
              className="section__title"
              style={{ marginBlockEnd: "var(--space-lg)" }}
            >
              Terms of Service
            </h1>

            <div style={{ maxWidth: "56rem", color: "var(--color-ink-soft)" }}>
              <h2 style={{ fontSize: "var(--text-lg)", fontWeight: 700, marginTop: "var(--space-2xl)", marginBottom: "var(--space-md)" }}>
                1. Service Description
              </h2>
              <p style={{ marginBlockEnd: "var(--space-md)", lineHeight: "var(--lh-body)" }}>
                {brand.name} provides ecommerce operations, marketplace management, customer support, creative services, marketing, and technology development. Our services are designed to support growing ecommerce businesses.
              </p>

              <h2 style={{ fontSize: "var(--text-lg)", fontWeight: 700, marginTop: "var(--space-2xl)", marginBottom: "var(--space-md)" }}>
                2. Engagement Agreement
              </h2>
              <p style={{ marginBlockEnd: "var(--space-md)", lineHeight: "var(--lh-body)" }}>
                Services are provided on a monthly, quarterly, or annual basis. Both parties agree to the terms outlined in the signed service agreement or proposal.
              </p>

              <h2 style={{ fontSize: "var(--text-lg)", fontWeight: 700, marginTop: "var(--space-2xl)", marginBottom: "var(--space-md)" }}>
                3. Payment Terms
              </h2>
              <p style={{ marginBlockEnd: "var(--space-md)", lineHeight: "var(--lh-body)" }}>
                Invoices are due within 30 days of issuance. Late payments may incur additional fees as outlined in your service agreement.
              </p>

              <h2 style={{ fontSize: "var(--text-lg)", fontWeight: 700, marginTop: "var(--space-2xl)", marginBottom: "var(--space-md)" }}>
                4. Intellectual Property
              </h2>
              <p style={{ marginBlockEnd: "var(--space-md)", lineHeight: "var(--lh-body)" }}>
                Custom work created for clients remains the property of {brand.name} unless explicitly transferred through a separate agreement. Pre-existing materials, tools, and processes remain {brand.name}'s intellectual property.
              </p>

              <h2 style={{ fontSize: "var(--text-lg)", fontWeight: 700, marginTop: "var(--space-2xl)", marginBottom: "var(--space-md)" }}>
                5. Confidentiality
              </h2>
              <p style={{ marginBlockEnd: "var(--space-md)", lineHeight: "var(--lh-body)" }}>
                Both parties agree to maintain confidentiality of sensitive business information shared during the engagement, consistent with industry standards.
              </p>

              <h2 style={{ fontSize: "var(--text-lg)", fontWeight: 700, marginTop: "var(--space-2xl)", marginBottom: "var(--space-md)" }}>
                6. Limitation of Liability
              </h2>
              <p style={{ marginBlockEnd: "var(--space-md)", lineHeight: "var(--lh-body)" }}>
                {brand.name} is not liable for indirect, incidental, or consequential damages. Our total liability is limited to the fees paid in the last 12 months of service.
              </p>

              <h2 style={{ fontSize: "var(--text-lg)", fontWeight: 700, marginTop: "var(--space-2xl)", marginBottom: "var(--space-md)" }}>
                7. Service Level Agreement (SLA)
              </h2>
              <p style={{ marginBlockEnd: "var(--space-md)", lineHeight: "var(--lh-body)" }}>
                {brand.name} commits to 99.9% uptime and support availability. Critical issues receive priority response and resolution.
              </p>

              <h2 style={{ fontSize: "var(--text-lg)", fontWeight: 700, marginTop: "var(--space-2xl)", marginBottom: "var(--space-md)" }}>
                8. Termination
              </h2>
              <p style={{ marginBlockEnd: "var(--space-md)", lineHeight: "var(--lh-body)" }}>
                Either party may terminate the engagement with written notice as specified in the service agreement. Upon termination, {brand.name} will deliver final work and transition support.
              </p>

              <h2 style={{ fontSize: "var(--text-lg)", fontWeight: 700, marginTop: "var(--space-2xl)", marginBottom: "var(--space-md)" }}>
                9. Changes to Terms
              </h2>
              <p style={{ marginBlockEnd: "var(--space-md)", lineHeight: "var(--lh-body)" }}>
                {brand.name} reserves the right to update these terms. Continued service use constitutes acceptance of updated terms.
              </p>

              <h2 style={{ fontSize: "var(--text-lg)", fontWeight: 700, marginTop: "var(--space-2xl)", marginBottom: "var(--space-md)" }}>
                10. Contact Information
              </h2>
              <p style={{ marginBlockEnd: "var(--space-2xl)", lineHeight: "var(--lh-body)" }}>
                For questions about these terms, contact us at{" "}
                <a href="/#booking" style={{ color: "var(--color-brand-accent)", textDecoration: "none", fontWeight: 600 }}>
                  our booking page
                </a>{" "}
                or through our website contact form.
              </p>

              <Button href="/#booking" size="sm">
                Contact us
                <ArrowRight aria-hidden="true" size={16} />
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
