import styles from './[...slug]/page.module.sass'
import Pages from '@/components/pages'

import pagedata from '@/data/pagedata.js'

async function Page() {
	const pageNumber = 0

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