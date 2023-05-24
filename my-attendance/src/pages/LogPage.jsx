import { Center, Box, Flex, Icon, Input } from "@chakra-ui/react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { Link } from "react-router-dom";

export default function Log() {
	return (
		<Center h={"100vh"} w={"100vw"}>
			<Box id="boxLogin" w={"390px"} h={"844px"}>
				<Box
					w={"100%"}
					bg={"rgb(191,41,53)"}
					borderTopRadius={"30px"}
					borderBottom={"1px"}
				>
					<Flex
						fontSize={"30px"}
						color={"white"}
						alignItems={"center"}
						padding={"10px"}
					>
						<Link to={"/"}>
							<Icon as={AiOutlineArrowLeft}></Icon>
						</Link>
						<Center paddingLeft={"45px"}>Attendance Log</Center>
					</Flex>
					<Flex flexDir={"column"} padding={"15px"} fontSize={"20px"}>
						<Flex>Select month:</Flex>
						<Input type="month" />
					</Flex>
				</Box>
				<Flex
					justifyContent={"space-between"}
					w={"100%"}
					padding={"15px"}
					alignItems={"center"}
					borderBottom={"1px"}
				>
					<Flex
						w={"25%"}
						justifyContent={"center"}
						fontWeight={"bold"}
						border={"1px"}
						borderRadius={"5px"}
					>
						Date
					</Flex>
					<Flex
						w={"25%"}
						justifyContent={"center"}
						fontWeight={"bold"}
						border={"1px"}
						borderRadius={"5px"}
					>
						Clock In
					</Flex>
					<Flex
						w={"25%"}
						justifyContent={"center"}
						fontWeight={"bold"}
						border={"1px"}
						borderRadius={"5px"}
					>
						Clock Out
					</Flex>
				</Flex>
				<Flex
					justifyContent={"space-between"}
					w={"100%"}
					padding={"15px"}
					alignItems={"center"}
					borderBottom={"1px"}
				>
					<Flex w={"25%"} justifyContent={"center"}>
						24 Jan
					</Flex>
					<Flex w={"25%"} justifyContent={"center"}>
						07:45
					</Flex>
					<Flex w={"25%"} justifyContent={"center"}>
						17:01
					</Flex>
				</Flex>
			</Box>
		</Center>
	);
}
