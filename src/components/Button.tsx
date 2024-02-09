import { ButtonHTMLAttributes, PropsWithChildren } from "react";
import styled, { css } from "styled-components";

type VariantType = "primary" | "secondary";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, PropsWithChildren {
	$fullWidth?: boolean;
	$variant?: VariantType;
}

export function Button({ type, onClick, $fullWidth, $variant, children }: ButtonProps) {
	return (
		<StyledButton type={type || "button"} onClick={onClick} $fullWidth={$fullWidth} $variant={$variant}>
			{children}
		</StyledButton>
	);
}

const StyledButton = styled.button<{ $fullWidth?: boolean; $variant?: VariantType }>`
	padding: 15px 20px;
	border-radius: 5px;
	border: none;
	transition: 0.2s background;
	font-size: 16px;
	cursor: pointer;
	${({ $fullWidth }) =>
		$fullWidth &&
		css`
			width: 100%;
		`}
	${({ $variant, theme }) => {
		if ($variant === "secondary") {
			return css`
				border: 1px solid ${theme.colors.green500};
				background-color: ${theme.colors.white};
				color: ${theme.colors.green500};
				&:hover {
					background-color: ${theme.colors.gray050};
				}
			`;
		}
		return css`
			background-color: ${theme.colors.green500};
			color: ${theme.colors.white};
			&:hover {
				background-color: ${theme.colors.green700};
			}
		`;
	}}
`;
