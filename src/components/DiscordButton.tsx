import { HiOutlineArrowRight } from "react-icons/hi";
import { DISCORD_LINK } from "../config/config";
import { PrimaryButton } from "./Button";



const DiscordButton = () => (
  <PrimaryButton
    size="small"
    width="small"
    style={{ marginRight: 40, maxWidth: 150, background: '#5865F2', color: 'white' }}
    onPress={() => {
      window.open(DISCORD_LINK);
    }}
  >
    Join Discord <HiOutlineArrowRight style={{ marginLeft: 5 }} />
  </PrimaryButton>
)

export {DiscordButton}