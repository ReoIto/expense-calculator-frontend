import NewGroupForm from '@/components/NewGroupForm'
import { Container, Center } from '@chakra-ui/react'

const New = () => {
  return (
    <Container alignItems="center">
      <Center color="text" fontSize="lg">
        新規グループ作成
      </Center>
      <NewGroupForm />
    </Container>
  )
}

export default New
