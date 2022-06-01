import path from 'path';
import * as core from '@actions/core';
import { build, BuildCliFlags } from '@vivliostyle/cli';
import {
  collectVivliostyleConfig,
  mergeConfig,
  MergedConfig,
} from '@vivliostyle/cli/dist/config.js';

// TODO: Export this function as official API
async function getFullConfig(cliFlags: BuildCliFlags): Promise<MergedConfig[]> {
  const loadedConf = collectVivliostyleConfig(cliFlags);
  const { vivliostyleConfig, vivliostyleConfigPath } = loadedConf;
  cliFlags = loadedConf.cliFlags;

  const context = vivliostyleConfig
    ? path.dirname(vivliostyleConfigPath)
    : process.cwd();

  const configEntries: MergedConfig[] = [];
  for (const entry of vivliostyleConfig ?? [vivliostyleConfig]) {
    const config = await mergeConfig(cliFlags, entry, context);
    configEntries.push(config);
  }
  return configEntries;
}

async function run() {
  const input = core.getInput('input');
  const version = core.getInput('vivliostyle-version');
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
