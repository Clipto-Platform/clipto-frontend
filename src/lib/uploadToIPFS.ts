// import {create} from 'ipfs-http-client'

// jun 19, 2022: vite and ipfs-http-client currently don't work together when installed as a module. using a CDN in index.html
export const uploadToIPFS = async (data : any) => {
  // @ts-ignore
  const ipfsClient = window.IpfsHttpClient

  if (!ipfsClient) throw 'ipfshttpclient not supported'

  const {create} = ipfsClient
  const client = create({
    host: 'ipfs.infura.io',
    port: 5001,
    protocol: 'https'
  })
  console.log(client)
  const f1 = "2"
  const f2 = "3"
  console.log('1')
  return await client.add('./uploadToIPFS.ts')
    
}

// export default uploadToIPFS