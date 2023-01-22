import { NextPage } from 'next'
import NewGroupForm from '@/components/NewGroupForm'
import { Container, Center } from '@chakra-ui/react'

const New: NextPage = () => {
  return (
    <Container alignItems="center">
      <Center color="text" fontSize="xl" fontWeight="semibold">
        新規グループ作成
      </Center>
      <NewGroupForm />
    </Container>
  )
}

export default New
