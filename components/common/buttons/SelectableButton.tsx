import { Button } from '@mui/material';
import Image from 'next/image';

export const SelectableButton = (props) => {
  const changeSelection = props.changeSelection;
  const type = props?.type;
  const { name, selected, id } = props.data;

  return (
    <Button
      style={{
        padding: '0',
        color: '#000000',
        textTransform: 'none',
        minWidth: '0',
        minHeight: '24px',
        marginRight:'10px',
        marginBottom:'10px',
      }}
      onClick={() => {
        changeSelection(id, type);
      }}
    >
      <div
        style={{
          border: '1px solid #B3B1B1',
          fontWeight: 400,
          fontSize: '12px',
          lineHeight: '24px',
          display: 'flex',
          paddingRight: '6px',
          borderRadius: '6px',
          cursor: 'pointer',
          height: '100%',
        }}
      >
        {selected && (
          <div
            style={{
              position: 'relative',
              display: 'inline-block',
              width: '22px',
              height: '24px',
              borderTopLeftRadius: '6px',
              borderBottomLeftRadius: '6px',
              border: 'none`',
            }}
          >
            <Image
              width={22}
              height={24}
              src={'/assets/selectedAttribute.svg'}
              alt='img'
            />
          </div>
        )}
        <div>
          <span style={{ display: 'inline-block', paddingLeft: '6px' }}>
            {name.replaceAll('_',' ')}
          </span>
        </div>
      </div>
    </Button>
  );
};
