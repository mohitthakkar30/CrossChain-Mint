import Head from "next/head";
import {
  Heading,
  Container,
  Text,
  Button,
  Stack,
  Icon,
  useColorModeValue,
  createIcon,
  Box,
  chakra,
  Flex,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  Spinner,
} from "@chakra-ui/react";
import { ReactNode, useEffect, useState } from "react";
import { BsFileImage } from "react-icons/bs";
import MyImage from "../components/MyImage";
import myNft from "../../public/nft.jpeg";
import { fetchSigner, getNetwork } from "@wagmi/core";
import { ethers, Signer } from "ethers";
import abi from "../abi/abi";
import { useAccount, useProvider } from "wagmi";
import NftCard from "../components/NftCard";
import Moralis from "moralis";
import { EvmChain } from "@moralisweb3/common-evm-utils";

interface StatsCardProps {
  title: string;
  stat: string;
  icon: ReactNode;
}
function StatsCard(props: StatsCardProps) {
  const { title, stat, icon } = props;
  return (
    <Stat
      px={{ base: 2, md: 4 }}
      py={"5"}
      shadow={"xl"}
      border={"2px solid"}
      background={"black.900"}
      borderColor={useColorModeValue("gray.800", "gray.500")}
      rounded={"lg"}
    >
      <Flex justifyContent={"space-between"}>
        <Box pl={{ base: 2, md: 4 }}>
          <StatLabel fontWeight={"medium"} isTruncated>
            {title}
          </StatLabel>
          <StatNumber fontSize={"2xl"} fontWeight={"medium"}>
            {stat}
          </StatNumber>
        </Box>
        <Box
          my={"auto"}
          color={useColorModeValue("gray.800", "gray.200")}
          alignContent={"center"}
        >
          {icon}
        </Box>
      </Flex>
    </Stat>
  );
}

export default function CallToActionWithAnnotation() {
  const { chain, chains } = getNetwork();
  const [updating, setUpdating] = useState(false);
  const [shmBalance, setShmBalance] = useState("0");
  const [mumbaiBalance, setMumbaiBalance] = useState("0");
  const [sepoliaBalance, setSepoliaBalance] = useState("0");
  const account: any = useAccount();
  const provider = useProvider();

  useEffect(() => {
    getNftBalanceShm();
  });

  useEffect(()=>{
    runApp()
  },[])

  const runApp = async () => {
    try{
      await Moralis.start({
        apiKey:
          "jIReoOB4Lfe3SzHBh41SSJ6HgLYxQNW8mDoi1QXN16Acf3ZDhwGVvdeoTK3Qq2wY",
      });

    const allNFTs = [];
    const address = account.address
    const chains = [EvmChain.SEPOLIA, EvmChain.MUMBAI,];

    for (const chain of chains) {
      const response = await Moralis.EvmApi.nft.getWalletNFTs({
        address,
        chain,
      });

      allNFTs.push(response);
    }
    console.log(allNFTs);
    // @ts-ignore: Object is possibly 'null'.
    setSepoliaBalance(allNFTs[0].jsonResponse.result.length);
    // @ts-ignore: Object is possibly 'null'.
    setMumbaiBalance(allNFTs[1].jsonResponse.result.length);
  }catch(e){
    console.log(e);
  }
  };

  let contractAddress = "";
  // @ts-ignore: Object is possibly 'null'.
  if (chain?.id == "8081")
    contractAddress = "0x650224BCeEF8e9821ACB5a97deB64f211d58972f";
  // @ts-ignore: Object is possibly 'null'.
  if (chain?.id == "80001")
    contractAddress = "0xA268bE1a2930dfa0E5415c67F3Fe8Ae8ADa528A0";
  // @ts-ignore: Object is possibly 'null'.
  if (chain?.id == "11155111")
    contractAddress = "0x6b657D1bD2Fa3EE02312E7bFB93fc392edF7964C";

  console.log("CHain ", chain?.id);

  const mint = async () => {
    setUpdating(true);
    const signer: any = await fetchSigner();
    console.log("Contract - ", contractAddress);

    const contract = new ethers.Contract(contractAddress, abi, signer);
    try {
      const result = await contract.mint(1);
      console.log("Result - ", result);
    } catch (e: any) {
      alert(e.message);
    } finally {
      setUpdating(false);
    }
  };

  const getNftBalanceShm = async () => {
    const contract = new ethers.Contract(contractAddress, abi, provider);
    const res = await contract.balanceOf(account.address);
    console.log("address.address", account.address);

    console.log("Total NFT's for this contract - ", res.toString());
    setShmBalance(res.toString());
  };

  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Caveat:wght@700&display=swap"
          rel="stylesheet"
        />
      </Head>

      <Container maxW={"3xl"}>
        <Stack
          as={Box}
          textAlign={"center"}
          spacing={{ base: 8, md: 4 }}
          py={{ base: 20 }}
        >
          <Heading
            fontWeight={600}
            fontSize={{ base: "2xl", sm: "4xl", md: "6xl" }}
            lineHeight={"110%"}
          >
            Mint your <br />
            <Text as={"span"} color={"green.400"}>
              NFT
            </Text>
          </Heading>
          <Text color={"gray.900"}>
            You can mint on Shardeum Testnet, Polygon Mumbai and Sepolia,
          </Text>
          {/* <Text color={"gray.800"}>
            just change the network as per your choice
          </Text> */}
          <NftCard
            onClick={mint}
            config={updating ? <Spinner animation="border"></Spinner> : "Mint"}
          />

        </Stack>
      </Container>
      <Box maxW="7xl" mx={"auto"} pt={1} px={{ base: 2, sm: 12, md: 17 }}>
        <chakra.h1
          textAlign={"center"}
          fontSize={"4xl"}
          py={10}
          fontWeight={"bold"}
        >
          Below are the total NFTs available on your address
        </chakra.h1>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 5, lg: 8 }}>
          <StatsCard
            title={"Total NFTs for this contract on this network"}
            stat={shmBalance}
            icon={<BsFileImage size={"3em"} />}
          />
          <StatsCard
            title={"Total NFTs on Polygon Mumbai"}
            stat={mumbaiBalance}
            icon={<BsFileImage size={"3em"} />}
          />
          <StatsCard
            title={"Total NFTs on Sepolia"}
            stat={sepoliaBalance}
            icon={<BsFileImage size={"3em"} />}
          />
        </SimpleGrid>
      </Box>
    </>
  );
}

const Arrow = createIcon({
  displayName: "Arrow",
  viewBox: "0 0 72 24",
  path: (
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0.600904 7.08166C0.764293 6.8879 1.01492 6.79004 1.26654 6.82177C2.83216 7.01918 5.20326 7.24581 7.54543 7.23964C9.92491 7.23338 12.1351 6.98464 13.4704 6.32142C13.84 6.13785 14.2885 6.28805 14.4722 6.65692C14.6559 7.02578 14.5052 7.47362 14.1356 7.6572C12.4625 8.48822 9.94063 8.72541 7.54852 8.7317C5.67514 8.73663 3.79547 8.5985 2.29921 8.44247C2.80955 9.59638 3.50943 10.6396 4.24665 11.7384C4.39435 11.9585 4.54354 12.1809 4.69301 12.4068C5.79543 14.0733 6.88128 15.8995 7.1179 18.2636C7.15893 18.6735 6.85928 19.0393 6.4486 19.0805C6.03792 19.1217 5.67174 18.8227 5.6307 18.4128C5.43271 16.4346 4.52957 14.868 3.4457 13.2296C3.3058 13.0181 3.16221 12.8046 3.01684 12.5885C2.05899 11.1646 1.02372 9.62564 0.457909 7.78069C0.383671 7.53862 0.437515 7.27541 0.600904 7.08166ZM5.52039 10.2248C5.77662 9.90161 6.24663 9.84687 6.57018 10.1025C16.4834 17.9344 29.9158 22.4064 42.0781 21.4773C54.1988 20.5514 65.0339 14.2748 69.9746 0.584299C70.1145 0.196597 70.5427 -0.0046455 70.931 0.134813C71.3193 0.274276 71.5206 0.70162 71.3807 1.08932C66.2105 15.4159 54.8056 22.0014 42.1913 22.965C29.6185 23.9254 15.8207 19.3142 5.64226 11.2727C5.31871 11.0171 5.26415 10.5479 5.52039 10.2248Z"
      fill="currentColor"
    />
  ),
});
