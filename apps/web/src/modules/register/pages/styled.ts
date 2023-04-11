import { Button, styled } from '@mui/material'

export const BoxContainer = styled('div')`
  display: flex;
  flex-direction: column;
  margin-bottom: 10vh;
  gap: 20px;
  width: 30%;
  height: fit-content;
  background-image: linear-gradient(108.84deg, #322036 5.24%, #332037 5.26%, #af79f4 230.3%);
  border-radius: 12px;
  padding: 24px;
  align-items: center;
  justify-content: center;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
`

export const RootContainer = styled('form')`
  display: flex;
  padding: ${({ theme }) => theme.spacing(3)};
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 30px;
`
export const StyledButton = styled(Button)`
  // color: ${({ theme }) => theme.palette.primary.main},
  // width: 30%,
  // alignItems: center,
  // justifyContent: center,
  // boxshadow: rgba(0, 0, 0, 0.35) 0px 5px 15px,
`

export const SubmitButton = styled(StyledButton)`
  padding: 8px 24px;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.palette.common.white};
  &:hover {
    background-color: ${({ theme }) => theme.palette.primary.light};
  }
`
