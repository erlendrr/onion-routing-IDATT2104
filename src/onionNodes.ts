export interface Address {
	ip: string
	port: number
}

export interface OnionNode {
	address: Address
}

const onionNodes: OnionNode[] = [
	{
		address: {
			ip: 'http://localhost',
			port: 8000,
		},
	},
	{
		address: {
			ip: 'http://localhost',
			port: 8001,
		},
	},
	{
		address: {
			ip: 'http://localhost',
			port: 8002,
		},
	},
	{
		address: {
			ip: 'http://localhost',
			port: 8003,
		},
	},
	{
		address: {
			ip: 'http://localhost',
			port: 8004,
		},
	},
	{
		address: {
			ip: 'http://localhost',
			port: 8006,
		},
	},
	{
		address: {
			ip: 'http://localhost',
			port: 8007,
		},
	},
	{
		address: {
			ip: 'http://localhost',
			port: 8008,
		},
	},
]

export default onionNodes
