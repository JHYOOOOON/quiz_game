import styled, { css } from "styled-components";
import { getPercentage } from "../utils";

interface IProgressBar {
	total: number;
	step: number;
}

export function ProgressBar({ total, step }: IProgressBar) {
	const percentage = getPercentage(total, step);
	return (
		<Background>
			<Progress $percentage={percentage} data-testid="progressbar" />
		</Background>
	);
}

const Background = styled.div`
	height: 6px;
	background-color: ${({ theme }) => theme.colors.gray200};
`;

const Progress = styled.div<{ $percentage: number }>`
	height: 100%;
	transition: 0.2s width;
	${({ theme, $percentage }) => css`
		width: ${$percentage}%;
		background-color: ${theme.colors.green500};
	`}
`;
