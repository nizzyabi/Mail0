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
        <h2 className="mb-4 text-2xl font-semibold">Data Collection and Usage</h2>

        <h3 className="mb-2 text-xl font-medium">Self-Hosted Instances</h3>
        <ul className="mb-4 list-disc pl-6">
          <li>When you self-host Mail0.io, your email data remains entirely under your control</li>
          <li>No data is sent to our servers or third parties without your explicit consent</li>
          <li>You maintain complete ownership and responsibility for your data</li>
        </ul>

        <h3 className="mb-2 text-xl font-medium">External Email Integration</h3>
        <p className="mb-4">When connecting external email providers (like Gmail):</p>
        <ul className="mb-4 list-disc pl-6">
          <li>We only store the necessary authentication tokens to maintain your connection</li>
          <li>We do not store copies of your emails on our servers</li>
          <li>All data transmission is encrypted using industry-standard protocols</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">Data We Don&apos;t Collect</h2>
        <ul className="mb-4 list-disc pl-6">
          <li>We do not track user behavior</li>
          <li>We do not sell or share your data with third parties</li>
          <li>We do not store unnecessary personal information</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">Security Measures</h2>
        <ul className="mb-4 list-disc pl-6">
          <li>End-to-end encryption for all email communications</li>
          <li>Secure authentication protocols</li>
          <li>Regular security audits and updates</li>
          <li>Open-source codebase for transparency and community review</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">Contact Us</h2>
        <p className="mb-4">For privacy-related questions or concerns:</p>
        <ul className="mb-4 list-disc pl-6">
          <li>Open an issue on our GitHub repository</li>
          <li>Contact our development team via GitHub</li>
        </ul>
      </section>
    </div>
  );
}
