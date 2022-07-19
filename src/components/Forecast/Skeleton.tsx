import React from "react";
import ContentLoader from "react-content-loader";

const MyLoader = () => (
    <ContentLoader
        speed={2}
        width={100}
        height={218}
        viewBox="0 0 100 219"
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
        <rect x="3" y="0" rx="7" ry="7" width="95" height="35" />
        <circle cx="50" cy="104" r="50" />
        <rect x="13" y="177" rx="7" ry="7" width="77" height="38" />
    </ContentLoader>
)

export default MyLoader