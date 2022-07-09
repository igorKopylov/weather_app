import React from "react"
import ContentLoader from "react-content-loader"

const SkeletonCurrentDate = () => (
    <ContentLoader
        speed={2}
        width={210}
        height={21}
        viewBox="0 0 210 21"
        backgroundColor="#e0e0e0"
        foregroundColor="#ecebeb"
    >
        <rect x="232" y="358" rx="0" ry="0" width="0" height="10" />
        <rect x="12" y="391" rx="0" ry="0" width="1" height="0" />
        <rect x="19" y="391" rx="0" ry="0" width="3" height="0" />
        <rect x="24" y="391" rx="0" ry="0" width="3" height="0" />
        <rect x="78" y="22" rx="0" ry="0" width="1" height="1" />
        <rect x="204" y="456" rx="0" ry="0" width="1" height="1" />
        <rect x="179" y="79" rx="0" ry="0" width="0" height="17" />
        <rect x="0" y="0" rx="5" ry="5" width="210" height="21" />
    </ContentLoader>
)

export default SkeletonCurrentDate