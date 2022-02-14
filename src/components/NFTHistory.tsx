import { RowContainer, Key, Label, Value } from "../styles/typography";
import { getShortenedAddress } from "../utils/address";
import { Card } from "./Card";
import { Row } from "./layout/Common";

interface NFTHistory {
    from: string;
    to: string;
    timestamp: string;
}

interface Props {
    history: NFTHistory[]
}

const NFTHistory = (props: Props) => {
    const { history } = props;

    const getHistoryString = (record: NFTHistory) => {
        return (
            parseInt(record.from) === 0
                ? `Minted NFT to ${getShortenedAddress(record.to)}`
                : `${getShortenedAddress(record.from)} transfered to ${getShortenedAddress(record.to)}`
        )
    }

    return (
        <Card title="History">
            <RowContainer>
                {history.map((record, id) => {
                    return (
                        <Row key={id}>
                            <Key><Label>{getHistoryString(record)}</Label></Key>
                            <Value>{record.timestamp}</Value>
                        </Row>
                    )
                })}
            </RowContainer>
        </Card>
    );
}

export { NFTHistory };
