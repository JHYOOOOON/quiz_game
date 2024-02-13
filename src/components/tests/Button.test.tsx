import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import * as Theme from "../../theme";
import { Button } from "../Button";
import { PropsWithChildren } from "react";
import { ThemeProvider } from "styled-components";

const Template = ({ children }: PropsWithChildren) => {
	return <ThemeProvider theme={Theme}>{children}</ThemeProvider>;
};

describe("Button", () => {
	test("버튼이 렌더링되고, 클릭 이벤트가 발생할 때 onClick 함수가 호출되는지 확인합니다.", () => {
		const onClick = jest.fn();

		render(
			<Template>
				<Button onClick={onClick}>버튼</Button>
			</Template>
		);

		const buttonElement = screen.getByRole("button");
		expect(buttonElement).toBeInTheDocument();

		userEvent.click(buttonElement);
		expect(onClick).toHaveBeenCalled();
	});

	test("버튼이 $fullWidth prop에 따라 전체 너비를 가지는지 확인합니다.", () => {
		render(
			<Template>
				<Button $fullWidth data-testid="fullwidth">
					Full Width Button
				</Button>
				<Button data-testid="regular">Regular Button</Button>
			</Template>
		);
		const fullWidthButton = screen.getByTestId("fullwidth");
		expect(fullWidthButton).toHaveStyle("width: 100%;");

		const regularButton = screen.getByTestId("regular");
		expect(regularButton).not.toHaveStyle("width: 100%;");
	});

	test("버튼이 variant prop에 따라 올바른 스타일을 가지는지 확인합니다.", () => {
		render(
			<Template>
				<Button $variant="primary" data-testid="primary">
					Primary Button
				</Button>
				<Button $variant="secondary" data-testid="secondary">
					Secondary Button
				</Button>
			</Template>
		);
		const primaryButton = screen.getByTestId("primary");
		fireEvent.mouseOver(primaryButton);
		expect(primaryButton).toHaveStyle(`background-color: ${Theme.colors.green700}`);

		const secondaryButton = screen.getByTestId("secondary");
		expect(secondaryButton).toHaveStyle(`border: 1px solid ${Theme.colors.green500}`);
	});

	test("버튼이 size prop에 따라 올바른 스타일을 가지는지 확인합니다.", () => {
		render(
			<Template>
				<Button $size="sm" data-testid="sm">
					Small Button
				</Button>
				<Button $size="lg" data-testid="lg">
					Large Button
				</Button>
				<Button data-testid="md">Default Size Button</Button>
			</Template>
		);
		const smallButton = screen.getByTestId("sm");
		expect(smallButton).toHaveStyle("padding: 5px 7px; font-size: 14px;");

		const largeButton = screen.getByTestId("lg");
		expect(largeButton).toHaveStyle("padding: 15px 20px; font-size: 18px;");

		const defaultSizeButton = screen.getByTestId("md");
		expect(defaultSizeButton).toHaveStyle("padding: 10px 15px; font-size: 16px;");
	});

	test("비활성화된 버튼이 정확한 스타일을 가지는지 확인합니다.", () => {
		render(
			<Template>
				<Button disabled>Disabled Button</Button>
			</Template>
		);
		const disabledButton = screen.getByRole("button");

		expect(disabledButton).toHaveStyle(`cursor: auto; background-color: ${Theme.colors.gray400}`);
	});
});
