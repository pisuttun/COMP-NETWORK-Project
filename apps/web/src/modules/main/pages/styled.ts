import { styled } from '@mui/material'

export const BoxContainer = styled('div')`
  display: flex;
  flex-direction: column;
  margin-bottom: 10vh;
  gap: 16px;
  width: 100%;
  height: fit-content;
  background-image: linear-gradient(108.84deg, #322036 5.24%, #332037 5.26%, #af79f4 200.3%);
  border-radius: 12px;
  padding: 16px;
`

export const RootContainer = styled('form')`
  display: flex;
  padding: ${({ theme }) => theme.spacing(3)};
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(2)};
`

// export const TextField = styled('label')`
//   bordertop-left-radius: 12px;
//   bordertop-right-radius: 12px;
//   background-color: #d0b1f8;
// `
