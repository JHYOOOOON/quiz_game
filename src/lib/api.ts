import axios from "axios";
import { Difficulty, Type, WithNull, CategoryResponse, QuestionResponse } from "../types";

const instance = axios.create({
	baseURL: "https://opentdb.com",
});

export const getCategories = async () => {
	try {
		const {
			data: { trivia_categories },
		} = await instance.get<CategoryResponse>("/api_category.php");

		return trivia_categories;
	} catch (error) {
		throw Error("Error Occured in getCategories");
	}
};

export const getQuestions = async (
	amount: number,
	category: WithNull<string>,
	difficulty: WithNull<Difficulty>,
	type: WithNull<Type>
) => {
	const params: {
		amount: number;
		category?: string;
		difficulty?: Difficulty;
		type?: Type;
	} = {
		amount,
	};

	if (category) {
		params.category = category;
	}
	if (difficulty) {
		params.difficulty = difficulty;
	}
	if (type) {
		params.type = type;
	}

	try {
		const {
			data: { results },
		} = await instance.get<QuestionResponse>("/api.php", { params });

		return results;
	} catch (error) {
		throw Error("Error Occured in getCategories");
	}
};