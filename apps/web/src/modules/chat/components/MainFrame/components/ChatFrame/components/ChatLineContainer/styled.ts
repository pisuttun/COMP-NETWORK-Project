import { styled } from '@mui/material'

export const RootContainer = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  background-color: transparent;
  width: 100%;
  height: 75vh;
  overflow-y: auto;
  overflow-x: hidden;
  gap: 2rem;

  /* Add scrollbar styles */
  &::-webkit-scrollbar {
    width: 8px; // Adjust width as desired
  }

  &::-webkit-scrollbar-track {
    background-color: #412846; // Adjust track color as desired
  }

  &::-webkit-scrollbar-thumb {
    background-color: #d0b1f8; // Adjust thumb color as desired
    border-radius: 8px; // Adjust border-radius as desired
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: #412846; // Adjust thumb color on hover as desired
  }
`
