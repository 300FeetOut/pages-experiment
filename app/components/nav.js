import { useState } from "react"
import slugify from "slugify"

import styles from './nav.module.sass'

export default function Nav({updatePage, currentPage, pagedata}) {
	const [activePage, setActivePage] = useState(currentPage || 0)

	function navigate(page, i) {
		const state = {}
		const url = slugify(page.title.toLowerCase())
		history.pushState(state, "", url)
		setActivePage(i)
		updatePage(i)
	}

	return <div className={styles.nav}>
		{pagedata.map((page, i) => {
			return <a key={`nav_${i}`} className={i == activePage ? styles.active : ''} onClick={navigate.bind(null, page, i)}>
				{page.title}
			</a>
		})}
	</div>
}