import { GetServerSideProps } from 'next'
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

const Group = (props: Props) => {
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
  const endPoint = `${Utils.getApiUrlBase()}${Const.API.SHOW_GROUP_PATH.replace(
    ':id',
    groupId.toString(),
  )}`
  const res = await fetch(endPoint)
  const data = await res.json()
  const props = {
    group: {
      name: data.group.name,
      description: data.group.description,
    },
    users: data.users,
  }

  return {
    props: props,
  }
}
