import process from 'process'

console.log('VERCEL_URL', process.env.VERCEL_URL)

export default {
	url: process.env.LOCAL ? 'http://localhost:3000' : `https://${process.env.VERCEL_URL}`
}