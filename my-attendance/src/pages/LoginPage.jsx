import "../css/login.css";
import { Box, Center, InputGroup, Input } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function Login() {
	return (


		
		<Center h={"100vh"} w={"100vw"}>
			<Box id="boxLogin" w={"390px"} h={"844px"}>
				<Center
					h={"100%"}
					display={"flex"}
					flexDir={"column"}
					alignItems={"center"}
				>
					<Center paddingTop={"40px"} paddingBottom={"20px"}>
						Sign into your Account
					</Center>
					<Box>
						<InputGroup
							gap={"20px"}
							paddingLeft={"30px"}
							paddingRight={"30px"}
							paddingBottom={"20px"}
							display={"flex"}
							flexDir={"column"}
							justifyContent={"center"}
							alignItems={"center"}
						>
							<Input
								placeholder="Email"
								w={"300px"}
								h={"48px"}
								border={"1px solid #A5A5A5"}
							></Input>
							<Input
								placeholder="Password"
								w={"300px"}
								h={"48px"}
								border={"1px solid #A5A5A5"}
								id="password"
								type={"password"}
							></Input>
						</InputGroup>
					</Box>

					<Center
						w={"150px"}
						h={"48px"}
						borderRadius={"25px"}
						border={"1px solid #A5A5A5"}
					>
						LOGIN
					</Center>

					<Center paddingTop={"20px"}>Don't have an account?</Center>

					<Link to={"/register"}>
						<Center color={"blue.600"} textDecor={"underline"}>
							SIGN UP
						</Center>
					</Link>
				</Center>
			</Box>
		</Center>
	);
}
