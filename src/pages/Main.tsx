import React, { useEffect, useMemo, useState } from "react";
import { createSearchParams, useNavigate } from "react-router-dom";
import { useSuspenseQuery } from "@tanstack/react-query";
import styled from "styled-components";

import { Button, Header, Select } from "../components";
import { Difficulty, WithAny } from "../types";
import { DIFFICULTY, ROUTES } from "../constants";
import { getCategories } from "../lib";

export function Main() {
	const navigate = useNavigate();
	const [amount, setAmount] = useState("5");
	const [difficulty, setDifficulty] = useState<WithAny<Difficulty>>("any");
	const [category, setCategory] = useState<string>("");
	const { data: categoryList } = useSuspenseQuery({
		queryKey: ["category"],
		queryFn: () => getCategories(),
	});
	const categoryName = useMemo(() => {
		return categoryList.filter((item) => item.id.toString() === category)[0]?.name;
	}, [category, categoryList]);

	useEffect(() => {
		// 카테고리 기본값 설정
		setCategory(categoryList[0].id.toString());
	}, [categoryList]);

	const startQuiz = () => {
		navigate({
			pathname: ROUTES.QUIZ,
			search: `?${createSearchParams({ amount, difficulty, category, timestamp: new Date().getTime().toString() })}`,
		});
	};

	return (
		<Wrapper data-testid="main">
			<Header />
			<Title>퀴즈</Title>
			<Section>
				<SelectWrapper>
					<div>
						<Label>문제 개수</Label>
						<Select target={amount} onTargetChange={(target: string) => setAmount(target)}>
							<Select.Trigger>{amount}</Select.Trigger>
							<Select.Content>
								<Select.Option label={"5"}>5</Select.Option>
								<Select.Option label={"10"}>10</Select.Option>
								<Select.Option label={"15"}>15</Select.Option>
								<Select.Option label={"20"}>20</Select.Option>
							</Select.Content>
						</Select>
					</div>
					<div>
						<Label>문제 종류</Label>
						<Select target={category} onTargetChange={(target: string) => setCategory(target)}>
							<Select.Trigger>{categoryName}</Select.Trigger>
							<Select.Content>
								{categoryList.map((category) => (
									<Select.Option key={category.id} label={String(category.id)}>
										{category.name}
									</Select.Option>
								))}
							</Select.Content>
						</Select>
					</div>
					<div>
						<Label>난이도</Label>
						<Select
							target={difficulty}
							onTargetChange={(target: string) => setDifficulty(target as WithAny<Difficulty>)}
						>
							<Select.Trigger>{DIFFICULTY[difficulty]}</Select.Trigger>
							<Select.Content>
								<Select.Option label={"any"}>{DIFFICULTY["any"]}</Select.Option>
								<Select.Option label={"easy"}>{DIFFICULTY["easy"]}</Select.Option>
								<Select.Option label={"medium"}>{DIFFICULTY["medium"]}</Select.Option>
								<Select.Option label={"hard"}>{DIFFICULTY["hard"]}</Select.Option>
							</Select.Content>
						</Select>
					</div>
				</SelectWrapper>
				<Button data-testid="submit" $size="lg" $fullWidth onClick={startQuiz}>
					퀴즈 풀기
				</Button>
			</Section>
		</Wrapper>
	);
}

const Wrapper = styled.div`
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
`;

const Title = styled.h1`
	text-align: center;
	font-size: 50px;
	font-weight: bold;
`;

const Section = styled.section`
	margin: 20px 15px;
	display: flex;
	flex-direction: column;
	gap: 20px;
`;

const Label = styled.p`
	margin-bottom: 5px;
`;

const SelectWrapper = styled.div`
	display: flex;
	flex-direction: column;
	gap: 10px;
`;
