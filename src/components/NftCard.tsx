import { useState } from 'react';
import {
  Box,
  Heading,
  Text,
  Img,
  Flex,
  Center,
  useColorModeValue,
  HStack,
  Button,
  propNames,
  Spinner,
} from '@chakra-ui/react';
import { BsArrowUpRight, BsHeartFill, BsHeart } from 'react-icons/bs';

interface NftProps{
    onClick:any
    config:any
}
export default function NftCard(props: NftProps) {
  const [liked, setLiked] = useState(false);

  return (
    <Center py={6}>
      <Box
        w="xs"
        rounded={'sm'}
        my={5}
        mx={[0, 5]}
        overflow={'hidden'}
        bg="white"
        border={'1px'}
        borderColor="black"
        boxShadow={useColorModeValue('6px 6px 0 black', '6px 6px 0 cyan')}>
        <Box h={'400px'} borderBottom={'1px'} borderColor="black">
          <Img
            src={"/nft.jpeg"}
            roundedTop={'sm'}
            objectFit="cover"
            h="400px"
            w="full"
            alt={'NFT Image'}
          />
        </Box>
        <Box p={4}>
          <Box
            bg="black"
            display={'inline-block'}
            px={2}
            py={1}
            color="white"
            mb={5}>
            <Text fontSize={'xs'} fontWeight="medium">
            Sample NFT
            </Text>
          </Box>
          <Button
              onClick={props.onClick}
              colorScheme={"green"}
              bg={"green.400"}
              rounded={"full"}
              width={"30vh"}
              color={'bold'}
              px={6}
              _hover={{
                bg: "green.500",
              }}
            >
             {props.config}
            </Button>

        </Box>
      </Box>
    </Center>
  );
}