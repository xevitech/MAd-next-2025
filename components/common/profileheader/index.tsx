import React, { useContext } from 'react';
import { MyAppContext } from '@/contextApi/appContext';
import { ProfileHeaderText } from './style';


export const ProfileHeader = (props) => {
  let text = props.text;
  let classname = props.classname
  const { breakPoints } = useContext(MyAppContext);

  return (
    <>
    <ProfileHeaderText className={classname} breakPoints={breakPoints} value={text} >{text}</ProfileHeaderText>
    </>
  );
};
