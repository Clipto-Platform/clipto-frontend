import { CSSProperties } from 'styled-components';

import { Description, Label } from '../styles/typography';

export interface ConfirmationTextProps {
  label: string;
  description: string;
  inputStyles?: CSSProperties;
}
//jonathanng: Note that Description jsx is using props.label and
//            Label is using props.description
//            If label and description change, this is will lead to
//            consequences here as the Description and Label do not
//            function as its name suggests.

//used in Mint.tsx, Bountyconfirmation.tsx
function ConfirmationText(props: ConfirmationTextProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ marginBottom: 16 }}>
        <Description style={{ marginBottom: props.description ? 7 : 0 }} as={'label'}>
          {props.label}
        </Description>
        {props.description && <Label>{props.description}</Label>}
      </div>
    </div>
  );
}

export { ConfirmationText };
