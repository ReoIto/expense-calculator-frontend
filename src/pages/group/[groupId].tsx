import { GetServerSideProps, NextPage } from 'next'
import axios from 'axios'
import {
  useColorModeValue,
  Box,
  Card,
  CardBody,
  CardHeader,
  Container,
  Heading,
  HStack,
  Button,
  useDisclosure,
} from '@chakra-ui/react'
import Const from '@/utils/constants'
import Utils from '@/utils/utils'
import CreateExpenseRecordModal from '@/components/modals/CreateExpenseRecordModal'

type Props = {
  group: {
    name: string
    description: string
  }
  users: {
    id: string
    name: string
    created_at: string
    updated_at: string
  }[]
}

const Group: NextPage<Props> = (props) => {
  const bgColorMode = useColorModeValue('purple.100', 'purple.500')
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <Container color="text">
      <Card bgColor={bgColorMode}>
        <CardHeader>
          <Heading size="xl">{props?.group?.name}</Heading>
          <Box as="span" color="gray.500">
            {props?.group?.description}
          </Box>
        </CardHeader>
        <CardBody pt={0}>
          <HStack>
            {props.users.map((user) => {
              return <Box key={user.name}>{`・${user.name}`}</Box>
            })}
          </HStack>
        </CardBody>
      </Card>
      <Button
        onClick={onOpen}
        p={7}
        my={4}
        width="full"
        colorScheme="purple"
        variant="outline"
        rounded="button"
      >
        立替え記録を追加する
      </Button>
      <CreateExpenseRecordModal
        isOpen={isOpen}
        onClose={onClose}
        users={props.users}
      />
    </Container>
  )
}

export default Group

export const getServerSideProps: GetServerSideProps = async (context) => {
  const groupId: string = context.query.groupId.toString()
  const endPoint: string = Const.API.SHOW_GROUP_PATH.replace(':id', groupId)
  const url: string = `${Utils.getApiUrlBase()}${endPoint}`
  try {
    const responseJson = await axios.get(url)
    const props = {
      group: {
        name: responseJson.data.group.name,
        description: responseJson.data.group.description,
      },
      users: responseJson.data.users,
    }

    return {
      props: props,
    }
  } catch (error) {
    return {
      notFound: true,
    }
  }
}
