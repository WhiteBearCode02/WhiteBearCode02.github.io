const repository = process.env.GITHUB_REPOSITORY;
if (!repository || !/^[\w.-]+\/[\w.-]+$/.test(repository)) {
  throw new Error("GITHUB_REPOSITORY must identify the deployment repository.");
}

const headers = {
  Accept: "application/vnd.github+json",
  "X-GitHub-Api-Version": "2022-11-28",
};
if (process.env.GH_TOKEN) {
  headers.Authorization = `Bearer ${process.env.GH_TOKEN}`;
}

try {
  const response = await fetch(
    `https://api.github.com/repos/${repository}/pages`,
    { headers, signal: AbortSignal.timeout(15000) },
  );
  if (!response.ok) {
    throw new Error(`Cannot verify GitHub Pages settings (HTTP ${response.status}).`);
  }
  const settings = await response.json();
  if (settings.build_type !== "workflow") {
    throw new Error(
      `Settings > Pages > Build and deployment > Source must be GitHub Actions. ` +
        `Branch-based Jekyll deployment can overwrite the portfolio with README. ` +
        `Change the setting at https://github.com/${repository}/settings/pages and rerun this workflow.`,
    );
  }
  console.log("Verified GitHub Actions publishing source; legacy Jekyll publishing is disabled.");
} catch (error) {
  console.error(`::error title=GitHub Pages publishing source::${error.message}`);
  process.exitCode = 1;
}
