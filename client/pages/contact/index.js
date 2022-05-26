
import React, { useState } from 'react'


import {Flex,Text, 
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  VStack,
  Button,
  HStack,} from '@chakra-ui/react'



const DashboardContact = () => {




  const [number, setNumber] = useState('')

  const handleNumber = (e) => setNumber(e.target.value)
  
  const isError = number === ''

  const userName = 'LOREM'

  return(
  <VStack
      h='60vmin'
      w={{base:'60vmin', lg:'70vmin'}}
      alignItems='start'
      justifyContent='center'
      py={4} 
      px={10}



      roundedRight={{base:'none' , lg:'2xl'}}
      roundedBottomLeft={{base:'2xl' , lg:'none'}}
      roundedBottomRight={'2xl'}


    
   
      
      shadow='2xl'
      bg='blackAlpha.700'>
   <HStack fontSize='clamp(1.6rem ,6vmin,5rem)' > 
      <Text as='h1'>Welcome ,</Text>
      <Text color='blue.400'> {userName}</Text>
    </HStack>
  <FormControl isRequired isInvalid={isError}>
    <FormLabel mt={4} htmlFor='contactnumber'>Phone Number</FormLabel>
    <Input id='contactnumber' type='number' onChange={handleNumber}/>
    <FormErrorMessage 
        fontSize='clamp(1rem,3vmin,1.6rem)'
        >
        Please enter your phone number
    </FormErrorMessage>
    <Button
       isDisabled={isError} 
        mt={4}
        bg='green.500'
        width={'full'}
        _hover={{
            bg:'green.800'
        }}
        _active={{
          bg:'green.400' , color:'blackAlpha.900'
        }}
      >Submit</Button>

    </FormControl>
  </VStack>
)
}


export default DashboardContact
