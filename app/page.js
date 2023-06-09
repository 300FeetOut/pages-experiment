import styles from './[...slug]/page.module.sass'
import Pages from '@/components/pages'
import config from './config'

import pagedata from '@/data/pagedata.js'

async function Page() {
	const pageNumber = 0

	// Statically fetch the page data for each route so the initial load is as fast as possible.
	const response = await fetch(`${config.url}/api/database?page=${pageNumber}`)
	let responseJson = {}
	try {
		responseJson = await response.json()
		pagedata[pageNumber] = {...pagedata[pageNumber], ...responseJson}
	} catch (e) {}

	return (
		<main className={styles.main}>
			<Pages pages={pagedata} columns={2} page={pageNumber} />
		</main>
	)
}
export default Page