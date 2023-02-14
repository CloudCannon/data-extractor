import test from 'ava';
import extract from '../src/extract.js';

test('Extracts unique categories from nested posts', async (t) => {
	const categories = await extract('tests/fixtures/posts', {
		recursive: true,
		selector: '$.categories'
	});

	const expected = [
		'Cats',
		'Dogs',
		'Birds'
	];

	t.deepEqual(categories, expected);
});

test('Extracts titles from top-level pages', async (t) => {
	const titles = await extract('tests/fixtures', {
		selector: 'title',
		extension: ['md', 'html']
	});

	const expected = [
		'About us',
		'My page',
	];

	t.deepEqual(titles, expected);
});

