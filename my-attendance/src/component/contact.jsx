import "../css/contact.css";
import { Box, Center } from "@chakra-ui/react";

export default function Contact() {
	return (
		<Center
			h={"100vh"}
			w={"100vw"}
			justifyContent={"center"}
			alignItems={"center"}
		>
			<Box id="boxContact" w={"600px"} h={"700px"}></Box>
		</Center>
	);
}
