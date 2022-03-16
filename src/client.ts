import { encrypt, decrypt } from './aes'

interface Address {
	ip: string
	port: number
}

interface Node {
	address: Address
	key: string
}

const nodes: Node[] = [
	{
		key: '34743777217A25432A462D4A614E6452',
		address: {
			ip: '127.0.0.1',
			port: 8000,
		},
	},
	{
		key: '576D5A7134743777217A25432A462D4A',
		address: {
			ip: '127.0.0.1',
			port: 8001,
		},
	},
	{
		key: '2A472D4A614E645267556B5870327335',
		address: {
			ip: '127.0.0.1',
			port: 8002,
		},
	},
]

interface Block {
	nextNodeAddress: Address
	data: string
}

function createOnionBlock(data: string, nextNode: Node) {
	return encrypt(
		JSON.stringify({
			nextNodeAddress: nextNode.address,
			data: data,
		}),
		nextNode.key
	)
}

const data = 'Hello world'
const onionBlock2 = createOnionBlock(data, nodes[2])
const onionBlock1 = createOnionBlock(onionBlock2, nodes[1])
const onionBlock0 = createOnionBlock(onionBlock1, nodes[0])

console.log(data)

const block0: Block = JSON.parse(decrypt(onionBlock0, nodes[0].key))
console.log(block0)

const block1: Block = JSON.parse(decrypt(block0.data, nodes[1].key))
console.log(block1)

const block2 = JSON.parse(decrypt(block1.data, nodes[2].key))

console.log(block2)
