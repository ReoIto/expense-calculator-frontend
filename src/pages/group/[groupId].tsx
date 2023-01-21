import { GetServerSideProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import NextLink from 'next/link'
import axios from 'axios'
import {
  Link as ChakraLink,
  Box,
  Card,
  CardBody,
  CardHeader,
  Container,
  Heading,
  HStack,
  Button,
} from '@chakra-ui/react'
import Const from '@/utils/constants'
import Utils from '@/utils/utils'

type Props = {
  group: {
    name: string
    description: string
  }
  users: {
    name: string
  }[]
}

const Group: NextPage<Props> = (props: Props) => {
  const router = useRouter()
  const newExpensePagePath = Const.FRONT.NEW_EXPENSE_PATH.replace(
    ':id',
    router.query.groupId.toString(),
  )

  return (
    <Container color="text">
      <Card bgColor="purple.100">
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
      <Box color="text">
        <ChakraLink as={NextLink} href={newExpensePagePath}>
          <Button
            p={7}
            my={4}
            width="full"
            colorScheme="purple"
            variant="outline"
            rounded="button"
          >
            立替え記録を追加する
          </Button>
        </ChakraLink>
      </Box>
    </Container>
  )
}

export default Group

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { groupId } = context.query
  const endPoint: string = Const.API.SHOW_GROUP_PATH.replace(
    ':id',
    groupId.toString(),
  )
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
