

import {Box, ChakraProvider} from '@chakra-ui/react'

import Layout from '../components/Layout'

import{motion , AnimatePresence} from 'framer-motion'


function MyApp({ Component, pageProps ,router }) {

 const wrapperAnim = {
  hidden : {x:300 , opacity: 0 } ,
  show: {x:0, opacity: 1 ,  
        transition: {
              duration:.75,

              ease:[.6,.01,-.05,.95],
          } },
  exit: {y:300, opacity:0 , transition :{duration:.5}}

}
 return (
<ChakraProvider>  
    <Layout>
 
 <AnimatePresence exitBeforeEnter>
          <Box  
              key={router.route}
              as={motion.div}
              variants={wrapperAnim}
              initial='hidden'
              animate='show'
              exit='exit' 
              display='grid'
              placeItems='center'
              height='fit-content' 
              w='fit-content' > 
       <Component {...pageProps} /> 
   
        </Box>

</AnimatePresence>
   </Layout>
 
</ChakraProvider>
  )


}

export default MyApp
