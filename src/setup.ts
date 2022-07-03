import * as core from '@actions/core';
import { exec } from '@actions/exec';

async function setup() {
  const version = core.getInput('cli-version');

  await exec('docker', ['pull', `ghcr.io/vivliostyle/cli:${version}`]);
}

setup();
