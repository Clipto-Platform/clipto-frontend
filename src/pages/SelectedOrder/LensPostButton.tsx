import { PrimaryButton } from '../../components/Button';
import { colors } from '../../styles/theme';

export const LensPostButton = (props: { onPress: (e: any) => void }) => {
  return (
    <PrimaryButton
      onPress={props.onPress}
      style={{
        background: colors.lensGreen,
      }}
    >
      Share to Lens
    </PrimaryButton>
  );
};
