import NextHead from "next/head";
import {
  Flex,
  VStack,
  Text,
  FormControl,
  FormLabel,
  Input,
  Avatar,
  Button,
  Image,
  Icon,
} from "@chakra-ui/react";
import { useState } from "react";

import { FcGoogle } from "react-icons/fc";
import getGoogleOAuthURL from "../src/utils/getGoogleUrl";
export default function Home() {
  return (
      <Flex
        overflow="hidden"
        bg="blackAlpha.500"
        borderRadius={14}
        alignItems="center"
        justifyContent="center"
        boxShadow="2xl"
        width="fit-content"

        height="fit-content"
        flexDir={{ base: "column", lg: "row" }}
      >
        <Image
          boxSize="60vmin"
          objectFit="cover"
          src="./hero.jpg"
          alt="hero-image"
        />

        <a href={getGoogleOAuthURL()}>
          
            <Button
            
            width={{ base: "60vmin", lg: "fit-content" }}
            height={{ base: "fit-content", lg: "60vmin" }}
            borderColor="blue"
            alignItems="center"
            justifyContent="center"
               p={'3vmin'}  
              gap={4}
              display="flex"
              flexDir={{base:'row' , lg:'column'}}
              
              _active={{
                bg: "slategrey",
              }}
              _hover={{
                bg: "blackAlpha.800",
              }} 
              bg="blackAlpha.300"
            >
              <Text as="h1" fontSize="clamp(.6rem , 4vmin , 2rem)">
                Sign in Using Google
              </Text>

              <Icon
                w='6vmin'
                h='6vmin'
                as={FcGoogle}
              />
            </Button>
         
        </a>
      </Flex>

  );
}
