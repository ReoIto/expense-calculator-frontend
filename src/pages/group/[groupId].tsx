import { GetServerSideProps, NextPage } from 'next'
import axios from 'axios'
import { Box, Center, Container, Heading, HStack, Text } from '@chakra-ui/react'
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
  return (
    <Container color="text">
      <Center my={4}>
        <Heading size="xl">{props?.group?.name}</Heading>
      </Center>
      <Center>
        <Text>{props?.group?.description}</Text>
      </Center>
      <HStack justifyContent="center" mx="4">
        {props.users.map((user) => {
          return <Box key={user.name}>{user.name}</Box>
        })}
      </HStack>
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
