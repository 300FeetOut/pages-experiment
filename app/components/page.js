"use client"

import classNames from 'classnames'
import styles from './page.module.sass'
import { useEffect, useState} from 'react'

import JsxParser from 'react-jsx-parser'

import Image from 'next/image'
import { render } from 'react-dom'

export default function Page({aboveFoldPreloaded = '', contentPreloaded = '', pageNumber, title, color, active}) {
	const [activeAfterTimeout,  setActiveAfterTimeout] = useState(true)

	const initialPage = aboveFoldPreloaded || contentPreloaded ? true : false

	// Prepopulate aboveFold/content with preloaded data if it exists
	const [aboveFold, setAboveFold] = useState(aboveFoldPreloaded ? renderJsx(aboveFoldPreloaded) : '')
	const [content, setContent] = useState(contentPreloaded ? renderJsx(contentPreloaded) : '')

	function renderJsx(jsx) {
		return <JsxParser
			components={{Image}}
			jsx={jsx}
			disableFragments={false}
			renderInWrapper={false}
		/>
	}

	useEffect(() => {
		// use/fetch don't currently work properly in client components in next13, so we are using useEffect hook to work around.'
		async function fetchData() {
			const response = await fetch(`http://localhost:3000/api/database?page=${pageNumber}`)
			const responseJson = await response.json()

			const aboveFoldJsx = renderJsx(responseJson.above_fold)
			const contentJsx = renderJsx(responseJson.content)

			setAboveFold(aboveFoldJsx)
			setContent(contentJsx)
		}

		if (active) {
			// Only re-fetch if we don't have content yet
			!content && fetchData()

			// Set activeAfterTimeout after a timeout so the scroll bar only shows up after the transition is complete
			setTimeout(() => {
				setActiveAfterTimeout(true)
			}, 250)
		} else {
			setTimeout(() => {
				setActiveAfterTimeout(false)
			}, 250)
		}
	}, [active])

	return <div className={classNames(styles.page, activeAfterTimeout ? styles.active : '')} style={{backgroundColor: color, overflow: !active ? 'hidden' : ''}}>
		<div className={styles.outer_page}>
			<div className={styles.inner_page}>
				<h1>{title}</h1>
				{aboveFold}
				{!content && <Image className={styles.loading} src="/loader.svg" width="40" height="40" alt="Loading svg" />}
				{(active || activeAfterTimeout) && content}
			</div>
		</div>
	</div>
}