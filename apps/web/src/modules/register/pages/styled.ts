import { styled } from '@mui/material'

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
  shadow: 4px 4px 5px rgba(0, 0, 0, 0.1);
`

export const RootContainer = styled('form')`
  display: flex;
  padding: ${({ theme }) => theme.spacing(3)};
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 30px;
`
