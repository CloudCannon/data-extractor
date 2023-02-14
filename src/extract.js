import { fdir } from 'fdir';
import { readFile } from 'fs/promises';
import matter from 'gray-matter';
import jp from 'jsonpath';

export default async function extract(path, options) {
	const exts = options?.extension || ['md'];

	let crawler = new fdir()
		.filter((path, isDirectory) => !isDirectory && exts.some((ext) => path.endsWith(`.${ext}`)))
		.withBasePath()
		.withDirs();

	if (!options?.recursive) {
		crawler = crawler.withMaxDepth(0);
	}

	console.error(`🔍 Searching ${path}`);

	const filePaths = await crawler
		.crawl(path)
		.withPromise();

	console.error(`📁 Found ${path} files`);

	if (options?.verbose) {
		console.error(filePaths);
	}

	const data = await filePaths.reduce(async (memo, filePath) => {
		const raw = await readFile(filePath, 'utf8');
		const parsed = matter(raw);
		const selectedData = jp.query(parsed.data, options?.selector)?.[0];

		const processed = Array.isArray(selectedData)
			? selectedData
			: [selectedData];

		return selectedData
			? (await memo).concat(processed)
			: await memo;
	}, []);

	const dataset = [...new Set(data)];

	console.error(`✅ Extracted dataset with ${dataset.length} entries`);

	if (options?.verbose) {
		console.error(dataset);
	}

	return dataset;
}
