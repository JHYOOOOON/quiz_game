import styled from "styled-components";

export function Loader() {
	return (
		<Wrapper data-testid="loader">
			<LoaderItems>
				<span role="presentation"></span>
				<span role="presentation"></span>
				<span role="presentation"></span>
			</LoaderItems>
		</Wrapper>
	);
}

const Wrapper = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const LoaderItems = styled.div`
	span {
		display: inline-block;
		width: 20px;
		height: 20px;
		border-radius: 100%;
		background-color: ${({ theme }) => theme.colors.green500};
		margin: 35px 5px;

		&:nth-child(1) {
			animation: bounce 1s ease-in-out infinite;
		}
		&:nth-child(2) {
			animation: bounce 1s ease-in-out 0.33s infinite;
		}
		&:nth-child(3) {
			animation: bounce 1s ease-in-out 0.66s infinite;
		}
	}

	@keyframes bounce {
		0%,
		75%,
		100% {
			-webkit-transform: translateY(0);
			-ms-transform: translateY(0);
			-o-transform: translateY(0);
			transform: translateY(0);
		}

		25% {
			-webkit-transform: translateY(-20px);
			-ms-transform: translateY(-20px);
			-o-transform: translateY(-20px);
			transform: translateY(-20px);
		}
	}
`;
