"use client";

import { useMemo, useState } from "react";
import Card from "./ui/card";

function normalizeText(value) {
  return String(value || "").trim().toLowerCase();
}

export default function MenuSearch({ sections, totalItems = 0 }) {
  const [query, setQuery] = useState("");
  const normalizedQuery = useMemo(() => normalizeText(query), [query]);
  const hasQuery = normalizedQuery.length > 0;

  const filteredSections = useMemo(() => {
    if (!hasQuery) {
      return sections;
    }

    return sections
      .map((section) => {
        const rows = section.rows.filter((row) => {
          const haystack = [
            row.name,
            row.size,
            row.description,
            section.label,
          ].map(normalizeText);

          return haystack.some((item) => item.includes(normalizedQuery));
        });

        if (!rows.length) {
          return null;
        }

        return {
          ...section,
          rows,
        };
      })
      .filter(Boolean);
  }, [sections, hasQuery, normalizedQuery]);

  const resultCount = useMemo(() => {
    if (!hasQuery) {
      return totalItems;
    }

    return filteredSections.reduce((acc, section) => acc + section.rows.length, 0);
  }, [hasQuery, filteredSections, totalItems]);

  const noResults = hasQuery && resultCount === 0;

  return (
    <>
      <div className="mt-4 rounded-[0.9rem] border border-line-soft/90 p-3 md:p-4">
        <label className="grid gap-2">
          <span className="text-sm font-medium text-ink-muted">Caută preparatul preferat</span>
          <div className="relative">
            <span
              aria-hidden
              className="pointer-events-none absolute left-3 top-1/2 z-10 -translate-y-1/2 text-ink-muted"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M15.5 15.5 21 21M10.8 18A7.2 7.2 0 1 1 18 10.8 7.2 7.2 0 0 1 10.8 18Z"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Ex: pui la jar, salată, cartofi..."
              className="jar-form-field touch-target w-full pl-10"
            />
            {hasQuery ? (
              <button
                type="button"
                aria-label="Șterge căutarea"
                onClick={() => setQuery("")}
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full border border-line-soft bg-surface-base px-2 py-1 text-xs font-semibold uppercase tracking-[0.08em] text-ink-muted transition hover:border-brand-500/55 hover:text-ink-title"
              >
                ×
              </button>
            ) : null}
          </div>
        </label>
        <p className="mt-2 text-xs text-ink-muted">
          {hasQuery
            ? `Am găsit ${resultCount} rezultat${resultCount === 1 ? "" : "e"} pentru „${query}”.`
            : `Îți prezentăm meniul complet: ${resultCount} preparate atent sortate.`}
        </p>
      </div>

      {noResults ? (
        <div className="rounded-lg border border-line-soft bg-surface-panel/65 px-4 py-4 text-ink-muted">
          Nu avem încă acest rezultat. Încearcă o altă formulare și găsim repede opțiunea potrivită.
        </div>
      ) : null}

      <div className="mt-4 grid gap-5 md:grid-cols-2">
        {filteredSections.map((section) => (
          <Card key={section.key} className="overflow-hidden">
            <h2 className="text-title-lg">{section.label}</h2>
            {section.rows.length === 0 ? (
              <p className="text-sm text-ink-muted">
                Nu sunt preparate disponibile în această secțiune.
              </p>
            ) : (
              <div className="mt-3 overflow-x-auto -mx-1 rounded-lg">
                <table className="menu-table text-left">
                  <thead>
                    <tr>
                      <th>Preparat</th>
                      <th>Descriere</th>
                      <th>Preț</th>
                    </tr>
                  </thead>
                  <tbody>
                    {section.rows.map((row, idx) => (
                      <tr key={`${row.name}-${row.size}-${row.price}-${idx}`}>
                        <td>{row.name}</td>
                        <td>
                          {row.description}
                          {row.size ? ` • ${row.size}` : ""}
                        </td>
                        <td>{row.price || "—"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </Card>
        ))}
      </div>
    </>
  );
}
