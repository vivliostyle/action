import * as core from '@actions/core';
import { build } from '@vivliostyle/cli';
import { getFullConfig } from '@vivliostyle/cli/dist/build.js';

async function run() {
  const input = core.getInput('input');
  const version = core.getInput('cli-version');
  const cliConfig = {
    input,
    // Forcible set docker mode
    renderMode: 'docker',
    image: `ghcr.io/vivliostyle/cli:${version}`,
  } as const;

  const config = await getFullConfig(cliConfig);
  const artifactPath = config.flatMap((c) => c.outputs.map((o: any) => o.path));
  await core.group('Artifacts to upload', async () => {
    artifactPath.forEach((p) => core.info(p));
  });
  core.setOutput('artifactPath', artifactPath.join('\n'));

  await build(cliConfig);
}

run();
