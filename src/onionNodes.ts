export interface Address {
	ip: string
	port: number
}

export interface OnionNode {
	key: {
		public: string
		private: string
	}
	address: Address
}

const onionNodes: OnionNode[] = [
	{
		key: {
			public: '34743777217A25432A462D4A614E6452',
			private: '614E645267556B58703273357638792F',
		},
		address: {
			ip: 'http://localhost',
			port: 8000,
		},
	},
	{
		key: {
			public: '576D5A7134743777217A25432A462D4A',
			private: '462D4A404E635266556A586E32723575',
		},
		address: {
			ip: 'http://localhost',
			port: 8001,
		},
	},
	{
		key: {
			public: '556A586E3272357538782F413F442847',
			private: '78214125442A472D4B614E645267556B',
		},
		address: {
			ip: 'http://localhost',
			port: 8002,
		},
	},
	{
		key: {
			public: '2A472D4A614E645267556B5870327335',
			private: '59703273357638792F423F4528482B4D',
		},
		address: {
			ip: 'http://localhost',
			port: 8003,
		},
	},
	{
		key: {
			public: '3F4528472B4B6250655368566D597133',
			private: '67556B58703272357538782F413F4428',
		},
		address: {
			ip: 'http://localhost',
			port: 8004,
		},
	},
	{
		key: {
			public: '782F413F4428472D4B6150645367566B',
			private: '4E635266556A586E5A72347537782141',
		},
		address: {
			ip: 'http://localhost',
			port: 8006,
		},
	},
	{
		key: {
			public: '3777217A25432A462D4A614E64526755',
			private: '2948404D635166546A576E5A71347437',
		},
		address: {
			ip: 'http://localhost',
			port: 8007,
		},
	},
	{
		key: {
			public: '2646294A404E635266556A576E5A7234',
			private: '423F4528482B4D6251655468576D5A71',
		},
		address: {
			ip: 'http://localhost',
			port: 8008,
		},
	},
]

export default onionNodes
