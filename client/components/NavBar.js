import React, { useState } from 'react'
import {useRouter} from 'next/router'
import { Image , Flex , Box , chakra ,Menu ,Text, MenuItem, MenuButton, Button, MenuList, Icon, VStack} from '@chakra-ui/react'
import Link from 'next/link'

import {IoMdContact} from 'react-icons/io'


const NavBar = () => {
  
  const [showCon , setShowCon] = useState(false)

  const router = useRouter()

  console.log(router.asPath)
  


return(
  <Flex
      bg='blackAlpha.600'
      h={{base:'fit-content' , lg:'60vmin'}} 
      w={{base:'60vmin' , lg:'fit-content'}} 
      flexDir={{base:'row' , lg:'column'}}
      overflow='clip'
      shadow='md'
      roundedLeft={{base:'none' , lg:'2xl'}}
      roundedTopRight={{base:'2xl' , lg:'none'}} 
      roundedTopLeft='2xl'
      top={{base:'6' , lg:'10'}}
      right='10'
      >
        

        
            <Link href='/contact'>
          <Box
            w={{base:'50%' , lg:'100%'}}
            
           
            display='grid' placeItems='center' 
            as='a'
            fontSize={{base:'sm' , md:'md'}}
            textTransform={'capitalize'}
            cursor='pointer'
            transition='all 500ms ease'
            bg={`${router.asPath}` === '/contact'? 'blackAlpha.500' : 'blackAlpha.100'}

            px={4} py={4}
            _hover={{bg:'blackAlpha.700'}}
            _focus={{bg:'blackAlpha.700'}}
            > 
            <VStack>
              <Icon as={IoMdContact} w={'5vmin'} h={'5vmin'} />
              <Text as='h5' textDecoration= {`${router.asPath}` === '/contact'? 'underline' :'' } fontSize='xs'>Contact</Text>   
          </VStack>
              </Box> 
            </Link> 
    
          <Link href='/nftgallery'>
          <Box
            
            display='grid' placeItems='center' 
            
            w={{base:'50%' , lg:'100%'}}
           bg={`${router.asPath}` === '/nftgallery'? 'blackAlpha.500' : 'blackAlpha.100'}
            as='a'
            fontSize={{base:'sm' , md:'md'}}
            textTransform={'capitalize'}
            cursor='pointer'
            transition='all 500ms ease'
            px={4} py={4}
            _hover={{bg:'blackAlpha.700'}}
            _focus={{bg:'blackAlpha.700'}}
            > 
              <VStack>
                <Image boxSize={'5vmin'} src='./nft.png' alt='nft-logo' />
              <Text as='h5'  textDecoration= {`${router.asPath}` === '/nftgallery'? 'underline' :'' }fontSize='xs'>NFT Gallery</Text>   
              </VStack>
             </Box> 
            </Link> 
    



  </Flex>
)
}



export default NavBar
