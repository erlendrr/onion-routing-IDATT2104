import { createPackets, decryptPackets, Block, decrypt } from './crypto'
import { Address, OnionNode } from './onionNodes'
import onionNodes from './onionNodes'
import axios from 'axios'
import { createDiffieHellman } from 'crypto'

const nodes = onionNodes
const goal: Address = {
	ip: 'http://localhost',
	port: 3333,
}
let keys: string[] = []

function shuffle(arr: OnionNode[]) {
	for (var i = arr.length - 1; i > 0; i--) {
		var j = Math.floor(Math.random() * (i + 1))
		var temp = arr[i]
		arr[i] = arr[j]
		arr[j] = temp
	}
}
shuffle(nodes)
nodes.splice(0, nodes.length - 3)

async function handshake() {
	const prime = 128
	const dh = createDiffieHellman(prime)
	const publicKey = dh.generateKeys('hex')
	const keys: string[] = []

	for (const node of nodes) {
		const res = await axios.post(`${node.address.ip}:${node.address.port}/hs`, {
			prime: dh.getPrime(),
			publicKey: publicKey,
		})
		const sharedKey = dh.computeSecret(res.data.publicKey, 'hex', 'hex')
		keys.push(sharedKey)
	}
	return keys
}

async function post(goal: Address, data: string) {
	const res = await axios.post(
		`${nodes[0].address.ip}:${nodes[0].address.port}`,
		{
			data: createPackets(data, nodes, keys, onionNodes.length - 1, goal),
		}
	)
	console.log(decryptPackets(res.data, onionNodes, keys, 0))
	return decryptPackets(res.data, onionNodes, keys, 0)
}

async function get(goal: Address) {
	const res = await axios.get(
		`${nodes[0].address.ip}:${nodes[0].address.port}`,
		{
			params: createPackets('', nodes, keys, onionNodes.length - 1, goal),
		}
	)
	return decryptPackets(res.data, onionNodes, keys, 0)
}

handshake().then(answer => {
	keys = answer
	get(goal).then(res => {
		console.log(res)
	})
})

//console.log(get(goal))
//console.log(post(goal, 'Hello'))
