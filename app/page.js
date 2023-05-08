import styles from './page.module.sass'
import Pages from './components/pages'

import pagedata from './data/pagedata'

function Home() {
	console.log('asdf')
	return (
		<main className={styles.main}>
			<Pages pages={pagedata} columns={2} />
		</main>
	)
}

export default Home