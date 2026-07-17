import React from "react";
import { handleLoginAction } from "./actions";

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

        {error && (
          <div className="mb-6 p-3 bg-red-500/10 border border-red-500/20 text-red-500 rounded-lg text-body-sm text-center">
            {error}
          </div>
        )}

        <form action={handleLoginAction} className="space-y-6">
          <div>
            <label className="block text-mono-sm text-text-secondary uppercase mb-2 font-medium">
              Username
            </label>
            <input
              type="text"
              name="username"
              required
              className="w-full px-4 py-3 bg-bg-primary border border-border rounded-lg text-text-primary placeholder-text-tertiary focus:outline-none focus:border-ibm-blue transition-colors text-body-md"
              placeholder="e.g. admin"
            />
          </div>

          <div>
            <label className="block text-mono-sm text-text-secondary uppercase mb-2 font-medium">
              Password
            </label>
            <input
              type="password"
              name="password"
              required
              className="w-full px-4 py-3 bg-bg-primary border border-border rounded-lg text-text-primary placeholder-text-tertiary focus:outline-none focus:border-ibm-blue transition-colors text-body-md"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-ibm-blue hover:bg-ibm-blue-hover text-white py-3 rounded-lg text-body-md font-semibold transition-colors shadow-sm"
          >
            Access Dashboard
          </button>
        </form>

        <p className="text-center text-xs text-text-tertiary mt-8">
          Default credentials: admin / ieeeoutr2026
        </p>
      </div>
    </div>
  );
}
