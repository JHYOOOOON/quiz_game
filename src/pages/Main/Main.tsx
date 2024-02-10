import React, { useState } from "react";
import { Select } from "../../components";
import { Difficulty, Type, WithAny } from "../../types";

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
		<div test-id="main">
			<p>문제 개수</p>
			<Select target={amount} onTargetChange={(target: string) => setAmount(target)}>
				<Select.Trigger>{amount}</Select.Trigger>
				<Select.Content>
					<Select.Option label={"5"}>5</Select.Option>
					<Select.Option label={"10"}>10</Select.Option>
					<Select.Option label={"15"}>15</Select.Option>
					<Select.Option label={"20"}>20</Select.Option>
				</Select.Content>
			</Select>
			<p>난이도</p>
			<Select target={difficulty} onTargetChange={(target: string) => setDifficulty(target as WithAny<Difficulty>)}>
				<Select.Trigger>{DIFFICULTY[difficulty]}</Select.Trigger>
				<Select.Content>
					<Select.Option label={"any"}>{DIFFICULTY["any"]}</Select.Option>
					<Select.Option label={"easy"}>{DIFFICULTY["easy"]}</Select.Option>
					<Select.Option label={"medium"}>{DIFFICULTY["medium"]}</Select.Option>
					<Select.Option label={"hard"}>{DIFFICULTY["hard"]}</Select.Option>
				</Select.Content>
			</Select>
			<p>문제 유형</p>
			<Select target={type} onTargetChange={(target: string) => setType(target as WithAny<Type>)}>
				<Select.Trigger>{TYPE[type]}</Select.Trigger>
				<Select.Content>
					<Select.Option label={"any"}>{TYPE["any"]}</Select.Option>
					<Select.Option label={"multiple"}>{TYPE["multiple"]}</Select.Option>
					<Select.Option label={"boolean"}>{TYPE["boolean"]}</Select.Option>
				</Select.Content>
			</Select>
		</div>
	);
}
