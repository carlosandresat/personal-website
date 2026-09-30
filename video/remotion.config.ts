import { Config } from "@remotion/cli/config";

// Serve the site's own public/ so staticFile("Python.png") resolves to the
// exact asset the course page uses — nothing is copied into video/.
Config.setPublicDir("../public");
Config.setVideoImageFormat("jpeg");
// The 1px circuit grid smears at the default CRF; 18 keeps it crisp.
Config.setCrf(18);
Config.setOverwriteOutput(true);
