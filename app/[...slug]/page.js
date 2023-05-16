import styles from './page.module.sass'
import Pages from '@/components/pages'

import pagedata from '@/data/pagedata.js'
import slugify from 'slugify'

async function Page({params}) {
	function getPageNumber(slug) {
		const compareSlug = slug.join('/')
		let foundPage = 0
		pagedata.map((page, i) => {
			if (slugify(page.title.toLowerCase()) == compareSlug) {
				foundPage = i
			}
		})
		return foundPage
	}

	const pageNumber = getPageNumber(params.slug)

	// Statically fetch the page data for each route so the initial load is as fast as possible.
	const response = await fetch(`/api/database?page=${pageNumber}`)
	const responseJson = await response.json()
	pagedata[pageNumber] = {...pagedata[pageNumber], ...responseJson}

	return (
		<main className={styles.main}>
			<Pages pages={pagedata} columns={2} page={pageNumber} />
		</main>
	)
}

export default Page