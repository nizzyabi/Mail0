import React from "react";

export default function TermsOfService() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold">Terms of Service</h1>

      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">Overview</h2>
        <p className="mb-4">
          Mail0.io is an open-source email solution that enables users to self-host their email
          service or integrate with external email providers. By using Mail0.io, you agree to these
          terms.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">Service Description</h2>

        <h3 className="mb-2 text-xl font-medium">Self-Hosted Service</h3>
        <ul className="mb-4 list-disc pl-6">
          <li>Mail0.io provides software that users can deploy on their own infrastructure</li>
          <li>Users are responsible for their own hosting, maintenance, and compliance</li>
          <li>The software is provided &quot;as is&quot; under the MIT License</li>
        </ul>

        <h3 className="mb-2 text-xl font-medium">External Email Integration</h3>
        <ul className="mb-4 list-disc pl-6">
          <li>Mail0.io can integrate with third-party email providers</li>
          <li>Users must comply with third-party providers&apos; terms of service</li>
          <li>We are not responsible for third-party service disruptions</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">User Responsibilities</h2>
        <p className="mb-4">Users agree to:</p>
        <ul className="mb-4 list-disc pl-6">
          <li>Comply with all applicable laws and regulations</li>
          <li>Maintain the security of their instance</li>
          <li>Not use the service for spam or malicious purposes</li>
          <li>Respect intellectual property rights</li>
          <li>Report security vulnerabilities responsibly</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">Software License</h2>
        <p className="mb-4">Mail0.io is licensed under the MIT License:</p>
        <ul className="mb-4 list-disc pl-6">
          <li>Users can freely use, modify, and distribute the software</li>
          <li>The software comes with no warranties</li>
          <li>Users must include the original license and copyright notice</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">Community Guidelines</h2>
        <p className="mb-4">Users participating in our community agree to:</p>
        <ul className="mb-4 list-disc pl-6">
          <li>Follow our code of conduct</li>
          <li>Contribute constructively to discussions</li>
          <li>Respect other community members</li>
          <li>Report inappropriate behavior</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">Contact Information</h2>
        <p className="mb-4">For questions about these terms:</p>
        <ul className="mb-4 list-disc pl-6">
          <li>Open an issue on our GitHub repository</li>
          <li>Contact our development team via GitHub</li>
        </ul>
      </section>
    </div>
  );
}
