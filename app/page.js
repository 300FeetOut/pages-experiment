import styles from './[...slug]/page.module.sass'
import Pages from '@/components/pages'

import pagedata from '@/data/pagedata.js'

function Page() {
	return (
		<main className={styles.main}>
			<Pages pages={pagedata} columns={2} page={0} />
		</main>
	)
}

export default Page