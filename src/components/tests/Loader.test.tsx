import React from "react";
import { render, screen } from "@testing-library/react";

import { Loader } from "../Loader";
import * as Theme from "../../theme";
import { Template } from "./Template";

test("Loader가 올바르게 렌더링되었는지 확인합니다.", () => {
	render(
		<Template>
			<Loader />
		</Template>
	);

	const loaderWrapper = screen.getByTestId("loader");
	expect(loaderWrapper).toBeInTheDocument();

	const loaderItems = screen.getAllByRole("presentation");
	expect(loaderItems).toHaveLength(3);

	loaderItems.forEach((item) => {
		expect(item).toHaveStyle(`
        width: 20px;
        height: 20px;
        border-radius: 100%;
        background-color: ${Theme.colors.green500};
        margin: 35px 5px;
      `);
	});
});
