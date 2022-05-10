import NextHead from 'next/head'
import {
  Flex, 
  VStack , 
  Text,
  FormControl,
  FormLabel,
  Input,
  Avatar,
  Button,
  Image,
  Icon} from '@chakra-ui/react'
import { useState } from 'react'

import {FcGoogle} from 'react-icons/fc'
export default function Home() {


  return (

      <Flex
          textColor='whiteAlpha.800'
          minH='100vh'
          minW='100vw'
          bg='blackAlpha.800'
          alignItems='center'
          justifyContent='center'
            >
      <NextHead>
        <title>Mood Diary</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </NextHead>
      
          

        <Flex
            overflow='hidden'
            
            bg='blackAlpha.500'
            borderRadius={14}
            alignItems='center'
            justifyContent='center'
            boxShadow='2xl'
            width='fit-content'
            maxW='90%'
            height='fit-content'
            
            flexDir={{base:'column' ,  lg:'row' }}
            >
  
          <Image
              boxSize='60vh'
              objectFit='cover' 
              src='./hero.jpg' alt='hero-image' />
      
        
         <Flex
            
              width={{base:'100%' , lg:'fit-content'}}
            height={{base:'10rem' , lg:'60vh'}}
            borderColor='blue'
            alignItems='center'
            justifyContent='center'
              > 
      
          <Button
              gap={4}
              display='flex'
              flexDir='column'
              justifyContent='center'
              width='full'
              px='12'
              _active={{
                  bg:'slategrey'
              }}
              _hover={{
                   bg:'blackAlpha.800' 
              }}
              borderRadius={0}
              height='full'
              bg='blackAlpha.300'>
            <Text as='h1' fontSize='clamp(1.6rem , 3vmin , 2.3rem)'>Sign in Using Google</Text>
            
          <Icon w={{base:'12', lg:'16'}} h={{base:'12', lg:'16'}} as={FcGoogle} / >
      
        </Button>
          
        </Flex>

        </Flex>
  

                 


        

      </Flex>
    
      
  )
}
