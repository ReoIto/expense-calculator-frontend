import { ChakraProvider } from '@chakra-ui/react'

import theme from '../theme'
import { AppProps } from 'next/app'
import { Header } from '@/components/Header'

import { Box } from '@chakra-ui/react'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Box height="100vh" bgColor="containerBgColor">
        <Header />
        <Component {...pageProps} />
      </Box>
    </ChakraProvider>
  )
}

export default MyApp
