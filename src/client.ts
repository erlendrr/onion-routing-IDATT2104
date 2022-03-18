import { createPackets, decryptPackets, Block } from './crypto'
import { Address, OnionNode } from './onionNodes'
import onionNodes from './onionNodes'
import axios from 'axios'

/**
 * DATA TO SEND, NODES TO USE, FINAL DESTINATION
 */
const data = 'potato'
const nodes = onionNodes
const goal: Address = {
	ip: 'http://localhost',
	port: 3000,
}
/**
 * THE BLOCK TO SEND TO THE FIRST NODE
 */

function shuffle(arr: OnionNode[]) {
	for (var i = arr.length - 1; i > 0; i--) {
		var j = Math.floor(Math.random() * (i + 1))
		var temp = arr[i]
		arr[i] = arr[j]
		arr[j] = temp
	}
}
shuffle(nodes)

const encryptedData: Block = {
	nextNodeAddress: onionNodes[0].address,
	data: createPackets(data, nodes, onionNodes.length - 1, goal),
}
/**
 * THE DATA DECRYPTED ONE BY ONE, WILL RETURN THE FINAL BLOCK TO SEND TO VG.NO "GET".
 */
const decryptData = decryptPackets(encryptedData.data, nodes, 0)

axios.post(
	`${encryptedData.nextNodeAddress.ip}:${encryptedData.nextNodeAddress.port}`,
	{
		data: encryptedData.data,
	}
)