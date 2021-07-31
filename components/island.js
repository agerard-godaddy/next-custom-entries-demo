import React from 'react';

export function island(Component, tagName) {
  const CustomComponent = tagName;
  function IslandWrapper(props) {
    return <CustomComponent data-props={ JSON.stringify(props) }>
      <Component { ...props }/>
    </CustomComponent>;
  }

  IslandWrapper.Component = Component;
  IslandWrapper.tagName = tagName;
  return IslandWrapper;
}
