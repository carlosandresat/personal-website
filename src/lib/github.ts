const FALLBACK_CONTRIBUTIONS = 500;

type GithubContributionsResponse = {
  total?: Record<string, number>;
};

// Mirrors the same data GitHub renders in the "contributions in the last
// year" element on a profile page, without scraping HTML.
export async function getGithubContributions(username: string): Promise<number> {
  try {
    const res = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${username}?y=last`,
      {
        next: { revalidate: 60 * 60 * 24 },
        signal: AbortSignal.timeout(5000),
      }
    );

    if (!res.ok) return FALLBACK_CONTRIBUTIONS;

    const data: GithubContributionsResponse = await res.json();
    return data.total?.lastYear ?? FALLBACK_CONTRIBUTIONS;
  } catch {
    return FALLBACK_CONTRIBUTIONS;
  }
}
