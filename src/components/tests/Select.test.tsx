import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ThemeProvider } from "styled-components";

import { Select } from "../Select";
import * as Theme from "../../theme";

const renderSelect = () => {
	const mockOnTargetChange = jest.fn();

	render(
		<ThemeProvider theme={Theme}>
			<Select target="Option 1" onTargetChange={mockOnTargetChange}>
				<Select.Trigger data-testid="trigger">Option 1</Select.Trigger>
				<Select.Content data-testid="content">
					<Select.Option label="Option 1" data-testid="option1">
						Option 1
					</Select.Option>
					<Select.Option label="Option 2" data-testid="option2">
						Option 2
					</Select.Option>
					<Select.Option label="Option 3" data-testid="option3">
						Option 3
					</Select.Option>
				</Select.Content>
			</Select>
		</ThemeProvider>
	);

	return { mockOnTargetChange };
};

describe("Select", () => {
	test("옵션이 렌더링되고, 클릭 이벤트가 발생할 때 onTargetChange 함수가 호출되는지 확인합니다.", () => {
		const { mockOnTargetChange } = renderSelect();

		userEvent.click(screen.getByTestId("trigger"));
		userEvent.click(screen.getByText("Option 2"));

		expect(mockOnTargetChange).toHaveBeenCalledWith("Option 2");
	});

	test("Esc 눌렀을 때 컨텐츠가 닫히는지 확인합니다.", () => {
		renderSelect();

		userEvent.click(screen.getByTestId("trigger"));
		userEvent.keyboard("{Escape}");

		const content = screen.queryByTestId("content");
		expect(content).toBeNull();
	});

	test("Select 바깥을 클릭했을 때 컨텐츠가 닫히는지 확인합니다.", () => {
		renderSelect();
		userEvent.click(document.body);

		const content = screen.queryByTestId("content");
		expect(content).toBeNull();
	});

	test("키보드 방향키를 눌렀을 때 포커스 이동, Enter 시 onTargetChange 함수가 호출되는지 확인합니다.", () => {
		const { mockOnTargetChange } = renderSelect();

		userEvent.click(screen.getByTestId("trigger"));

		fireEvent.keyDown(screen.getByRole("listbox"), { key: "ArrowDown" });
		expect(screen.getByTestId("option2")).toHaveClass("active");

		fireEvent.keyDown(screen.getByRole("listbox"), { key: "ArrowUp" });
		expect(screen.getByTestId("option1")).toHaveClass("active");

		userEvent.keyboard("{Enter}");
		expect(mockOnTargetChange).toHaveBeenCalledWith("Option 1");
	});
});
