import React from 'react'
import {use100vh} from './use100vh'

export const Div100vh: React.FC<{style: object}> = ({ children, style, ...other }) => {
  const vh = use100vh()
  return <div style={{...style, height: vh + 'px' }} {...other}>{children}</div>
};