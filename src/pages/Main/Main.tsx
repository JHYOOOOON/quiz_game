import React, { useState } from "react";
import { Button, Header, Select } from "../../components";
import { Difficulty, Type, WithAny } from "../../types";
import styled from "styled-components";

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
	const [amount, setAmount] = useState("5");
	const [difficulty, setDifficulty] = useState<WithAny<Difficulty>>("easy");
	const [type, setType] = useState<WithAny<Type>>("any");

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
				<Button $size="lg" $fullWidth>
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
