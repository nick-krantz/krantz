import { Heading, Grid, GridItem, Switch, useColorMode, Flex } from '@chakra-ui/react'

type Props = {
  title?: string
}

export const Header: React.FC<Props> = ({ title, children }) => {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <Grid templateColumns="repeat(3, 1fr)" p="20px">
      <GridItem w="100%" />
      <GridItem w="100%">{title && <Heading textAlign="center">{title}</Heading>}</GridItem>
      <GridItem w="100%">
        <Flex justifyContent="flex-end" alignItems="center" gap="16px" h="100%">
          <Switch
            size="lg"
            onChange={toggleColorMode}
            aria-label={`Toggle ${colorMode === 'dark' ? 'light' : 'dark'} theme`}
          />
          {children}
        </Flex>
      </GridItem>
    </Grid>
  )
}
