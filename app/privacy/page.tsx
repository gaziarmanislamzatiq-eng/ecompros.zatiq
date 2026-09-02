import Link from "next/link";
import { ArrowRight } from "lucide-react";

import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import { brand } from "@/lib/brand";

export const metadata = {
  title: "Privacy Policy | EcomPros",
  description: "Privacy policy for EcomPros ecommerce operations and support services.",
};

export default function PrivacyPage() {
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
              Privacy Policy
            </h1>

            <div style={{ maxWidth: "56rem", color: "var(--color-ink-soft)" }}>
              <h2 style={{ fontSize: "var(--text-lg)", fontWeight: 700, marginTop: "var(--space-2xl)", marginBottom: "var(--space-md)" }}>
                1. Information We Collect
              </h2>
              <p style={{ marginBlockEnd: "var(--space-md)", lineHeight: "var(--lh-body)" }}>
                We collect information you provide directly, including your name, email, company details, and communication preferences. We may also collect information about your ecommerce operations as part of our service delivery.
              </p>

              <h2 style={{ fontSize: "var(--text-lg)", fontWeight: 700, marginTop: "var(--space-2xl)", marginBottom: "var(--space-md)" }}>
                2. How We Use Your Information
              </h2>
              <p style={{ marginBlockEnd: "var(--space-md)", lineHeight: "var(--lh-body)" }}>
                Your information is used to deliver our services, communicate with you, improve our operations, and comply with legal obligations. We do not sell your data to third parties.
              </p>

              <h2 style={{ fontSize: "var(--text-lg)", fontWeight: 700, marginTop: "var(--space-2xl)", marginBottom: "var(--space-md)" }}>
                3. Data Security
              </h2>
              <p style={{ marginBlockEnd: "var(--space-md)", lineHeight: "var(--lh-body)" }}>
                We implement industry-standard security measures to protect your information. Your data is encrypted in transit and at rest. We regularly audit our security practices.
              </p>

              <h2 style={{ fontSize: "var(--text-lg)", fontWeight: 700, marginTop: "var(--space-2xl)", marginBottom: "var(--space-md)" }}>
                4. Third-Party Services
              </h2>
              <p style={{ marginBlockEnd: "var(--space-md)", lineHeight: "var(--lh-body)" }}>
                We use trusted third-party service providers for payment processing, hosting, and analytics. These providers are bound by confidentiality agreements and industry security standards.
              </p>

              <h2 style={{ fontSize: "var(--text-lg)", fontWeight: 700, marginTop: "var(--space-2xl)", marginBottom: "var(--space-md)" }}>
                5. Your Rights
              </h2>
              <p style={{ marginBlockEnd: "var(--space-md)", lineHeight: "var(--lh-body)" }}>
                You have the right to access, correct, or delete your personal information. To exercise these rights, contact us through our booking page or contact form.
              </p>

              <h2 style={{ fontSize: "var(--text-lg)", fontWeight: 700, marginTop: "var(--space-2xl)", marginBottom: "var(--space-md)" }}>
                6. Cookies and Tracking
              </h2>
              <p style={{ marginBlockEnd: "var(--space-md)", lineHeight: "var(--lh-body)" }}>
                We use cookies to improve your experience and understand how you use our services. You can disable cookies through your browser settings.
              </p>

              <h2 style={{ fontSize: "var(--text-lg)", fontWeight: 700, marginTop: "var(--space-2xl)", marginBottom: "var(--space-md)" }}>
                7. Data Retention
              </h2>
              <p style={{ marginBlockEnd: "var(--space-md)", lineHeight: "var(--lh-body)" }}>
                We retain your information for as long as necessary to provide services and comply with legal obligations. After service termination, data is retained per legal requirements or deleted upon request.
              </p>

              <h2 style={{ fontSize: "var(--text-lg)", fontWeight: 700, marginTop: "var(--space-2xl)", marginBottom: "var(--space-md)" }}>
                8. International Data Transfers
              </h2>
              <p style={{ marginBlockEnd: "var(--space-md)", lineHeight: "var(--lh-body)" }}>
                {brand.name} operates globally. Your information may be transferred to and stored in countries other than your country of residence. We ensure transfers comply with applicable data protection laws.
              </p>

              <h2 style={{ fontSize: "var(--text-lg)", fontWeight: 700, marginTop: "var(--space-2xl)", marginBottom: "var(--space-md)" }}>
                9. Children's Privacy
              </h2>
              <p style={{ marginBlockEnd: "var(--space-md)", lineHeight: "var(--lh-body)" }}>
                Our services are not intended for individuals under 18. We do not knowingly collect information from children.
              </p>

              <h2 style={{ fontSize: "var(--text-lg)", fontWeight: 700, marginTop: "var(--space-2xl)", marginBottom: "var(--space-md)" }}>
                10. Changes to Privacy Policy
              </h2>
              <p style={{ marginBlockEnd: "var(--space-md)", lineHeight: "var(--lh-body)" }}>
                We may update this policy. Significant changes will be communicated to you via email or website notice.
              </p>

              <h2 style={{ fontSize: "var(--text-lg)", fontWeight: 700, marginTop: "var(--space-2xl)", marginBottom: "var(--space-md)" }}>
                11. Contact Us
              </h2>
              <p style={{ marginBlockEnd: "var(--space-2xl)", lineHeight: "var(--lh-body)" }}>
                For privacy concerns or requests, contact us at{" "}
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
