import React from "react";
import LoginForm from "./LoginForm";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedParams = await searchParams;
  const error = resolvedParams?.error as string;

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-secondary px-6">
      <div className="w-full max-w-md bg-surface border border-border rounded-2xl p-8 shadow-lg">
        <div className="text-center mb-8">
          <h1 className="text-heading-lg text-text-primary font-bold">Admin Console</h1>
          <p className="text-body-sm text-text-secondary mt-1">
            Log in to manage publications, events, and societies.
          </p>
        </div>

        <LoginForm error={error} />

        <p className="text-center text-xs text-text-tertiary mt-8">
          Default credentials: admin / ieeeoutr2026
        </p>
      </div>
    </div>
  );
}
