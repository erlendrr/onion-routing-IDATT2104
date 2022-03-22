import axios from 'axios'
import express from 'express'
import {Block, decrypt, encrypt} from './crypto'
import onionNodes, { OnionNode, Address } from './onionNodes'
import {power} from "./handshake";

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
		const answer = await axios.post(
			`${data.nextNodeAddress.ip}:${data.nextNodeAddress.port}`,
			{
				data: data.data,
			}
		)
		const reply = encrypt(JSON.stringify(answer.data), key)
		res.send(reply)
	})
	route.post('/hs', async(req, res) =>{
		if (!req.body?.generatedKey) {
			res.send('No data')
			return
		}
		const handshakeInfo = req.body.generatedKey
		const genKey = power(9, address.port-7988, 23)
		res.send({
			generatedKey: genKey
		})
		console.log(address.port + "'s key: " + power(handshakeInfo, address.port-7988, 23))
	})

})

const app = express()
app.use(express.json())

app.post('/', (req, res) => {
	if (!req.body?.data) {
		res.send('No data')
		return
	}
	res.send({
		data: req.body.data + " potata"
	})
})
const port = 3333
app.listen(port, () => {
	console.log(`Example app listening on port ${port}`)
})
