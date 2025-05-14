
import React from "react";
import { Link } from "react-router-dom";

const QuickAccessCard = ({
  title,
  description,
  icon,
  linkText,
  linkUrl,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  linkText: string;
  linkUrl: string;
}) => {
  return (
    <div className="bg-card border rounded-lg p-6 flex flex-col">
      <div className="mb-4 text-primary">{icon}</div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground mb-4 flex-grow">{description}</p>
      <Link
        to={linkUrl}
        className="text-primary hover:underline font-medium text-sm flex items-center"
      >
        {linkText} →
      </Link>
    </div>
  );
};

const FeatureTag = ({
  label,
  color,
}: {
  label: string;
  color: "green" | "blue" | "amber";
}) => {
  const colorClasses = {
    green: "bg-green-100 text-green-800",
    blue: "bg-blue-100 text-blue-800",
    amber: "bg-amber-100 text-amber-800",
  };

  return (
    <span
      className={`text-xs font-medium px-2 py-1 rounded ${colorClasses[color]}`}
    >
      {label}
    </span>
  );
};

const FeatureItem = ({
  tag,
  tagColor,
  title,
  description,
}: {
  tag: string;
  tagColor: "green" | "blue" | "amber";
  title: string;
  description: string;
}) => {
  return (
    <div className="mb-4">
      <div className="mb-1">
        <FeatureTag label={tag} color={tagColor} />
      </div>
      <h3 className="font-medium mb-1">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
};

const DocsSection = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      <div className="border-t pt-4">{children}</div>
    </div>
  );
};

const DocsLandingPage = () => {
  return (
    <div className="max-w-[1400px] mx-auto px-4">
      <div className="py-16 text-center bg-primary/5 rounded-lg mb-16">
        <h1 className="text-4xl font-bold mb-4">Cura Agent Documentation</h1>
        <p className="text-xl max-w-3xl mx-auto text-muted-foreground">
          Comprehensive guides, API reference, and resources to help you build with Cura Agent
        </p>
        <div className="mt-8">
          <div className="max-w-lg mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search documentation..."
                className="w-full px-4 py-3 rounded-lg border"
              />
              <span className="absolute right-3 top-3 text-muted-foreground">⌘ K</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-16">
        <h2 className="text-2xl font-semibold mb-6 text-center">Quick Access</h2>
        <p className="text-center text-muted-foreground mb-8">
          Jump to the most important sections of our documentation
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <QuickAccessCard
            title="Getting Started"
            description="Learn the basics and set up your first Cura Agent project"
            icon={<span className="text-2xl">📚</span>}
            linkText="Start Learning"
            linkUrl="/docs/getting-started/introduction"
          />
          <QuickAccessCard
            title="API Reference"
            description="Detailed information about endpoints, parameters, and responses"
            icon={<span className="text-2xl">⚙️</span>}
            linkText="Explore API"
            linkUrl="/docs/api/authentication"
          />
          {/* <QuickAccessCard
            title="Components"
            description="Browse our library of UI components with examples and usage guidelines"
            icon={<span className="text-2xl">🧩</span>}
            linkText="View Components"
            linkUrl="/docs/components/buttons"
          /> */}
        </div>
      </div>

      <div className="mb-16">
        <h2 className="text-2xl font-semibold mb-6">What's New</h2>
        <div className="bg-card border rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Latest Updates and Improvements to Cura Agent</h3>
            <span className="text-xs text-muted-foreground">Updated May 10, 2025</span>
          </div>

          <div>
            <FeatureItem
              tag="NEW"
              tagColor="green"
              title="Enhanced User Friendly Interface"
              description="Improved user interface with a focus on usability and accessibility."
            />
            <FeatureItem
              tag="IMPROVED"
              tagColor="blue"
              title="User Experience Shortcuts"
              description="Added keyboard shortcuts for common actions to speed up workflows."

            />
            <FeatureItem
              tag="FIXED"
              tagColor="amber"
              title="SignIn/SignUp Bug Fixes"
              description="Resolved issues with the sign-in and sign-up processes."

            />
          </div>

          <div className="mt-4">
            <Link
              to="/docs/releases"
              className="text-primary hover:underline text-sm"
            >
              View full changelog
            </Link>
          </div>
        </div>
      </div>
      {/* 
      <div className="mb-16">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Browse Documentation
        </h2>
        <p className="text-center text-muted-foreground mb-8">
          Explore our comprehensive documentation organized by category
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <DocsSection title="Core Concepts">
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <span className="text-green-600">●</span>
                <Link to="/docs/concepts/architecture" className="hover:text-primary">
                  Architecture Overview
                </Link>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-600">●</span>
                <Link to="/docs/concepts/data-models" className="hover:text-primary">
                  Core Models
                </Link>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-600">●</span>
                <Link to="/docs/concepts/authentication" className="hover:text-primary">
                  Authentication System
                </Link>
              </li>
            </ul>
            <Link
              to="/docs/concepts"
              className="mt-4 block text-primary text-sm hover:underline"
            >
              Learn more →
            </Link>
          </DocsSection>

          <DocsSection title="Tutorials">
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <span className="text-blue-600">●</span>
                <Link to="/docs/tutorials/getting-started" className="hover:text-primary">
                  Building Your First Agent
                </Link>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-blue-600">●</span>
                <Link to="/docs/tutorials/custom-integrations" className="hover:text-primary">
                  Custom Integrations
                </Link>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-blue-600">●</span>
                <Link to="/docs/tutorials/deployment" className="hover:text-primary">
                  Deployment Strategies
                </Link>
              </li>
            </ul>
            <Link
              to="/docs/tutorials"
              className="mt-4 block text-primary text-sm hover:underline"
            >
              View tutorials →
            </Link>
          </DocsSection>

          <DocsSection title="API Reference">
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <span className="text-amber-600">●</span>
                <Link to="/docs/api/rest-api" className="hover:text-primary">
                  REST API Overview
                </Link>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-amber-600">●</span>
                <Link to="/docs/api/graphql-schema" className="hover:text-primary">
                  GraphQL Schema
                </Link>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-amber-600">●</span>
                <Link to="/docs/api/webhooks" className="hover:text-primary">
                  Webhooks
                </Link>
              </li>
            </ul>
            <Link
              to="/docs/api"
              className="mt-4 block text-primary text-sm hover:underline"
            >
              View API docs →
            </Link>
          </DocsSection>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <DocsSection title="UI Components">
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <span className="text-purple-600">●</span>
                <Link to="/docs/components/form-controls" className="hover:text-primary">
                  Form Controls
                </Link>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-purple-600">●</span>
                <Link to="/docs/components/data-visualization" className="hover:text-primary">
                  Data Visualization
                </Link>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-purple-600">●</span>
                <Link to="/docs/components/layout-templates" className="hover:text-primary">
                  Layout Templates
                </Link>
              </li>
            </ul>
            <Link
              to="/docs/components"
              className="mt-4 block text-primary text-sm hover:underline"
            >
              Browse components →
            </Link>
          </DocsSection>

          <DocsSection title="Troubleshooting">
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <span className="text-red-600">●</span>
                <Link to="/docs/troubleshooting/common-errors" className="hover:text-primary">
                  Common Error Codes
                </Link>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-red-600">●</span>
                <Link to="/docs/troubleshooting/debugging" className="hover:text-primary">
                  Debugging Techniques
                </Link>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-red-600">●</span>
                <Link to="/docs/troubleshooting/performance" className="hover:text-primary">
                  Performance Issues
                </Link>
              </li>
            </ul>
            <Link
              to="/docs/troubleshooting"
              className="mt-4 block text-primary text-sm hover:underline"
            >
              Get help →
            </Link>
          </DocsSection>
        </div>
      </div> */}

      {/* <div className="mb-16 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-8">
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-4">Join Our Developer Community</h2>
            <p className="mb-6">
              Connect with other developers, share your projects, and get help from the Cura Agent team. Our community forum is the perfect place to ask questions and collaborate.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/community"
                className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
              >
                Join Community
              </Link>
              <Link
                to="https://github.com/cura-agent"
                className="bg-white text-foreground px-4 py-2 border rounded-md hover:bg-accent/50 transition-colors flex items-center gap-2"
              >
                <span>GitHub Repository</span>
              </Link>
            </div>
          </div>
          <div className="flex-1">
            <img
              src="/placeholder.svg"
              alt="Community illustration"
              className="max-w-full"
            />
          </div>
        </div>
      </div> */}

      {/* <div className="mb-16">
        <h2 className="text-2xl font-semibold mb-6 text-center">Stay Updated</h2>
        <div className="max-w-lg mx-auto text-center">
          <p className="mb-6 text-muted-foreground">
            Subscribe to our newsletter to receive the latest updates, documentation changes, and feature announcements
          </p>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 rounded-md border"
            />
            <button className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition-colors">
              Subscribe
            </button>
          </div>
          <p className="mt-2 text-xs text-muted-foreground">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </div> */}
    </div>
  );
};

export default DocsLandingPage;
