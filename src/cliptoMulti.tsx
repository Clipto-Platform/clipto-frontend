import { getProviderOrSigner } from './hooks/useContracts';
import { useWeb3React } from '@web3-react/core';
import { ERC20__factory } from './contracts';
import { parseUnits } from 'ethers/lib/utils';
import { Web3Provider } from '@ethersproject/providers';
const CliptoMulti = () => {
  const { library, account} = useWeb3React<Web3Provider>();
  const TransferToken = async () => {
    console.log(account);
      const provider = getProviderOrSigner(library, "0x8b2a6a22ec055225C4c4b5815e7d9F566b8be68F");
      const erc20 = ERC20__factory.connect('0xc778417E063141139Fce010982780140Aa0cD5Ab', provider);
      const tx = await erc20.approve('0xb2d576fd5734c441fef51f2937c70ccbb6c2144f',parseUnits('0.01'));
      const receipt = await tx.wait();
      console.log(receipt);
  };

  return (
    <>
    <button style={{marginTop:"100px"}}onClick={TransferToken}> erc20</button>
    </>
  )
};
export default CliptoMulti;
