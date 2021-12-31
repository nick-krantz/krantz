import { FormControl, FormErrorMessage, FormLabel, Input } from '@chakra-ui/react'

type Props = {
  email?: string
  errorMessage?: string
}

export const EmailInput: React.FC<Props> = ({ email, errorMessage }) => {
  return (
    <FormControl isInvalid={Boolean(errorMessage)}>
      <FormLabel>Email</FormLabel>
      <Input type="email" name="email" defaultValue={email} />
      <FormErrorMessage>{errorMessage}</FormErrorMessage>
    </FormControl>
  )
}
