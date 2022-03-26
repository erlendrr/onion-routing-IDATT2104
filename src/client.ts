import { createDiffieHellman } from 'crypto'

import { createPackets, decryptPackets } from './cryptoCustom'
import { OnionNode } from './onionNodes'
import onionNodes from './onionNodes'
import axios from 'axios'

const args = process.argv.slice(2)

let nodeCount = 3
const userInput = parseInt(args[0])
if (userInput > onionNodes.length) {
	nodeCount = onionNodes.length - 2
} else if (userInput > 1) {
	nodeCount = userInput
}

function shuffle(arr: OnionNode[]) {
	for (let i = arr.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1))
		const temp = arr[i]
		arr[i] = arr[j]
		arr[j] = temp
	}
}

/**
 * Reaches out to each OnionNode in the file onionNodes.ts
 * Performs a diffie-hellman key exchange, using the crypto library
 */
export async function handshake(routeNodes: OnionNode[]) {
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

/**
 * Sends a post request to a OnionNode with its given route
 */
export async function post(
	goal: string,
	data: string,
	keys: string[],
	routeNodes: OnionNode[]
) {
	const res = await axios.post(
		`${routeNodes[0].address.ip}:${routeNodes[0].address.port}`,
		{
			data: createPackets(data, routeNodes, keys, routeNodes.length - 1, goal),
		}
	)
	return decryptPackets(res.data, routeNodes, keys, 0)
}
/**
 * Sends a get request to a OnionNode with its given route
 */
export async function get(
	goal: string,
	keys: string[],
	routeNodes: OnionNode[]
) {
	const res = await axios.get(
		`${routeNodes[0].address.ip}:${routeNodes[0].address.port}`,
		{
			params: createPackets('', routeNodes, keys, routeNodes.length - 1, goal),
		}
	)
	return decryptPackets(res.data, routeNodes, keys, 0)
}

/**
 * Creates a route for the client to got through when using the Onion Network
 */
export async function createRoute(routeNodes: OnionNode[]) {
	routeNodes = [...onionNodes]
	shuffle(routeNodes)
	routeNodes.splice(0, routeNodes.length - nodeCount)
	const keys = await handshake(routeNodes)
	return {
		keys,
		routeNodes,
	}
}

/**
 * For testing only
 */
export async function run() {
	const { keys, routeNodes } = await createRoute(onionNodes)
	const getRes = await get('http://localhost:3333', keys, routeNodes)
	const postRes = await post(
		'http://localhost:3333',
		'Hello World!',
		keys,
		routeNodes
	)
	console.log(`Get request: ${JSON.stringify(getRes)}`)
	console.log(`Post request: ${postRes}`)
}
