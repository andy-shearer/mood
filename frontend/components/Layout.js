

import React, { ReactNode } from 'react'

import NavBar from '../components/NavBar'
import NextHead from 'next/head'
import {Flex ,chakra, Box, ChakraProvider } from '@chakra-ui/react'


const Layout = ({children , router}) => {
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
          <NavBar />
          
          {children} 

      </Flex>
    )

}


export default Layout
