import axios from 'axios'
import express from 'express'
import { Block, decrypt } from './crypto'
import onionNodes, { OnionNode, Address } from './onionNodes'

onionNodes.forEach(({ address, key }) => {
	const route = express()
	route.use(express.json())

	route.listen(address.port, () => {
		console.log(`Onion node listening on port ${address.port}`)
	})
	route.post('/', async (req, res) => {
		if (!req.body?.data) {
			res.send('No data')
			return
		}
		const encryptedData: string = req.body.data
		const data = JSON.parse(decrypt(encryptedData, key)) as Block
		console.log(`OnionNode: ${address.ip}:${address.port}`)
		await axios.post(
			`${data.nextNodeAddress.ip}:${data.nextNodeAddress.port}`,
			{
				data: data.data,
			}
		)
	})
})

const app = express()
app.use(express.json())

app.post('/', (req, res) => {
	if (!req.body?.data) {
		res.send('No data')
		return
	}
	const data = req.body
	console.log(data)
})
const port = 3333
app.listen(port, () => {
	console.log(`Example app listening on port ${port}`)
})
