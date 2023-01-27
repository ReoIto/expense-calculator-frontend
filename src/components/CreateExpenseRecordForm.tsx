import { useState } from 'react'
import { useForm, Controller, SubmitHandler } from 'react-hook-form'
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Button,
  Box,
  Alert,
  AlertIcon,
  Select,
  Checkbox,
  CheckboxGroup,
} from '@chakra-ui/react'

type Props = {
  users: Users
}

type Users = {
  id: string
  name: string
  created_at: string
  updated_at: string
}[]

type InputValues = {
  payer: {
    id: string
    expenseReason: string
    paymentMethod: string
  }
  payeeIds: string[]
}

const CreateExpenseRecordForm = (props: Props) => {
  const { users } = props
  const [errorMessage, setErrorMessage] = useState('')
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<InputValues>()

  const onSubmit: SubmitHandler<InputValues> = (data): void => {
    const postData: InputValues = {
      payer: {
        id: data.payer.id,
        expenseReason: data.payer.expenseReason,
        paymentMethod: data.payer.paymentMethod,
      },
      payeeIds: data.payeeIds,
    }

    console.log(postData)

    const successCallback = (responseJson): void => {}

    const failedCallback = (responseJson): void => {
      // const { errors } = responseJson
      // setErrorMessage(errors)
    }

    // const request = axios({
    //   method: 'POST',
    //   url: `${Utils.getApiUrlBase()}${Const.API.CreateExpenseRecordPath}`,
    //   data: postData,
    // })
    // Utils.createRequest(request, successCallback, failedCallback)
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
      <FormControl isInvalid={errors.payer && true} color="text">
        <Select {...register('payer.id')}>
          {users.map((user) => (
            <option value={user.id} key={`payer-${user.id}`}>
              {user.name}
            </option>
          ))}
        </Select>
        <FormLabel htmlFor="payer.id">が</FormLabel>
      </FormControl>

      <FormControl>
        <Controller
          name="payeeIds"
          control={control}
          render={({ field: { ref, ...rest } }) => (
            <CheckboxGroup {...rest} colorScheme="purple">
              {props.users.map((payee) => {
                return (
                  <Checkbox name="payeeIds" key={payee.id} value={payee.id}>
                    {payee.name}
                  </Checkbox>
                )
              })}
            </CheckboxGroup>
          )}
        />
      </FormControl>

      <Button
        type="submit"
        colorScheme="purple"
        width="full"
        mt={9}
        isLoading={isSubmitting}
        isDisabled={isSubmitting}
      >
        追加
      </Button>
    </form>
  )
}

export default CreateExpenseRecordForm
