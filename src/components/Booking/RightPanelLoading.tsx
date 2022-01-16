import React from "react"
import ContentLoader from "react-content-loader"
import { BookingCard } from "./RightPanel"

const RightPanelLoading = (props: any) => (
  <BookingCard>
    <ContentLoader
      speed={2}
      width={500}
      height={160}
      viewBox="0 0 500 160"
      backgroundColor="#2b2b2b"
      foregroundColor="#1c1c1c"
      {...props}
    >
      <path d="M 446.07 1.1 c 24.111 0 43.68 19.569 43.68 43.68 s -19.569 43.68 -43.68 43.68 s -43.68 -19.569 -43.68 -43.68 S 421.959 1.1 446.07 1.1 z" />
      <path d="M 1.245 33.41 h 144.15 v 13.02 H 1.245 z M 1.2 0.69 h 105.4 v 19.84 H 1.2 z M 1.095 118.63 h 498.17 v 44.64 H 1.095 z M 1.175 58.79 h 144.15 v 13.02 H 1.175 z" />
    </ContentLoader>
  </BookingCard>
)

export { RightPanelLoading }