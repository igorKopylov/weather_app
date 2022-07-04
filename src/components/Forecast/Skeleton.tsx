import React from "react";
import ContentLoader from "react-content-loader"

const MyLoader: React.FC = (props) => (
    <ContentLoader
        speed={2}
        width={110}
        height={460}
        viewBox="0 0 110 460"
        backgroundColor="#e0e0e0"
        foregroundColor="#ecebeb"
        {...props}
    >
        <rect x="232" y="358" rx="0" ry="0" width="0" height="10" />
        <rect x="12" y="391" rx="0" ry="0" width="1" height="0" />
        <rect x="19" y="391" rx="0" ry="0" width="3" height="0" />
        <rect x="24" y="391" rx="0" ry="0" width="3" height="0" />
        <rect x="78" y="22" rx="0" ry="0" width="1" height="1" />
        <rect x="204" y="456" rx="0" ry="0" width="1" height="1" />
        <rect x="179" y="79" rx="0" ry="0" width="0" height="17" />
        <circle cx="52" cy="105" r="50" />
        <rect x="5" y="0" rx="0" ry="0" width="92" height="38" />
        <rect x="14" y="175" rx="0" ry="0" width="77" height="38" />
    </ContentLoader>
)

export default MyLoader