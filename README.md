# Data Extractor

Parses content files to generate a dataset. The output is sent to `stdout`, ready to pipe into a file for another process to consume.

[<img src="https://img.shields.io/npm/v/@cloudcannon%2Fdata-extractor?logo=npm" alt="version badge">](https://www.npmjs.com/package/@cloudcannon%2Fdata-extractor)
[<img src="https://img.shields.io/npm/dt/@cloudcannon%2Fdata-extractor" alt="downloads badge">](https://www.npmjs.com/package/@cloudcannon%2Fdata-extractor)

***

- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
- [Development](#development)
- [License](#license)


***

## Installation

```bash
npm install --global @cloudcannon/data-extractor
```

This gives you access to the `data-extractor` binary.

***

## Usage

```sh
data-extractor <path> [options]
```

To print usage details:

```sh
data-extractor --help

Parses content files to generate a dataset.

Usage
  $ data-extractor <path> [options]

Options
  --recursive, -r  Search folders recursively
  --no-recursive,  Prevents search folders recursively (default)
  --extension, -e  Allowed extension(s) to parse (default: 'md')
  --selector,  -s  JSON path to the data you want to parse (required)
  --verbose        Prints more debugging information
  --help           Prints this usage information
  --version        Prints the current version

Examples
  $ data-extractor content/posts -r -s '$.categories'
  $ data-extractor content -e md -e html -s 'seo.title'
```

***

## Examples

Create a file at `data/categories.json` containing the combined, unique values of `categories` from
the front matter of each file at `content/posts/**/*`:

```sh
data-extractor content/posts -r -s '$.categories' > data/categories.json
```

Create a file at `data/page-titles.json` containing the combined, unique values of `seo.title` from
the front matter of each Markdown and HTML file at `content/*`:

```sh
data-extractor content -e md -e html -s 'seo.title' > data/page-titles.json
```

***

## Development

Install dependencies:

```sh
npm i
```

Run tests:

```sh
npm test
npm run test:watch
npm run test:coverage
```

Lint code:

```sh
npm run lint
```

Link this package locally to test it on a site folder, then run it within your site folder:

```sh
npm link
cd ../my-ssg-site
data-extractor
```

## License

ISC
