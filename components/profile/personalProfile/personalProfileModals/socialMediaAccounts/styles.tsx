import { styled } from '@mui/material';

export const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  outline: 'none',
  bgcolor: 'white',
  boxShadow: 24,
  borderRadius: '6px',
  p: 4,
  minHeight: 228,
};

export const OuterContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
});
export const InputItemContainer: any = styled('div')(
  ({ breakPoint, flexColumn, padding, transform }: any) => ({
    position: 'relative',
    flex: 0.48,
    display: 'flex',
    width: breakPoint?.max540px && '100%',
    flexDirection: flexColumn ? 'column' : 'row',
    gap: flexColumn && '16px',
    padding: padding?.padding,
    margin: '20px',
  })
);
