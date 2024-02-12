import { screen } from "@testing-library/react";

describe("결과 정보 페이지에서 다음과 같은 정보를 볼 수 있다.", () => {
	test("퀴즈를 마칠 때까지 소요된 시간", () => {
		const time = screen.getByTestId("time");

		expect(time).toBeInTheDocument();
	});

	test("정답 개수", () => {
		const correct = screen.getByTestId("correct");

		expect(correct).toBeInTheDocument();
	});

	test("오답 개수", () => {
		const incorrect = screen.getByTestId("incorrect");

		expect(incorrect).toBeInTheDocument();
	});

	test("정 오답에 대한 비율을 차트로 표기", () => {
		const chart = screen.getByTestId("chart");

		expect(chart).toBeInTheDocument();
	});
});
