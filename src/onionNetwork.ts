import axios from 'axios'
import express from 'express'
import { Block, decrypt, encrypt } from './cryptoCustom'
import onionNodes from './onionNodes'
import { createDiffieHellman } from 'crypto'
import cors from 'cors'

onionNodes.forEach(({ address }) => {
	const route = express()
	route.use(cors())
	const allowedOrigins = ['http://localhost:3000']
	const options: cors.CorsOptions = {
		origin: allowedOrigins,
	}
	route.use(cors(options))
	let key: string
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
		const data = JSON.parse(decrypt(encryptedData, key)) as Block
		console.log(`OnionNode: ${address.ip}:${address.port}`)
		const answer = await axios.get(
			`${data.nextNodeAddress.ip}:${data.nextNodeAddress.port}`,
			{
				params: data.data,
			}
		)
		const reply = encrypt(JSON.stringify(answer.data), key)
		res.send(reply)
	})

	route.post('/', async (req, res) => {
		if (!req.body?.data) {
			res.send('No data')
			return
		}
		const encryptedData: string = req.body.data

		const data = JSON.parse(decrypt(encryptedData, key)) as Block
		console.log(`OnionNode: ${address.ip}:${address.port}`)
		const answer = await axios.post(
			`${data.nextNodeAddress.ip}:${data.nextNodeAddress.port}`,
			{
				data: data.data,
			}
		)
		const reply = encrypt(JSON.stringify(answer.data), key)
		res.send(reply)
	})
	route.post('/hs', async (req, res) => {
		if (!req.body?.prime) {
			res.send('No prime')
			return
		}
		if (!req.body?.publicKey) {
			res.send('No publicKey')
			return
		}
		const buffer = Buffer.from(req.body.prime.data)
		const publicKey = req.body.publicKey
		const diffieHellman = createDiffieHellman(buffer)
		diffieHellman.generateKeys('hex')
		res.send({
			publicKey: diffieHellman.getPublicKey('hex'),
		})
		const sharedKey = diffieHellman.computeSecret(publicKey, 'hex', 'hex')
		console.log(address.port + "'s key: " + sharedKey)
		key = sharedKey
	})
})
