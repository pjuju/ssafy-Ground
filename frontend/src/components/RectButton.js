import { styled } from '@mui/system';
import { Button } from '@mui/material';

const CustomButton = styled(Button)({
    color: '#ffffff',
    backgroundColor: '#54BAB9',
    size: 'middle',
    '&:hover': {
        backgroundColor: '#18978F',
      },
});

export function RectButton(props) {
    return <CustomButton> {props.text} </CustomButton>
}