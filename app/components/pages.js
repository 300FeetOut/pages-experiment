"use client"

import { useEffect, useState } from 'react'
import Page from './page'
import styles from './pages.module.sass'
import Nav from './nav'

export default function Pages({pages, page, columns}) {
	const [currentPage, setCurrentPage] = useState(page || 0)

	function getPageX() {
		const col = currentPage%columns
		return (-col * 100) + 'vw'
	}

	function getPageY() {
		const row = Math.floor(currentPage/columns)
		return (-row * 100) + 'vh'
	}

	return <div className={styles.pages}>
		<Nav pagedata={pages} updatePage={setCurrentPage} currentPage={currentPage} />

		<div className={styles.pages_inner} style={{width: `${columns}00vw`, transform: `translate(${getPageX()}, ${getPageY()})`}}>
			{pages.map((page, i) => {
				return <Page key={`page_${i}`} active={i == currentPage} title={page.title} content={page.content} aboveFold={page.above_fold} color={page.color}></Page>
			})}
		</div>
	</div>
}