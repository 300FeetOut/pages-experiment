import styles from './page.module.sass'
import Pages from '@/components/pages'

import pagedata from '@/data/pagedata.js'
import slugify from 'slugify'

function Page({params}) {
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
	
	return (
		<main className={styles.main}>
			<Pages pages={pagedata} columns={2} page={getPageNumber(params.slug)} />
		</main>
	)
}

export default Page