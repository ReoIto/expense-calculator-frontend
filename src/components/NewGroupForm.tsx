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
} from '@chakra-ui/react'
import { AddIcon, DeleteIcon } from '@chakra-ui/icons'
import Utils from '@/utils/utils'
import Const from '@/utils/constants'

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

  const onSubmit: SubmitHandler<InputValues> = async (data) => {
    const postData: InputValues = {
      group: {
        name: data.group.name,
        description: data.group.description,
      },
      users: data.users,
    }
    const JSONdata = JSON.stringify(postData)
    const apiUrlBase = Utils.getApiUrlBase()
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSONdata,
    }

    await fetch(`${apiUrlBase}${Const.API.CREATE_NEW_GROUP}`, {
      method: options.method,
      headers: options.headers,
      body: options.body,
    })
      .then((res) => res.json())
      .catch((e) => console.log(e))
  }

  const renderFormErrorMessage = (message: string) => {
    return <FormErrorMessage>{message}</FormErrorMessage>
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
        グループを決定する
      </Button>
    </form>
  )
}

export default NewGroupForm
