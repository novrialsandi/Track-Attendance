import { Center, Box, Flex, Icon } from "@chakra-ui/react";
import { AiOutlineArrowLeft, AiOutlinePlusSquare } from "react-icons/ai";
import { Link } from "react-router-dom";

export default function Log() {
	return (
		<Center h={"100vh"} w={"100vw"}>
			<Box id="boxLogin" w={"390px"} h={"844px"}>
				<Box w={"100%"} bg={"rgb(191,41,53)"} borderTopRadius={"30px"}>
					<Flex
						fontSize={"30px"}
						color={"white"}
						alignItems={"center"}
						padding={"10px"}
					>
						<Link to={"/"}>
							<Icon as={AiOutlineArrowLeft}></Icon>
						</Link>
						<Center paddingLeft={"45px"}>Live Attendance</Center>
					</Flex>
				</Box>
				<Flex
					justifyContent={"space-between"}
					w={"100%"}
					padding={"15px"}
					alignItems={"center"}
					borderBottom={"1px"}
				>
					<Flex>24 Jan</Flex>
					<Flex>07:45</Flex>
					<Flex>17:01</Flex>

					<Icon as={AiOutlinePlusSquare}></Icon>
				</Flex>
			</Box>
		</Center>
	);
}
