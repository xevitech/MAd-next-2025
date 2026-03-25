import React from 'react'
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';
import { styled } from '@mui/material/styles';

const StyledRating = styled(Rating)({
    '& .MuiRating-iconFilled': {
      color: '#FFA31A',
    },
  });

const labels: { [index: string]: string } = {
    
    1: 'Awful',
   
    2: 'Poor',
  
    3: 'Ok',
   
    4: 'Good',
   
    5: 'Excellent',
};

function getLabelText(value: number) {
    return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
}

export default function StarRating(ratingType: any, getRating: any) {
    const [value, setValue] = React.useState<number | null>(2);
    const [hover, setHover] = React.useState(-1);
    
    return (
        <Box sx={{
            width: 200,
            display: 'flex',
            alignItems: 'center',
        }}>
            
            <StyledRating
                name="size-large"
                value={value}
                size="large"
                getLabelText={getLabelText}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
                emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
            />
            {value !== null && (
                <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
            )}
        </Box>
    );
}

