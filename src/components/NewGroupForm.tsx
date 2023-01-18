import { useRouter } from 'next/router'
import axios from 'axios'
import { useForm, useFieldArray, SubmitHandler } from 'react-hook-form'
import { FormErrorMessage } from '@chakra-ui/react'
import {
  FormLabel,
  FormControl,
  Input,
  Button,
  Box,
  InputGroup,
  IconButton,
  Alert,
  AlertIcon,
} from '@chakra-ui/react'
import { AddIcon, DeleteIcon } from '@chakra-ui/icons'
import Utils from '@/utils/utils'
import Const from '@/utils/constants'
import { useState } from 'react'

const NewGroupForm = () => {
  type InputValues = {
    group: {
      name: string
      description: string
    }
    users: {
      name: string
    }[]
  }

  type GroupInfo = {
    id: string
    name: string
    description: string
    formattedCreatedAt: string
  }

  const router = useRouter()
  const [errorMessage, setErrorMessage] = useState('')

  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<InputValues>({
    defaultValues: {
      users: [{ name: 'メンバー１' }, { name: 'メンバー２' }],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'users',
  })

  const watchFieldArray = watch('users')
  const controlledFields = fields.map((field, index) => {
    return {
      ...field,
      ...watchFieldArray[index],
    }
  })

  const onSubmit: SubmitHandler<InputValues> = (data): void => {
    const postData: InputValues = {
      group: {
        name: data.group.name,
        description: data.group.description,
      },
      users: data.users,
    }

    const successCallback = (responseJson): void => {
      const newGroup: GroupInfo = {
        id: responseJson.group.id,
        name: responseJson.group.name,
        description: responseJson.group.description,
        formattedCreatedAt: responseJson.group.created_at,
      }

      let groups = JSON.parse(localStorage.getItem('groups'))
      if (groups === null) {
        groups = []
      }
      groups.push(newGroup)
      localStorage.setItem('groups', JSON.stringify(groups))
      router.push(`${Const.FRONT.SHOW_GROUP_PATH.replace(':id', newGroup.id)}`)
    }

    const failedCallback = (responseJson): void => {
      const { errors } = responseJson
      setErrorMessage(errors)
    }

    const request = axios({
      method: 'POST',
      url: `${Utils.getApiUrlBase()}${Const.API.CREATE_NEW_GROUP_PATH}`,
      data: postData,
    })
    Utils.createRequest(request, successCallback, failedCallback)
  }

  const renderFormErrorMessage = (message: string) => {
    return <FormErrorMessage>{message}</FormErrorMessage>
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {errorMessage && (
        <Box my={6}>
          <Alert status="error" variant="left-accent">
            <AlertIcon />
            {errorMessage}
          </Alert>
        </Box>
      )}
      <FormControl isInvalid={errors.group?.name && true} color="text">
        <FormLabel htmlFor="group.name">グループ名</FormLabel>
        <Input
          id="group.name"
          placeholder="例）沖縄旅行"
          {...register('group.name', {
            required: 'グループ名は必須です',
            maxLength: {
              value: 20,
              message: 'グループ名は20文字以内で入力してください',
            },
          })}
        />
        {errors.group?.name &&
          renderFormErrorMessage(errors.group.name.message.toString())}
      </FormControl>

      <FormControl isInvalid={errors.group?.description && true} color="text">
        <FormLabel htmlFor="group.description">グループ詳細</FormLabel>
        <Input
          id="group.desctiption"
          placeholder="10/17~10/20"
          {...register('group.description', {
            maxLength: {
              value: 50,
              message: 'グループ詳細は50文字以内で入力してください',
            },
          })}
        />
        {errors.group?.description &&
          renderFormErrorMessage(errors.group.description.message.toString())}
      </FormControl>

      <Box mt={4}>
        {controlledFields.map((field, index) => {
          return (
            <FormControl
              mb={2}
              isInvalid={errors.users?.[index]?.name && true}
              color="text"
              key={field.id}
            >
              <FormLabel htmlFor="users" color="text">
                {`${index + 1}人目`}
              </FormLabel>
              <InputGroup>
                <Input
                  placeholder="例）精算太郎"
                  {...register(`users.${index}.name` as const, {
                    required: 'メンバーの名前は必須です',
                    maxLength: {
                      value: 10,
                      message: 'メンバーの名前は10文字以内で入力してください',
                    },
                  })}
                />
                {index > 1 && (
                  <IconButton
                    aria-label="delete"
                    icon={<DeleteIcon />}
                    colorScheme="teal"
                    variant="outline"
                    type="button"
                    onClick={() => remove(index)}
                  />
                )}
              </InputGroup>
              {errors.users &&
                renderFormErrorMessage(
                  errors.users?.[index]?.name?.message?.toString(),
                )}
            </FormControl>
          )
        })}
      </Box>
      <Box>
        <Button
          my={4}
          variant="solid"
          size="sm"
          onClick={() => {
            append({
              name: '',
            })
          }}
          leftIcon={<AddIcon />}
        >
          行を追加
        </Button>
      </Box>
      <Button
        mt={16}
        p={7}
        width="full"
        colorScheme="teal"
        variant="outline"
        isLoading={isSubmitting}
        type="submit"
        size="lg"
      >
        グループを作成する
      </Button>
    </form>
  )
}

export default NewGroupForm
