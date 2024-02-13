import { useNavigate } from "react-router-dom";
import { ROUTES } from "../constants";
import styled from "styled-components";

export function Header() {
	const navigate = useNavigate();

	const goMain = () => navigate(ROUTES.MAIN);

	return (
		<Wrapper>
			<Main onClick={goMain} data-testid="main">
				퀴즈
			</Main>
		</Wrapper>
	);
}

const Wrapper = styled.div`
	display: flex;
	justify-content: space-between;
	padding: 10px 15px;
	border-bottom: 1px solid ${({ theme }) => theme.colors.gray200};
`;

const Main = styled.button`
	font-size: 16px;
	font-weight: bold;
	padding: 0;
	background-color: transparent;
	border: none;
	cursor: pointer;
`;
