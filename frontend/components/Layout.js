

import React, { ReactNode } from 'react'
import {useRouter} from 'next/router'
import NavBar from '../components/NavBar'
import NextHead from 'next/head'
import {Flex ,chakra, Box, ChakraProvider } from '@chakra-ui/react'
import { COOKIE_NAME_PRERENDER_DATA } from 'next/dist/server/api-utils'


const Layout = ({children}) => {
   
  const router = useRouter()
  console.log(router.asPath)

    return( 
    
      <Flex      
        flexDir={{base:'column' , lg:'row'}}        
        textColor="whiteAlpha.800"
        minH="100vh"
        minW="100vw"
        bg="blackAlpha.800"
        alignItems="center"
        justifyContent="center"
          > 
      <NextHead>
        <title>Mood Diary</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </NextHead>
         
         { `${router.asPath}` === '/' ? ''  :  <NavBar /> }
          
          {children} 

      </Flex>
    )

}


export default Layout
