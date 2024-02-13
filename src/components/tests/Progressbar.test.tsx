import { render, screen } from "@testing-library/react";
import Template from "../../pages/tests/Template";
import { ProgressBar } from "../ProgressBar";
import { getPercentage } from "../../utils";

test("Progressbar가 올바르게 렌더링되는지 확인합니다.", () => {
	const total = 5;
	const step = 0;

	render(
		<Template>
			<ProgressBar total={total} step={step} />
		</Template>
	);

	const progressBar = screen.getByTestId("progressbar");

	expect(progressBar).toHaveStyle(`width: ${getPercentage(total, step)}%`);
	expect(progressBar).toHaveStyle(`width: 20%`);
});
