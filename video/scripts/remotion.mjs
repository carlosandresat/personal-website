import { spawnSync } from "node:child_process";

/** Runs the Remotion CLI, exiting on the first failure. */
export function remotion(args) {
  const { status } = spawnSync("pnpm", ["exec", "remotion", ...args], {
    stdio: "inherit",
    shell: true,
  });
  if (status !== 0) process.exit(status ?? 1);
}
