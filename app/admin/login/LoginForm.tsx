"use client";

import React, { useState } from "react";
import { handleLoginAction } from "./actions";

export default function LoginForm({ error }: { error?: string }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
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
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              required
              className="w-full px-4 py-3 bg-bg-primary border border-border rounded-lg text-text-primary placeholder-text-tertiary focus:outline-none focus:border-ibm-blue transition-colors text-body-md"
              placeholder="••••••••"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary hover:text-text-primary transition-colors p-1"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" x2="22" y1="2" y2="22"/></svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
              )}
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-ibm-blue hover:bg-ibm-blue-hover text-white py-3 rounded-lg text-body-md font-semibold transition-colors shadow-sm"
        >
          Access Dashboard
        </button>
      </form>
    </>
  );
}
