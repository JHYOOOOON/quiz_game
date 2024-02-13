import { render, screen, fireEvent } from "@testing-library/react";
import * as router from "react-router";

import { Header } from "../Header";
import { ROUTES } from "../../constants";
import Template from "../../pages/tests/Template";

const navigate = jest.fn();

beforeEach(() => {
	jest.spyOn(router, "useNavigate").mockImplementation(() => navigate);
});

afterEach(() => {
	jest.clearAllMocks();
});

test("로고 클릭 시, 메인페이지로 이동하는지 확인합니다.", () => {
	render(
		<Template>
			<Header />
		</Template>
	);

	fireEvent.click(screen.getByTestId("main"));

	expect(navigate).toHaveBeenCalledWith(ROUTES.MAIN);
});
