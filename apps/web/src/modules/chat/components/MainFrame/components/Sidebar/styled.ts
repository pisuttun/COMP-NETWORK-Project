import { styled } from '@mui/material'

export const RootContainer = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background-color: #322036;
  width: 16vw;
  height: 100%;
  border-bottom: 1px solid black;
`
export const ChatChoiceContainer = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  height: 100%;
  padding-left: 1.5rem;
`
export const UserContainer = styled('div')`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 7vh;
  padding: 18px;
  background-color: #1d121f;
`

export const IconContainer = styled('div')`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
`
