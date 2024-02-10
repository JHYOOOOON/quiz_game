import { ButtonHTMLAttributes, PropsWithChildren } from "react";
import styled, { css } from "styled-components";

type VariantType = "primary" | "secondary";
type SizeType = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, PropsWithChildren {
	$fullWidth?: boolean;
	$variant?: VariantType;
	$size?: SizeType;
}

export function Button({ type, onClick, $fullWidth, $variant, $size, children, className }: ButtonProps) {
	return (
		<StyledButton
			type={type || "button"}
			onClick={onClick}
			$fullWidth={$fullWidth}
			$variant={$variant}
			$size={$size}
			className={className}
		>
			{children}
		</StyledButton>
	);
}

const StyledButton = styled.button<{ $fullWidth?: boolean; $variant?: VariantType; $size?: SizeType }>`
	border-radius: 5px;
	border: none;
	transition: 0.2s background;
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
	${({ $size }) => {
		if ($size === "sm") {
			return css`
				padding: 5px 7px;
				font-size: 14px;
			`;
		} else if ($size === "lg") {
			return css`
				padding: 15px 20px;
				font-size: 18px;
			`;
		}
		return css`
			padding: 10px 15px;
			font-size: 16px;
		`;
	}}
`;
