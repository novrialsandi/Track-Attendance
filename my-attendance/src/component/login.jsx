import "../css/login.css";
import { Box, Center, InputGroup, Input } from "@chakra-ui/react";

export default function Login() {
	return (
		<Center
			h={"100vh"}
			w={"100vw"}
			justifyContent={"center"}
			alignItems={"center"}
		>
			<Box
				id="boxContact"
				w={"390px"}
				h={"844px"}
				justifyContent={"center"}
				alignItems={"center"}
			>
				<Center>Login</Center>
				<Box>
					<InputGroup
						paddingLeft={"30px"}
						paddingRight={"30px"}
						display={"flex"}
						flexDir={"column"}
						justifyContent={"center"}
						alignItems={"center"}
					>
						<Input
							placeholder="Email/Username"
							w={"80%"}
							h={"48px"}
							border={"1px solid #A5A5A5"}
						></Input>
						<Input
							placeholder="Password"
							w={"80%"}
							h={"48px"}
							border={"1px solid #A5A5A5"}
							id="password"
							type={"password"}
						></Input>
					</InputGroup>
				</Box>
				<Center paddingLeft={"30px"} paddingRight={"30px"}>
					<Center
						w={"60%"}
						h={"48px"}
						borderRadius={"25px"}
						color={"black"}
						border={"1px solid #A5A5A5"}
						bgColor={"rgb(173,173,173"}
					>
						LOGIN
					</Center>
				</Center>

				<Center>Don't have an account?</Center>

				<Center>SIGN UP</Center>
			</Box>
		</Center>
	);
}
