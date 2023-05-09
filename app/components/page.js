"use client"

import classNames from 'classnames'
import styles from './page.module.sass'
import { useEffect, useState} from 'react'

export default function Page({title, aboveFold, content, color, active}) {
	const [activeAfterTimeout,  setActiveAfterTimeout] = useState(false)

	useEffect(() => {
		if (active) {
			setTimeout(() => {
				setActiveAfterTimeout(true)
			}, 250)
		} else {
			setActiveAfterTimeout(false)
		}
	}, [active])

	return <div className={classNames(styles.page, activeAfterTimeout ? styles.active : '')} style={{backgroundColor: color}}>
		<div className={styles.outer_page}>
			<div className={styles.inner_page}>
				<h1>{title}</h1>
				{aboveFold}
				{active && content}
			</div>
		</div>
	</div>
}