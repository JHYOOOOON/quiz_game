import { useNavigate } from "react-router-dom";
import { ROUTES } from "../constants";
import styled from "styled-components";
import { Button } from "./Button";

interface IHeader {
	hasNote?: boolean;
}

export function Header({ hasNote = true }: IHeader) {
	const navigate = useNavigate();

	const goMain = () => navigate(ROUTES.MAIN);

	const goNote = () => navigate(ROUTES.NOTE);

	return (
		<Wrapper>
			<Main onClick={goMain}>퀴즈</Main>
			{hasNote && (
				<Button $variant="secondary" $size="sm" onClick={goNote}>
					오답노트
				</Button>
			)}
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
