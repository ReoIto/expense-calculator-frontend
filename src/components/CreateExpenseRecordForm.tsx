import { useState } from 'react'
import axios from 'axios'
import { useForm, Controller, SubmitHandler } from 'react-hook-form'
import Utils from '@/utils/utils'
import Const from '@/utils/constants'
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
  Input,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'

type Props = {
  users: Users
  closeModal(): 'function'
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
    paymentAmount: number
    // paymentMethod: string
  }
  payeeIds: string[]
}

const CreateExpenseRecordForm = ({ users, closeModal }: Props) => {
  const router = useRouter()
  const [errorMessage, setErrorMessage] = useState('')
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<InputValues>()

  const onSubmit: SubmitHandler<InputValues> = (data): void => {
    const postData = {
      groupId: router.query.groupId,
      payer: {
        id: data.payer.id,
        expenseReason: data.payer.expenseReason,
        paymentAmount: data.payer.paymentAmount,
        // paymentMethod: data.payer.paymentMethod,
      },
      payeeIds: data.payeeIds,
    }

    const successCallback = (responseJson): void => {
      closeModal()
    }

    const failedCallback = (responseJson): void => {
      const { errors } = responseJson
      setErrorMessage(errors)
    }

    const request = axios({
      method: 'POST',
      url: `${Utils.getApiUrlBase()}${Const.API.CREATE_EXPENSE_RECORD_PATH}`,
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
      <FormControl isInvalid={errors.payer?.id && true} color="text">
        <Select {...register('payer.id')} id="payer.id">
          {users.map((user) => (
            <option value={user.id} key={`payer-${user.id}`}>
              {user.name}
            </option>
          ))}
        </Select>
        <FormLabel htmlFor="payer.id">が</FormLabel>
      </FormControl>

      <FormControl isInvalid={errors.payeeIds && true} color="text">
        <Controller
          name="payeeIds"
          control={control}
          // defaultValueが正しく効いてないからvaluesがnullになってしまう
          // rules={{
          //   validate: {
          //     greaterThanZero: (values) => values.length > 0,
          //   },
          // }}
          render={({ field: { ref, ...rest } }) => (
            <CheckboxGroup
              {...rest}
              colorScheme="purple"
              defaultValue={users.map((user) => user.id)}
            >
              {users.map((payee) => {
                return (
                  <Checkbox name="payeeIds" key={payee.id} value={payee.id}>
                    {payee.name}
                  </Checkbox>
                )
              })}
            </CheckboxGroup>
          )}
        />
        {/* {errors.payeeIds?.type === 'greaterThanZero' &&
          renderFormErrorMessage('1人以上選択してください')} */}
        <FormLabel htmlFor="payeeIds">の</FormLabel>
      </FormControl>

      <FormControl isInvalid={errors.payer?.expenseReason && true} color="text">
        <Input
          id="payer.expenseReason"
          placeholder="例）チケット代"
          {...register('payer.expenseReason', {
            required: '入力は必須です',
            maxLength: {
              value: 20,
              message: '20文字以内で入力してください',
            },
          })}
        ></Input>
        {errors.payer?.expenseReason &&
          renderFormErrorMessage(errors.payer.expenseReason.message.toString())}
        <FormLabel htmlFor="payer.expenseReason">を支払って</FormLabel>
      </FormControl>

      <FormControl isInvalid={errors.payer?.paymentAmount && true} color="text">
        <Controller
          name="payer.paymentAmount"
          control={control}
          rules={{ required: true, maxLength: 8 }}
          render={({ field }) => (
            <NumberInput {...field}>
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          )}
        ></Controller>
        {errors.payer?.paymentAmount?.type === 'required'
          ? renderFormErrorMessage('入力は必須です')
          : renderFormErrorMessage('8文字以下の半角数字で入力してください')}
        <FormLabel htmlFor="payer.paymentAmount">円かかった</FormLabel>
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
