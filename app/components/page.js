
import styles from './page.module.sass'

export default function Page({title, aboveFold, content, color, active}) {

	return <div className={styles.page} style={{backgroundColor: color}}>
		<h1>{title}</h1>
		{aboveFold}
		{active && content}
	</div>
}