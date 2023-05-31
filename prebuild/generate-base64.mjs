import fs from 'fs'
import {encode} from 'node-base64-image'

import pageData from '../data/page-data.mjs'

async function base64encode(url) {
	const options = {
		string: true,
		headers: {
			"User-Agent": "my-app"
		}
	}
	
	const image = await encode(url, options)
	return 'data:image/png;base64,' + image
}

async function generateBase64Images(string) {
	let matches = string.matchAll(/blurDataURL="(.*?)"/g)
	matches = [...matches]

	await Promise.all(matches.map(async (match) => {
		const url = match[1]
		const base64 = await base64encode(url)
		string = string.replace(url, base64)
	}))

	return string
}

const processedPageContent = await Promise.all(pageData.map(async (page) => {
	const content = await generateBase64Images(page.content)
	const above_fold = await generateBase64Images(page.above_fold)

	page.content = content
	page.above_fold = above_fold

	return page
}))

fs.writeFileSync(`./data/page-data-processed.json`, JSON.stringify(processedPageContent))
