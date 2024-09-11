// import React from "react"
// import ContentLoader from "react-content-loader"

// const MyLoader = (props) => (
//   <ContentLoader 
//     speed={2}
//     width={700}
//     height={200}
//     viewBox="0 0 400 160"
//     backgroundColor="#f3f3f3"
//     foregroundColor="#ecebeb"
//     {...props}
//   >
//     <rect x="48" y="8" rx="3" ry="3" width="88" height="6" /> 
//     <rect x="48" y="26" rx="3" ry="3" width="52" height="6" /> 
//     <rect x="0" y="56" rx="3" ry="3" width="410" height="6" /> 
//     <rect x="0" y="72" rx="3" ry="3" width="380" height="6" /> 
//     <rect x="0" y="88" rx="3" ry="3" width="178" height="6" /> 
//     <circle cx="20" cy="20" r="20" />
//   </ContentLoader>
// )

// export default MyLoader
import React from 'react';
import ContentLoader from 'react-content-loader';

const MyLoader = (props) => (
  <ContentLoader
    speed={2}
    width={384} // Width of the card
    height={200} // Height of the card
    viewBox="0 0 384 176"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    {/* Image Placeholder */}
    <rect x="0" y="0" rx="8" ry="8" width="384" height="100" />

    {/* Title Placeholder */}
    <rect x="12" y="170" rx="4" ry="4" width="200" height="14" />

    {/* Description Placeholder */}
    <rect x="12" y="190" rx="4" ry="4" width="250" height="14" />

    {/* Button Placeholder */}
    <rect x="280" y="170" rx="4" ry="4" width="80" height="30" />
    
    
    
    {/* Additional User Info Placeholder */}
    <rect x="50" y="136" rx="4" ry="4" width="100" height="12" />
  </ContentLoader>
);

export default MyLoader;

