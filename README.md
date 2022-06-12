# GitHub Action for Vivliostyle CLI

Use this action if you want to automate the build task of Vivliostyle CLI. Combine this GitHub Action with your GitHub repository to enable continuous documentation generation and publication builds!

## Usage

Please refer [the Vivliostyle CLI documentation](https://github.com/vivliostyle/vivliostyle-cli) for the details of `vivliostyle.config.js`, which works internally on this action.

### Build single PDF file from `input.html`

```yml
jobs:
  vivliostyle-build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: vivliostyle/action@v1
        with:
          input: index.html
          if-no-files-found: error
```

### Build with `vivliostyle.config.js` and save artifacts as `my-book`

```yml
jobs:
  vivliostyle-build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: vivliostyle/action@v1
        with:
          input: vivliostyle.config.js
          vivliostyle-version: 5
          artifact-name: artifact-markdown
          if-no-files-found: error
```

## Action inputs

| Name | Description | Default |
|---|---|---|
| `input` | An input file or location of Vivliostyle config file. | `.` (Looks vivliostyle.config.js in root directory automatically) |
| `vivliostyle-version` | Using version of Vivliostyle CLI. | `latest` |
| `artifact-name` | Artifact name to upload built files. | `vivliostyle-artifact` |
| `if-no-files-found` | The desired behavior if no files are found to upload artifacts. (Available Options: `warn` `error` `ignore`) | `warn` |
| `retention-days` | Duration after which artifact will expire in days. 0 means using default retention. Minimum 1 day. Maximum 90 days unless changed from the repository settings page. | - |

## Maintainer

- [spring-raining](https://github.com/spring-raining)
