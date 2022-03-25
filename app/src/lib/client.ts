import { createDiffieHellman } from 'crypto';

import { createPackets, decryptPackets } from '../../../src/cryptoCustom';
import { Address, OnionNode } from '../../../src/onionNodes';
import onionNodes from '../../../src/onionNodes';
import axios from 'axios';

function shuffle(arr: OnionNode[]) {
  for (var i = arr.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
}

async function handshake(routeNodes: OnionNode[]) {
  const primeLength = 128;
  const dh = createDiffieHellman(primeLength);
  const publicKey = dh.generateKeys('hex');
  const keys: string[] = [];

  for (const node of routeNodes) {
    const res = await axios.post(`${node.address.ip}:${node.address.port}/hs`, {
      prime: dh.getPrime(),
      publicKey: publicKey,
    });
    const sharedKey = dh.computeSecret(res.data.publicKey, 'hex', 'hex');
    keys.push(sharedKey);
  }
  return keys;
}

export async function post(
  goal: Address,
  data: string,
  keys: string[],
  routeNodes: OnionNode[]
) {
  const res = await axios.post(
    `${routeNodes[0].address.ip}:${routeNodes[0].address.port}`,
    {
      data: createPackets(data, routeNodes, keys, routeNodes.length - 1, goal),
    }
  );
  console.log(decryptPackets(res.data, routeNodes, keys, 0));
  return decryptPackets(res.data, routeNodes, keys, 0);
}

export async function get(
  goal: Address,
  keys: string[],
  routeNodes: OnionNode[]
) {
  const res = await axios.get(
    `${routeNodes[0].address.ip}:${routeNodes[0].address.port}`,
    {
      params: createPackets('', routeNodes, keys, routeNodes.length - 1, goal),
    }
  );
  return decryptPackets(res.data, routeNodes, keys, 0);
}

//TODO: Vurder å reformater
export async function createRoute(routeNodes: OnionNode[]) {
  routeNodes = [...onionNodes];
  shuffle(routeNodes);
  routeNodes.splice(0, routeNodes.length - 3);
  const keys = await handshake(routeNodes);
  return {
    keys,
    routeNodes,
  };
}

/**
 * For testing only
 */
export async function run() {
  const { keys, routeNodes } = await createRoute(onionNodes);
  const ans = await get(
    {
      ip: 'http://localhost',
      port: 3333,
    },
    keys,
    routeNodes
  );
  console.log(ans);
}
