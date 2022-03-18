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
//TODO: create block
export function createEncryptedBlock(data: string, nextAddress: Address, key: string) {
	const block: Block = {
		nextNodeAddress: nextAddress,
		data: data,
	}
	return encrypt(JSON.stringify(block), key)
}

export function decryptEncryptedBlock(block: string, key: string): string{
	return decrypt(block, key)
}

export function createPackets(data: string, nodes: OnionNode[], i: number, goal: Address): string{
	if(i < 0){
		return data;
	}
	if(i == nodes.length - 1){
		return createPackets(createEncryptedBlock(data, goal, nodes[i].key), nodes, i - 1, goal)
	}
	return createPackets(createEncryptedBlock(data, nodes[i+1].address, nodes[i].key), nodes, i - 1, goal)
}

export function parseBlock(block: string): Block{
	return JSON.parse(block)
}

export function decryptPackets(data: string, nodes: OnionNode[], i: number): Block{
	if (i > nodes.length-1){
		return parseBlock(data)
	}
	if (i === 0){
		return decryptPackets(decryptEncryptedBlock(data, nodes[i].key), nodes, i+1)
	}
	return decryptPackets(decryptEncryptedBlock(parseBlock(data).data, nodes[i].key), nodes, i+1)
}
