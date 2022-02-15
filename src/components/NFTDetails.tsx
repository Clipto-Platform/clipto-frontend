import { Key, RowContainer, Value } from '../styles/typography';
import { Card } from './Card';
import { Row } from './layout/Common';
import { Link } from './Link';

const NFTDetails = (props: any) => {
  const { details } = props;

  return (
    <Card title="NFT Details">
      <RowContainer>
        <Row>
          <Key>Contract Address</Key>
          <Value>
            <Link url={details.contractLink}>{details.contractAddress}</Link>
          </Value>
        </Row>
        <Row>
          <Key>Token ID</Key>
          <Value>{details.tokenId}</Value>
        </Row>
        <Row>
          <Key>Chain</Key>
          <Value>{details.chain}</Value>
        </Row>
        <Row>
          <Key>Metadata</Key>
          <Value>
            <Link url={details.metadata} />
          </Value>
        </Row>
        <Row>
          <Key>View on Polygonscan</Key>
          <Value>
            <Link url={details.etherscan} />
          </Value>
        </Row>
        <Row>
          <Key>View on Opensea</Key>
          <Value>
            <Link url={details.opensea} />
          </Value>
        </Row>
      </RowContainer>
    </Card>
  );
};

export { NFTDetails };
