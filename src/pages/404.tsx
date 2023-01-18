import { Center, Container, Heading } from '@chakra-ui/react'

const NotFoundPage = () => {
  return (
    <Container color="red.300">
      <Center mt={14}>
        <Heading size="xl">404 - Page Not Found</Heading>
      </Center>
    </Container>
  )
}

export default NotFoundPage
