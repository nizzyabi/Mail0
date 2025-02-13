import React from "react";

export default function PrivacyPolicy() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold">Privacy Policy</h1>

      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">Our Commitment to Privacy</h2>
        <p className="mb-4">
          At Mail0.io, we believe that privacy is a fundamental right. Our open-source email
          solution is built with privacy at its core, and we&apos;re committed to being transparent
          about how we handle your data.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">Google Account Integration</h2>
        <p className="mb-4">When you use Mail0.io with your Google Account:</p>
        <ul className="mb-4 list-disc pl-6">
          <li>We request access to your Gmail data only after receiving your explicit consent</li>
          <li>We access only the necessary Gmail API scopes required for email functionality</li>
          <li>Your Google account credentials are never stored on our servers</li>
          <li>We use secure OAuth 2.0 authentication provided by Google</li>
          <li>
            You can revoke our access to your Google account at any time through your Google Account
            settings
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">Data Collection and Usage</h2>
        <h3 className="mb-2 text-xl font-medium">Google Services Data Handling</h3>
        <ul className="mb-4 list-disc pl-6">
          <li>Email data is processed in accordance with Google API Services User Data Policy</li>
          <li>
            We only process and display email data - we don&apos;t store copies of your emails
          </li>
          <li>
            All data transmission between our service and Google is encrypted using
            industry-standard protocols
          </li>
          <li>
            We maintain limited temporary caches only as necessary for application functionality
          </li>
        </ul>

        <h3 className="mb-2 text-xl font-medium">Self-Hosted Instances</h3>
        <ul className="mb-4 list-disc pl-6">
          <li>When you self-host Mail0.io, your email data remains entirely under your control</li>
          <li>No data is sent to our servers or third parties without your explicit consent</li>
          <li>You maintain complete ownership and responsibility for your data</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">Data Protection and Security</h2>
        <ul className="mb-4 list-disc pl-6">
          <li>End-to-end encryption for all email communications</li>
          <li>Secure OAuth 2.0 authentication for Google services</li>
          <li>Regular security audits and updates</li>
          <li>Open-source codebase for transparency and community review</li>
          <li>Compliance with Google API Services User Data Policy</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">Limited Use Disclosure</h2>
        <p className="mb-4">
          Our use and transfer to any other app of information received from Google APIs will adhere
          to the{" "}
          <a
            href="https://developers.google.com/terms/api-services-user-data-policy"
            className="text-blue-600 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Google API Services User Data Policy
          </a>
          , including the Limited Use requirements.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">Your Rights and Controls</h2>
        <ul className="mb-4 list-disc pl-6">
          <li>Right to revoke access to your Google account at any time</li>
          <li>Right to request deletion of any cached data</li>
          <li>Right to export your data</li>
          <li>Right to lodge complaints about data handling</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">Contact Us</h2>
        <p className="mb-4">For privacy-related questions or concerns:</p>
        <ul className="mb-4 list-disc pl-6">
          <li>Email: privacy@mail0.io</li>
          <li>Open an issue on our GitHub repository</li>
          <li>Contact our development team via GitHub</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">Updates to This Policy</h2>
        <p className="mb-4">
          We may update this privacy policy from time to time. We will notify users of any material
          changes through our application or website.
        </p>
        <p>Last updated: {new Date().toLocaleDateString()}</p>
      </section>
    </div>
  );
}
