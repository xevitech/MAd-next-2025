import { SelectableButton } from '@/components/common/buttons/SelectableButton';
import React from 'react';
import { OuterContainer, ContainerLabel, SpecItem } from './styles';
export const CustomSelector = (props) => {
  const Label = props?.label || 'Select Specification';
  const type = props?.type;
  const data = props?.data;
  const changeSelection = props?.changeSelection;

  return (
    <OuterContainer sx={{margin:'2px 0 0 0'}}>
      <ContainerLabel>{Label}</ContainerLabel>
      {data?.map((ele, index) => (
        <SelectableButton
          key={index}
          data={ele}
          changeSelection={changeSelection}
          type={type}
        />
      ))}
    </OuterContainer>
  );
};
