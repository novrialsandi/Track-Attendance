import "../css/content.css";
import {
	Box,
	Center,
	InputGroup,
	Input,
	Flex,
	Slider,
	SliderTrack,
	SliderFilledTrack,
	SliderThumb,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function Content() {
	return (
		<Center h={"100vh"} w={"100vw"}>
			<Box id="boxLogin" w={"390px"} h={"844px"}>
				<Box h={"422px"} bg={"rgb(191,41,53)"}>
					<Center paddingTop={"40px"} paddingBottom={"20px"}>
						Live Attendance
					</Center>
					<Center>09:23</Center>
					<Center>Wed, 17 May 2023</Center>
					<Center>
						<Box id="boxCheck" w={"350px"} padding={"15px"}>
							<Flex
								justifyContent={"center"}
								flexDir={"column"}
								gap={"5px"}
							>
								<Center>Schedule</Center>
								<Center>SH2OPA</Center>
								<Center>08:00 - 17:00</Center>
								<Center>See 1 other attendance location</Center>
								<Center
									bg={"rgb(224,235,247)"}
									borderRadius={"15px"}
								>
									Selfie photo is required to Clock In/Out
								</Center>
								<Flex justifyContent={"center"} gap={"15px"}>
									<Flex
										w={"100%"}
										h={"50px"}
										justifyContent={"center"}
										alignItems={"center"}
										bg={"#035ebf"}
										borderRadius={"10px"}
									>
										Clock In
									</Flex>
									<Flex
										w={"100%"}
										h={"50px"}
										justifyContent={"center"}
										alignItems={"center"}
										bg={"#035ebf"}
										borderRadius={"10px"}
									>
										Clock Out
									</Flex>
								</Flex>
								<input type="range" value="0" class="pullee" />
							</Flex>
						</Box>
					</Center>
				</Box>
			</Box>
		</Center>
	);
}
