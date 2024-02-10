import React, { useEffect, useMemo, useState } from "react";
import { Button, Header, Select } from "../../components";
import { CategoryList, Difficulty, Type, WithAny } from "../../types";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants";
import { getCategories } from "../../lib";

const DIFFICULTY = {
	any: "전체",
	easy: "쉬움",
	medium: "중간",
	hard: "어려움",
};

const TYPE = {
	any: "전체",
	multiple: "다중 선택",
	boolean: "예/아니오",
};

export function Main() {
	const navigate = useNavigate();
	const [amount, setAmount] = useState("5");
	const [difficulty, setDifficulty] = useState<WithAny<Difficulty>>("any");
	const [type, setType] = useState<WithAny<Type>>("any");
	const [categoryList, setCategoryList] = useState<CategoryList>([]);
	const [category, setCategory] = useState<string>("");
	const categoryName = useMemo(() => {
		return categoryList.filter((item) => item.id.toString() === category)[0]?.name;
	}, [category]);

	useEffect(() => {
		(async () => {
			try {
				const data = await getCategories();

				setCategoryList(data);
				setCategory(data[0].id.toString());
			} catch (error) {}
		})();
	}, []);

	const startQuiz = () => {
		navigate(ROUTES.QUIZ, {
			state: {
				amount,
				difficulty,
				type,
				category,
			},
		});
	};

	return (
		<Wrapper test-id="main">
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
					<div>
						<Label>문제 유형</Label>
						<Select target={type} onTargetChange={(target: string) => setType(target as WithAny<Type>)}>
							<Select.Trigger>{TYPE[type]}</Select.Trigger>
							<Select.Content>
								<Select.Option label={"any"}>{TYPE["any"]}</Select.Option>
								<Select.Option label={"multiple"}>{TYPE["multiple"]}</Select.Option>
								<Select.Option label={"boolean"}>{TYPE["boolean"]}</Select.Option>
							</Select.Content>
						</Select>
					</div>
				</SelectWrapper>
				<Button $size="lg" $fullWidth onClick={startQuiz}>
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
