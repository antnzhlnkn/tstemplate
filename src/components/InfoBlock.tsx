import * as React from "react";
import Box from "@material-ui/core/Box";

interface InfoBlockProps {
    title: string;
    value: string;
    size?: string;
    isImage?: boolean;
}

export const InfoBlock: React.FC<InfoBlockProps> = ({title, value, size, isImage}) => (
    <Box display="flex" flexDirection="row" p={1} m={1} bgcolor="background.paper">
        <Box p={1} m={1}>
            {title}
        </Box>
        {
            isImage ?
                <Box p={1} m={1}>
                    <img width={size} height={size}
                         alt='Avatar'
                         src={value}
                    />
                </Box>
                :
                <Box p={1} m={1}>
                    {value}
                </Box>
        }
    </Box>
);
