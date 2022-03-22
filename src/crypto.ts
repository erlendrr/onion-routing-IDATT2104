import crypto from 'crypto'
import { Address, OnionNode } from './onionNodes'

const ALGORITHM = 'aes-256-cbc'
const ENCODING = 'hex'
const IV_LENGTH = 16

export const encrypt = (data: string, key: string) => {
	const iv = crypto.randomBytes(IV_LENGTH)
	const cipher = crypto.createCipheriv(ALGORITHM, Buffer.from(key), iv)
	return Buffer.concat([cipher.update(data), cipher.final(), iv]).toString(
		ENCODING
	)
}

export const decrypt = (data: string, key: string) => {
	const binaryData = Buffer.from(data, ENCODING)
	const iv = binaryData.slice(-IV_LENGTH)
	const encryptedData = binaryData.slice(0, binaryData.length - IV_LENGTH)
	const decipher = crypto.createDecipheriv(ALGORITHM, Buffer.from(key), iv)

	return Buffer.concat([
		decipher.update(encryptedData),
		decipher.final(),
	]).toString()
}

export interface Block {
	nextNodeAddress: Address
	data: string
}

export function createBlock(data: string, nextAddress: Address): Block {
	return {
		nextNodeAddress: nextAddress,
		data: data,
	}
}

export function createPackets(
	data: string,
	nodes: OnionNode[],
	i: number,
	goal: Address
): string {
	if (i < 0) {
		return data
	}
	if (i == nodes.length - 1) {
		return createPackets(
			encrypt(JSON.stringify(createBlock(data, goal)), nodes[i].key),
			nodes,
			i - 1,
			goal
		)
	}
	return createPackets(
		encrypt(
			JSON.stringify(createBlock(data, nodes[i + 1].address)),
			nodes[i].key
		),
		nodes,
		i - 1,
		goal
	)
}

export function decryptPackets(
	data: string,
	nodes: OnionNode[],
	i: number
): String {
	if (i > nodes.length - 1) {
		return data
	}
	return decryptPackets(JSON.parse(decrypt(data, nodes[i].key)), nodes, i + 1)
}
