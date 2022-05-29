import * as artifact from '@actions/artifact';
import * as core from '@actions/core';
import { exec } from '@actions/exec';

async function run() {
  const input = core.getInput('input');
  const version = core.getInput('vivliostyle-version');
  const artifactName = core.getInput('artifact-name');

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

  const artifactClient = artifact.create();
  const uploadResult = await artifactClient.uploadArtifact(
    artifactName,
    ['.'], // TODO: Selective file upload
    '.'
  );
  core.setOutput('upload', uploadResult);
}

run();
