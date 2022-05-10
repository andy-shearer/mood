import NextHead from 'next/head'
import Image from 'next/image'
import {
  Flex, 
  VStack , 
  Text,
  FormControl,
  FormLabel,
  Input,
  Avatar,
  Button} from '@chakra-ui/react'
import { useState } from 'react'


export default function Home() {

    
    const [namevalue , setNamevalue] = useState('') 
      
    const handleNameChange = (e) =>setNamevalue(e.target.value)

    
    const [emailvalue , setEmailValue] = useState('')
    
    const handleEmailChange = (e) => setEmailValue(e.target.value)

    const isError = namevalue === '' || emailvalue === ''

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
            gap={20}
            bg='blackAlpha.500'
            borderRadius={14}
            alignItems='center'
            justifyContent='space-around'
            boxShadow='2xl'
            width='fit-content'
            maxW='90%'
            height='fit-content'
            
            flexDir={{base:'column' ,  lg:'row' }}
            >
       
          <VStack
            px={10}
            py={20}
              >
              <Text as='h1'
                  fontSize='clamp(1.8rem , 5vmin , 2.5rem)'  
                  >Mood Diary NFT
        
               </Text>
          </VStack>
        
        <FormControl
            isInvalid={isError}
            isRequired
            bg='blackAlpha.400'
            px={10}
            py={20}  
             maxW='80vw'
              width='inherit' 
              >
            
            <Avatar></Avatar>
            <FormLabel htmlFor='name' mt='4' >Name</FormLabel> 
            <Input 
                value={namevalue}
               onChange={handleNameChange} 
              id='name' placeholder='Enter your name' />
            <FormLabel mt='4'>Email</FormLabel>
            <Input
              value={emailvalue}
              onChange={handleEmailChange}
              isRequired
              id='email'
              type='email'
              placeholder='Enter your email' 
              />
        <Button
           isDisabled={isError} 
            mt='4'
            width='full'
            _hover={{bg:'blue.900'}}
            bg='blue.400'
            type='submit' >
            Submit
        </Button>
      </FormControl>


        </Flex>
  

      


        

      </Flex>
    
      
  )
}
