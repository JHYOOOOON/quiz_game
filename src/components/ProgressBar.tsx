import styled, { css } from "styled-components";

interface IProgressBar {
	total: number;
	step: number;
}

export function ProgressBar({ total, step }: IProgressBar) {
	return (
		<Background>
			<Progress $percentage={((step + 1) / total) * 100} />
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
