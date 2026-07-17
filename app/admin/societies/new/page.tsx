import Link from "next/link";
import { createSocietyAction } from "../actions";

export default function NewSocietyPage() {
  return (
    <div className="max-w-2xl">
      <div className="mb-8">
        <Link href="/admin/societies" className="text-body-sm text-ibm-blue hover:underline mb-2 block">
          ← Back to Societies
        </Link>
        <h1 className="text-display-md text-text-primary">Add New Society</h1>
      </div>

      <div className="bg-surface border border-border rounded-xl p-8 shadow-sm">
        <form action={createSocietyAction} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <label className="block text-mono-sm text-text-secondary uppercase mb-2 font-medium">
                Society Name
              </label>
              <input
                type="text"
                name="name"
                required
                className="w-full px-4 py-2.5 bg-bg-primary border border-border rounded-lg text-text-primary focus:outline-none focus:border-ibm-blue transition-colors text-body-md"
                placeholder="e.g. IEEE Computer Society"
              />
            </div>

            <div>
              <label className="block text-mono-sm text-text-secondary uppercase mb-2 font-medium">
                Abbreviation
              </label>
              <input
                type="text"
                name="abbr"
                required
                className="w-full px-4 py-2.5 bg-bg-primary border border-border rounded-lg text-text-primary focus:outline-none focus:border-ibm-blue transition-colors text-body-md uppercase"
                placeholder="e.g. CS"
              />
            </div>
          </div>

          <div>
            <label className="block text-mono-sm text-text-secondary uppercase mb-2 font-medium">
              Accent Color (CSS Value)
            </label>
            <select
              name="accentColor"
              className="w-full px-4 py-2.5 bg-bg-primary border border-border rounded-lg text-text-primary focus:outline-none focus:border-ibm-blue transition-colors text-body-md"
            >
              <option value="var(--color-ibm-blue)">IBM Blue (Default)</option>
              <option value="var(--color-ibm-purple)">IBM Purple</option>
              <option value="var(--color-ibm-teal)">IBM Teal</option>
              <option value="var(--color-ibm-magenta)">IBM Magenta</option>
              <option value="var(--color-ibm-gray)">IBM Gray</option>
            </select>
          </div>

          <div>
            <label className="block text-mono-sm text-text-secondary uppercase mb-2 font-medium">
              Description
            </label>
            <textarea
              name="description"
              required
              rows={4}
              className="w-full px-4 py-2.5 bg-bg-primary border border-border rounded-lg text-text-primary focus:outline-none focus:border-ibm-blue transition-colors text-body-md"
              placeholder="e.g. Focuses on technical excellence in computer science, software engineering..."
            />
          </div>

          <div className="flex justify-end gap-4 pt-4 border-t border-border">
            <Link
              href="/admin/societies"
              className="px-5 py-2.5 border border-border rounded-lg text-body-md font-semibold text-text-secondary hover:bg-bg-secondary transition-colors"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="px-5 py-2.5 bg-ibm-blue hover:bg-ibm-blue-hover text-white rounded-lg text-body-md font-semibold transition-colors shadow-sm"
            >
              Create Society
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
