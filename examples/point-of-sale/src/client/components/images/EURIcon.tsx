import React, { FC, SVGProps } from 'react';

export const EURIcon: FC<SVGProps<SVGSVGElement>> = ({ width = 32, height = 32 }) => {
    return (
        <svg width={width} height={height} xmlns="http://www.w3.org/2000/svg" viewBox="-89 -73 146 146">
            <path d="M-89-73h146v146H-89z" fill="#0f218b" />
            <path d="M-70.843013-15H31.177404l-4.156987 10H-75zm0 20H22.863429l-4.156987 10H-75zM38.302222-32.13938a50 50 0 1 0 0 64.278761v14.04438a60 60 0 1 1 4.231556-88.502524z" fill="#ff0" />
        </svg>
    );
};
