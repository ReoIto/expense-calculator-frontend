import { FC } from 'react'
import NextLink from 'next/link'
import { Box, Flex, Link as ChakraLink, Spacer, Text } from '@chakra-ui/react'
import { DarkModeSwitch } from './DarkModeSwitch'

export const Header: FC = () => {
  return (
    <Box as="header" p={4} mb={4} bgColor="headerBgColor" boxShadow="xl">
      <Flex>
        <ChakraLink as={NextLink} href="/" color="text">
          <Text color="headerTitle" fontSize="3xl">
            WARI PAY
          </Text>
        </ChakraLink>
        <Spacer />
        <DarkModeSwitch />
      </Flex>
    </Box>
  )
}
