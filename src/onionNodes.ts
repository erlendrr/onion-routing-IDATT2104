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
			ip: 'http://localhost',
			port: 8000,
		},
	},
	{
		key: '576D5A7134743777217A25432A462D4A',
		address: {
			ip: 'http://localhost',
			port: 8001,
		},
	},
	{
		key: '2A472D4A614E645267556B5870327335',
		address: {
			ip: 'http://localhost',
			port: 8002,
		},
	},
	{
		key: '2A472D4A614E645267556B5870327335',
		address: {
			ip: 'http://localhost',
			port: 8003,
		},
	},
	{
		key: '2A472D4A614E645267556B5870327335',
		address: {
			ip: 'http://localhost',
			port: 8004,
		},
	},
	{
		key: '2A472D4A614E645267556B5870327335',
		address: {
			ip: 'http://localhost',
			port: 8006,
		},
	},
	{
		key: '2A472D4A614E645267556B5870327335',
		address: {
			ip: 'http://localhost',
			port: 8007,
		},
	},
	{
		key: '2A472D4A614E645267556B5870327335',
		address: {
			ip: 'http://localhost',
			port: 8008,
		},
	},
]

export default onionNodes
