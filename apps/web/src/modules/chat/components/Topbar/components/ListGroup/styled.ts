import { styled } from '@mui/material'

export const RootContainer = styled('div')`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  background-color: #322036;
  height: 7vh;
  width: 16vw;
  border-bottom: 1px solid black;
`

export const ToggleButton = styled('div')`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0px 1px;
  gap: 10px;

  width: 30%;
  height: 62%;

  /* Purple/300 */

  border-radius: 4px;

  /* Inside auto layout */

  flex: none;
  order: 0;
  flex-grow: 0;
  cursor: pointer;
`
