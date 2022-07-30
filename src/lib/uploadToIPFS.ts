// import {create} from 'ipfs-http-client'

// jun 19, 2022: vite and ipfs-http-client currently don't work together when installed as a module. using a CDN in index.html

type IPFSResponse = {
  path?: string; //hash
};
export const uploadToIPFS = async (data: any): Promise<IPFSResponse> => {
  // @ts-ignore
  const ipfsClient = window.IpfsHttpClient;

  if (!ipfsClient) throw 'ipfshttpclient not supported';

  const { create } = ipfsClient;
  const client = create({
    host: 'ipfs.infura.io',
    port: 5001,
    protocol: 'https',
  });
  console.log(data);
  return await client.add(JSON.stringify(data));
};

// export default uploadToIPFS
