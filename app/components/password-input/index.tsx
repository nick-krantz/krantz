import { FormControl, FormErrorMessage, FormLabel, Input } from '@chakra-ui/react'

type Props = {
  password?: string
  errorMessage?: string
}

export const PasswordInput: React.FC<Props> = ({ password, errorMessage }) => {
  return (
    <FormControl isInvalid={Boolean(errorMessage)}>
      <FormLabel>Password</FormLabel>
      <Input type="password" name="password" defaultValue={password} />
      <FormErrorMessage>{errorMessage}</FormErrorMessage>
    </FormControl>
  )
}
