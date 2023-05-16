import process from 'process'

let url = process.env.LOCAL ? 'http://localhost:3000' : `https://${process.env.VERCEL_URL}`

if (typeof window !== 'undefined') {
	url = window.location.origin
}

export default {
	url: url
}