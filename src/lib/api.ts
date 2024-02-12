import axios from "axios";
import { Difficulty, WithAny, CategoryResponse, QuestionResponse } from "../types";

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

export const getQuestions = async (amount: string, category: WithAny<string>, difficulty: WithAny<Difficulty>) => {
	const params: {
		amount: string;
		category?: string;
		difficulty?: Difficulty;
		type: string;
	} = {
		amount,
		type: "multiple",
	};

	if (category) {
		params.category = category;
	}
	if (difficulty !== "any") {
		params.difficulty = difficulty;
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
