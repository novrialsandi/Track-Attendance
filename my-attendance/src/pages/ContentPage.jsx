import "../css/content.css";
import { Avatar, Box, Center, Flex, Icon } from "@chakra-ui/react";
import moment from "moment";
import React, { useState, useEffect } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Content() {
	const userSelector = useSelector((state) => state.auth);
	const [clock, setClock] = useState({});

	useEffect(() => {
		console.log(userSelector);
		if (userSelector.id) {
			getClock();
		}
	}, []);

	async function getClock() {
		const attLog = await axios.get(
			"http://localhost:2000/attendancelog/today",
			{
				params: { user_id: userSelector.id },
			}
		);
		setClock(attLog.data);
	}

	async function addClockIn() {
		await axios.post(
			"http://localhost:2000/attendancelog?user_id=" + userSelector.id
		);
		getClock();
	}
	async function addClockOut() {
		await axios.patch(
			"http://localhost:2000/attendancelog?user_id=" + userSelector.id
		);
		getClock();
	}

	const [time, setTime] = useState(moment());
	const Clock = () => {
		useEffect(() => {
			const interval = setInterval(() => {
				setTime(moment());
			}, 1000);

			return () => {
				clearInterval(interval);
			};
		}, []);

		return (
			<div>
				<Center fontSize={"30px"} fontWeight={"bold"} color={"white"}>
					{time.format("LTS")}
				</Center>
			</div>
		);
	};

	const [date, setDate] = useState(moment());
	const Date = () => {
		useEffect(() => {
			const interval = setInterval(() => {
				setDate(moment());
			}, 1000);

			return () => {
				clearInterval(interval);
			};
		}, []);

		return (
			<div>
				<Center>{date.format("LL")}</Center>
			</div>
		);
	};

	return (
		<Center h={"100vh"} w={"100vw"}>
			<Box id="boxLogin" w={"390px"} h={"844px"} maxH={"844px"}>
				<Box h={"480px"} bg={"rgb(191,41,53)"} borderRadius={"30px"}>
					<Center
						paddingTop={"40px"}
						paddingBottom={"10px"}
						fontSize={"30px"}
						color={"white"}
					>
						Live Attendance
					</Center>
					<Center>
						<Avatar marginY={"5px"} src={userSelector.avatar_url} />
					</Center>
					<Center color={"white"}>{Date()}</Center>
					<Center id="date">{Clock()}</Center>
					<Center>
						<Box
							id="boxCheck"
							w={"350px"}
							padding={"15px"}
							borderRadius={"15px"}
						>
							<Flex
								justifyContent={"center"}
								flexDir={"column"}
								gap={"5px"}
							>
								<Center color={"#9a9a9a"}>
									Schedule: {Date()}
								</Center>
								<Center fontWeight={"bold"}>SH2OPA</Center>
								<Center fontWeight={"bold"} fontSize={"22"}>
									08:00 - 17:00
								</Center>
								<Center color={"#617aca"}>
									See 1 other attendance location
								</Center>
								<Center
									bg={"rgb(224,235,247)"}
									borderRadius={"15px"}
									color={"#787677"}
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
										color={"white"}
										onClick={
											clock.clock_in ? addClockIn : null
										}
										cursor={"pointer"}
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
										color={"white"}
										onClick={
											clock.clock_out ? addClockOut : null
										}
										cursor={"pointer"}
									>
										Clock Out
									</Flex>
								</Flex>
							</Flex>
						</Box>
					</Center>
				</Box>
				<Box>
					<Flex
						justifyContent={"space-between"}
						w={"100%"}
						padding={"15px"}
						// borderBottom={"1px"}
					>
						<Flex fontSize={"22px"}>Attendance Log</Flex>
						<Link to={"/log"}>
							<Flex color={"#9a9a9a"}>View Log</Flex>
						</Link>
					</Flex>
				</Box>
				{clock.clock_in ? (
					<div>
						<Flex
							justifyContent={"space-between"}
							w={"100%"}
							paddingLeft={"15px"}
							paddingRight={"15px"}
							alignItems={"center"}
							borderBottom={"1px"}
							paddingTop={"20px"}
						>
							<Flex flexDir={"column"} w={"70px"}>
								<Flex>
									{moment(clock.clock_in).format("HH:mm")}
								</Flex>
								<Flex>
									{moment().format("ll").split(",")[0]}
								</Flex>
							</Flex>
							<Flex
								w={"70px"}
								justifyContent={"center"}
								id="clock"
							>
								Clock In
							</Flex>
							<Flex w={"70px"} justifyContent={"end"} id="icon">
								<Icon as={IoIosArrowForward}></Icon>
							</Flex>
						</Flex>
					</div>
				) : null}
				{clock.clock_out ? (
					<div>
						<Flex
							justifyContent={"space-between"}
							w={"100%"}
							paddingLeft={"15px"}
							paddingRight={"15px"}
							alignItems={"center"}
							borderBottom={"1px"}
						>
							<Flex flexDir={"column"} w={"70px"}>
								<Flex>
									{moment(clock.clock_out).format("HH:mm")}
								</Flex>
								<Flex>
									{moment().format("ll").split(",")[0]}
								</Flex>
							</Flex>
							<Flex
								w={"70px"}
								justifyContent={"center"}
								id="clock"
							>
								Clock Out
							</Flex>
							<Flex w={"70px"} justifyContent={"end"} id="icon">
								<Icon as={IoIosArrowForward}></Icon>
							</Flex>
						</Flex>
					</div>
				) : null}
			</Box>
		</Center>
	);
}
