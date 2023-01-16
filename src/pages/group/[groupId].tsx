import { GetServerSideProps, NextPage } from 'next'
import { Box, Center, Container, Heading, Text } from '@chakra-ui/react'
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
      <Box>
        {props.users.map((user, i) => {
          return <p key={i}>{user.name}</p>
        })}
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
  const resultJson = await Utils.createRequest({
    endPoint: endPoint,
    method: 'GET',
  })
  const props = {
    group: {
      name: resultJson.group.name,
      description: resultJson.group.description,
    },
    users: resultJson.users,
  }

  return {
    props: props,
  }
}
