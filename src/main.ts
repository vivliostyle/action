import * as core from '@actions/core';
import { exec } from '@actions/exec';

async function run() {
  const input = core.getInput('input');
  const version = core.getInput('vivliostyle-version');

  await exec('npx', [
    '@vivliostyle/cli',
    'build',
    input,
    // Forcible set docker mode
    '--render-mode',
    'docker',
    '--image',
    `ghcr.io/vivliostyle/cli:${version}`,
  ]);
}

run();
