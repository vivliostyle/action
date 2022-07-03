import * as core from '@actions/core';

async function run() {
  const { build } =
    require('@vivliostyle/cli/dist/index.js') as typeof import('@vivliostyle/cli/dist/index.js');
  const { getFullConfig } =
    require('@vivliostyle/cli/dist/build.js') as typeof import('@vivliostyle/cli/dist/build.js');

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
