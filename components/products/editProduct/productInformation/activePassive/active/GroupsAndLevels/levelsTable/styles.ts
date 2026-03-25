import { styled } from '@mui/material';

export const CustomTableRow: any = styled('div')(({ evenNotOdd }: any) => ({
  display: 'flex',
  flex: 1,
  minHeight: '48px',
  backgroundColor: evenNotOdd ? ' #FAFAFA' : 'white',
  borderBottom: '1px solid #E1E1E1',
}));
export const LevelContent = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flex: 0.1,
  fontSize:'13px', 
});

export const SpecificationsContent = styled('div')({
  display: 'flex',
  flex: 0.4,
  alignItems: 'center',
  fontSize:'13px',
});

export const ParentContent = styled('div')({
  display: 'flex',
  flex: 0.4,
  alignItems: 'center',
  fontSize:'13px',
});

export const ActionsContent = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flex: 0.1,
  fontSize:'13px',
});
