import React from "react"
import ContentLoader from "react-content-loader"
import { BookingCard } from "./RightPanel"

const ImagesSliderLoading = (props: any) => (
  <ContentLoader
    speed={2}
    width={320}
    height={250}
    viewBox="0 0 320 250"
    backgroundColor="#2b2b2b"
    foregroundColor="#1c1c1c"
    {...props}
  >
    <path d="M 0.48 0.8 h 149.04 v 248.4 H 0.48 z M 170.56 0.4 H 319.6 v 248.4 H 170.56 z" />
  </ContentLoader>
)

export { ImagesSliderLoading }