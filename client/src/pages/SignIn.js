import { faSignInAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { Container } from "../components/Container";
import AuthContext from "../context/auth/authContext";

const SignInStyle = styled.div`
	flex: 1;
	display: flex;
	align-items: center;

	& > div {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	& h1 {
		color: #a0aec0;
		font-weight: bold;
		font-size: 2rem;
		text-align: center;
	}

	& form {
		display: flex;
		flex-direction: column;
		max-width: 24rem;
		width: 100%;

		& label {
			color: #a0aec0;
			margin-bottom: 0.5rem;
		}

		& input {
			border-radius: 0.6rem;
			border: 0;
			padding: 0.8rem 1rem;
			font-size: 1rem;
			margin-bottom: 0.5rem;
			transition: all 0.2s;

			&:focus {
				outline: 0;
				box-shadow: 0 0 0 0.2rem #63b3ed;
			}
		}
	}
`;

const SignInButton = styled.button`
	margin: 1rem auto;

	color: #63b3ed;
	transition: all 0.2s;
	border: 0.1rem solid #63b3ed;
	border-radius: 5rem;
	padding: 1rem 1.2rem;
	font-size: 1.1rem;
	background-color: #1a202c;
	cursor: pointer;

	&:focus {
		outline: 0;
		box-shadow: 0 0 0 0.2rem #63b3ed;
	}

	&:hover {
		color: #1a202c;
		background-color: #63b3ed;
	}
`;

export const SignIn = ({ history }) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const { isAuthenticated, login, clearErrors } = useContext(AuthContext);

	useEffect(() => {
		if (isAuthenticated) {
			history.push("/profile");
		}
	}, [isAuthenticated, history]);

	const handleSubmit = async (e) => {
		e.preventDefault();

		clearErrors();

		login({
			email,
			password,
		});
	};

	return (
		<SignInStyle>
			<Container>
				<h1>
					<FontAwesomeIcon icon={faSignInAlt} /> Sign In
				</h1>
				<form onSubmit={(e) => handleSubmit(e)}>
					<label htmlFor="email">Email</label>
					<input
						required
						type="email"
						id="email"
						name="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					<label htmlFor="password">Password</label>
					<input
						required
						type="password"
						id="password"
						name="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
					<SignInButton type="submit">
						<FontAwesomeIcon icon={faSignInAlt} /> Sign In
					</SignInButton>
				</form>
			</Container>
		</SignInStyle>
	);
};
