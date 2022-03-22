import axios from 'axios'
import express from 'express'
import { Block, decrypt, encrypt } from './crypto'
import power from './handshake'
import onionNodes from './onionNodes'

onionNodes.forEach(({ address, key }) => {
	const route = express()
	route.use(express.json({ limit: '1000mb' }))
	route.listen(address.port, () => {
		console.log(`Onion node listening on port ${address.port}`)
	})
	route.get('/', async (req, res) => {
		if (!req.query[0]) {
			res.send('No data')
			return
		}
		const encryptedData = req.query[0] as string
		const data = JSON.parse(decrypt(encryptedData, key.private)) as Block
		console.log(`OnionNode: ${address.ip}:${address.port}`)
		const answer = await axios.get(
			`${data.nextNodeAddress.ip}:${data.nextNodeAddress.port}`,
			{
				params: data.data,
			}
		)
		const reply = encrypt(JSON.stringify(answer.data), key.private)
		res.send(reply)
	})

	route.post('/', async (req, res) => {
		if (!req.body?.data) {
			res.send('No data')
			return
		}
		const encryptedData: string = req.body.data
		const data = JSON.parse(decrypt(encryptedData, key.private)) as Block
		console.log(`OnionNode: ${address.ip}:${address.port}`)
		const answer = await axios.post(
			`${data.nextNodeAddress.ip}:${data.nextNodeAddress.port}`,
			{
				data: data.data,
			}
		)
		const reply = encrypt(JSON.stringify(answer.data), key.private)
		res.send(reply)
	})
	route.post('/hs', async (req, res) => {
		if (!req.body?.generatedKey) {
			res.send('No data')
			return
		}
		const handshakeInfo = req.body.generatedKey
		const genKey = power(9, address.port - 7988, 23)
		res.send({
			generatedKey: genKey,
		})
		console.log(
			address.port + "'s key: " + power(handshakeInfo, address.port - 7988, 23)
		)
	})
})
