#!/usr/bin/env node

import meow from 'meow';
import extract from './extract.js';

const cli = meow(`
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
	  $ data-extractor content -r -s '$.categories'
	  $ data-extractor content -e md -e html -s 'seo.title'
`, {
	importMeta: import.meta,
	flags: {
		recursive: {
			type: 'boolean',
			default: false,
			alias: 'r'
		},
		verbose: {
			type: 'boolean',
			default: false
		},
		extension: {
			type: 'string',
			isMultiple: true,
			default: ['md'],
			alias: 'e'
		},
		selector: {
			type: 'string',
			isRequired: true,
			alias: 's'
		}
	}
});

const dataset = await extract(cli.input[0], cli.flags);
console.log(JSON.stringify(dataset, null, '\t'));
