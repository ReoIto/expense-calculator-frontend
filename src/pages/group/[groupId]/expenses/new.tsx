import { GetServerSideProps, NextPage } from 'next'
import axios from 'axios'
import Const from '@/utils/constants'
import Utils from '@/utils/utils'
import { Container, Heading } from '@chakra-ui/react'
import CreateExpenseForm from '@/components/CreateExpenseRecordForm'

type Props = {
  group: {
    name: string
    description: string
  }
  users: {
    name: string
  }[]
}

const New: NextPage<Props> = (props) => {
  return (
    <Container color="text">
      <Heading>立替え記録登録</Heading>
      <CreateExpenseForm />
    </Container>
  )
}

export default New

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
