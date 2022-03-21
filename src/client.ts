import { createPackets, decryptPackets, Block, decrypt } from './crypto'
import { Address, OnionNode } from './onionNodes'
import onionNodes from './onionNodes'
import axios from 'axios'

const data = 'potato'
const nodes = onionNodes
const goal: Address = {
	ip: 'http://localhost',
	port: 3333,
}

function shuffle(arr: OnionNode[]) {
	for (var i = arr.length - 1; i > 0; i--) {
		var j = Math.floor(Math.random() * (i + 1))
		var temp = arr[i]
		arr[i] = arr[j]
		arr[j] = temp
	}
}
shuffle(nodes)

axios.post(`${nodes[0].address.ip}:${nodes[0].address.port}`, {
	data: createPackets(data, nodes, onionNodes.length - 1, goal),
}).then(answer => {
	console.log(decryptPackets(answer.data, onionNodes, 0))
})


