import { FC } from 'react'
import NextLink from 'next/link'
import {
  Box,
  Container,
  Flex,
  Link as ChakraLink,
  Spacer,
  Text,
} from '@chakra-ui/react'
import { DarkModeSwitch } from './DarkModeSwitch'

export const Header: FC = () => {
  return (
    <Container>
      <Flex as="header" py={4}>
        <Box p={2}>
          <ChakraLink as={NextLink} href="/" color="text">
            <Text color="text" fontSize="3xl">
              WARI PAY
            </Text>
          </ChakraLink>
        </Box>
        <Spacer />
        <DarkModeSwitch />
      </Flex>
    </Container>
  )
}
