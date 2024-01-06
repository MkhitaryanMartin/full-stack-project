import React from 'react';
import { Box} from '@mui/material';

type FlexDirection = 'row' | 'row-reverse' | 'column' | 'column-reverse';

type FlexContainerProps = {
    jC?: string;
    aI?: string;
    children: React.ReactNode;
    direction?: FlexDirection; // Используйте тип FlexDirection
    sx?: Record<string, string>;
    minH?:string | number;
    maxH?:string | number;
    width?: string | number;
}

const FlexContainer = ({
    jC = "space-around",
    aI = "center",
    children,
    direction = "row",
    sx = {},
    minH="",
    maxH="",
    width="100%"
}: FlexContainerProps) => {
    return (
        <Box
            display="flex"
            justifyContent={jC}
            alignItems={aI}
            sx={sx}
            flexDirection={direction}
            minHeight={minH}
            maxHeight={maxH}
            width={width}
        >
            {children}
        </Box>
    );
};

export default FlexContainer;
