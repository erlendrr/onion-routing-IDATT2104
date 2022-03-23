import { createPackets, decryptPackets } from './cryptoCustom'
import { Address, OnionNode } from './onionNodes'
import onionNodes from './onionNodes'
import axios from 'axios'
import { createDiffieHellman } from 'crypto'

const allNodes = onionNodes
let routeNodes: OnionNode[]
let keys: string[]

function shuffle(arr: OnionNode[]) {
	for (var i = arr.length - 1; i > 0; i--) {
		var j = Math.floor(Math.random() * (i + 1))
		var temp = arr[i]
		arr[i] = arr[j]
		arr[j] = temp
	}
}

async function handshake() {
	const primeLength = 128
	const dh = createDiffieHellman(primeLength)
	const publicKey = dh.generateKeys('hex')
	const keys: string[] = []

	for (const node of routeNodes) {
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
		`${routeNodes[0].address.ip}:${routeNodes[0].address.port}`,
		{
			data: createPackets(data, routeNodes, keys, routeNodes.length - 1, goal),
		}
	)
	console.log(decryptPackets(res.data, routeNodes, keys, 0))
	return decryptPackets(res.data, routeNodes, keys, 0)
}

async function get(goal: Address) {
	const res = await axios.get(
		`${routeNodes[0].address.ip}:${routeNodes[0].address.port}`,
		{
			params: createPackets('', routeNodes, keys, routeNodes.length - 1, goal),
		}
	)
	return decryptPackets(res.data, routeNodes, keys, 0)
}

//TODO: Vurder å reformater
async function createRoute() {
	routeNodes = []
	allNodes.forEach(node => {
		routeNodes.push(node)
	})
	shuffle(routeNodes)
	routeNodes.splice(0, routeNodes.length - 3)
	keys = await handshake()
}

/**
 * For testing only
 */
async function run() {
	await createRoute()
	const ans = await get({
		ip: 'http://localhost',
		port: 3333,
	})
	console.log(ans)
}
