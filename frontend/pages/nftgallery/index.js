import React from 'react'

import{Flex , Text ,Box} from '@chakra-ui/react'



const NftGallery = () => {


  return(
    <Flex
      py={4}
      px={10}
      shadow='2xl'
      alignItems='center'
      justifyContent='center'
      h='60vmin'     
      w={{base:'60vmin', lg:'70vmin'}}
      roundedRight={{base:'none' , lg:'2xl'}}
      roundedBottomLeft={{base:'2xl' , lg:'none'}}
      roundedBottomRight={'2xl'}
      bg='blackAlpha.700'
      
     
        >
      <Text fontSize='3xl'>NFT Gallery</Text>
    </Flex>
  )

}


export default NftGallery 
