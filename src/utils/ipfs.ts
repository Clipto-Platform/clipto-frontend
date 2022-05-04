import { uploadToIpfs } from '../api';

export const getIpfsURI = async (name: string, data: string) => {
  const metadata = {
    name: name,
    metadataJSON: data,
  };
  let ipfs = await uploadToIpfs(metadata);
  console.log('ipfs', ipfs.data);
  const metadataURI = 'ipfs://'.concat(ipfs.data.IpfsHash);
  return metadataURI;
};
