import React from "react"
import ContentLoader from "react-content-loader"

const MyLoader = () => (
  <ContentLoader
    speed={2}
    width={235}
    height={205}
    viewBox="0 0 235 205"
    backgroundColor="#e0e0e0"
    foregroundColor="#ecebeb"
    style={{ margin: '0 140px 0 105px' }}
  >
    <rect x="232" y="358" rx="0" ry="0" width="0" height="10" />
    <rect x="12" y="391" rx="0" ry="0" width="1" height="0" />
    <rect x="19" y="391" rx="0" ry="0" width="3" height="0" />
    <rect x="24" y="391" rx="0" ry="0" width="3" height="0" />
    <rect x="78" y="22" rx="0" ry="0" width="1" height="1" />
    <rect x="204" y="456" rx="0" ry="0" width="1" height="1" />
    <rect x="179" y="79" rx="0" ry="0" width="0" height="17" />
    <rect x="0" y="5" rx="7" ry="7" width="150" height="30" />
    <rect x="0" y="55" rx="6" ry="6" width="160" height="25" />
    <rect x="-1" y="115" rx="10" ry="10" width="235" height="75" />
  </ContentLoader>
)

export default MyLoader