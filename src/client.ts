import {createPackets, decryptPackets, Block} from "./crypto";
import {Address} from "./onionNodes";
import onionNodes from "./onionNodes";

/**
 * DATA TO SEND, NODES TO USE, FINAL DESTINATION
 */
const data = 'GET'
const nodes = onionNodes
const goal : Address  = {
    ip: "vg.no",
    port: 3000
}
/**
 * THE BLOCK TO SEND TO THE FIRST NODE
 */
const encryptedData: Block= {
    nextNodeAddress: onionNodes[0].address,
    data:createPackets(data, nodes, onionNodes.length -1, goal)
}
console.log(encryptedData)
/**
 * THE DATA DECRYPTED ONE BY ONE, WILL RETURN THE FINAL BLOCK TO SEND TO VG.NO "GET".
 */
const decryptData = decryptPackets(encryptedData.data, nodes, 0)
console.log(decryptData)