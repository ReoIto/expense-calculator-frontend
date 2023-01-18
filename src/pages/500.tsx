import { Center, Container, Heading } from '@chakra-ui/react'

const ServerErrorPage = () => {
  return (
    <Container color="red.300">
      <Center mt={14}>
        <Heading size="xl">500 - Server-side error occurred</Heading>
      </Center>
    </Container>
  )
}

export default ServerErrorPage
