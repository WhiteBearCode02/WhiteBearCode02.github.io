import { execFileSync } from "node:child_process";
import { readFile, readdir } from "node:fs/promises";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = fileURLToPath(new URL("../", import.meta.url));

// Both local checks and CI use the same repository-root contract.
export async function verifyProject(root = projectRoot) {
  const errors = [];
  const manifests = {};
  for (const file of ["package.json", "package-lock.json"]) {
    try {
      manifests[file] = JSON.parse(await readFile(resolve(root, file), "utf8"));
      try {
        execFileSync("git", ["ls-files", "--error-unmatch", "--", file], {
          cwd: root,
          stdio: "pipe",
        });
      } catch {
        errors.push(`${file} must be tracked by Git.`);
      }
    } catch (error) {
      errors.push(
        error.code === "ENOENT"
          ? `${file} is missing from the repository root.`
          : `${file} could not be read as valid JSON.`,
      );
    }
  }

  const manifest = manifests["package.json"];
  if (manifest) {
    const dependencies = {
      ...manifest.devDependencies,
      ...manifest.dependencies,
    };
    if (!dependencies.next)
      errors.push("package.json must declare the existing Next.js dependency.");
    if (!manifest.scripts?.build)
      errors.push("package.json must define a build script.");
  }

  const routeRoots = ["app", "src/app", "pages", "src/pages"];
  let hasRouteSource = false;
  const tracked = execFileSync("git", ["ls-files", "-z"], {
    cwd: root,
    encoding: "utf8",
  }).split("\0");
  for (const directory of routeRoots) {
    try {
      const files = await readdir(resolve(root, directory), {
        recursive: true,
      });
      const sourceFiles = files
        .map((file) => `${directory}/${file.replaceAll("\\", "/")}`)
        .filter((file) => /\.(?:tsx?|jsx?|mdx)$/.test(file));
      if (!sourceFiles.length) continue;
      hasRouteSource = true;
      const untracked = sourceFiles.filter((file) => !tracked.includes(file));
      if (untracked.length)
        errors.push(
          `Route source files must be tracked by Git: ${untracked.join(", ")}`,
        );
    } catch (error) {
      if (error.code !== "ENOENT")
        errors.push(`Could not inspect ${directory}.`);
    }
  }
  if (!hasRouteSource)
    errors.push(
      "No Next.js route source found in app/, src/app/, pages/, or src/pages/.",
    );

  if (errors.length) {
    throw new Error(
      `Project is not ready for deployment:\n${errors.map((error) => `- ${error}`).join("\n")}\nRestore the existing portfolio source and commit its manifests and routes before deploying.`,
    );
  }
  console.log(
    "Verified Git-tracked manifests and Next.js route source. Run npm ci and npm run build next.",
  );
}

if (
  process.argv[1] &&
  resolve(process.argv[1]) === fileURLToPath(import.meta.url)
) {
  verifyProject().catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
  });
}
