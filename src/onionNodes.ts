export interface Address {
	ip: string
	port: number
}

export interface OnionNode {
	key: string
	address: Address
}

const onionNodes: OnionNode[] = [
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

export default onionNodes
