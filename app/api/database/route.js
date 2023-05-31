import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const jsonDirectory = path.join(process.cwd(), 'data');
const pageDataString = fs.readFileSync(`${jsonDirectory}/page-data-processed.json`, 'utf8')

export async function GET(req) {
	const page = req.nextUrl.searchParams.get('page')
	let pageData = {}
	try {
		pageData = JSON.parse(pageDataString)
	} catch (e) {
		console.log({e})
	}

	const data = pageData[page]

	return NextResponse.json({content: data.content, above_fold: data.above_fold})
}