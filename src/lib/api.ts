import axios from "axios";
import { CategoryResponse, QuestionResponse } from "../types";

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

export const getQuestions = async (amount: string, category?: string, difficulty?: string) => {
	const params: {
		amount: string;
		category?: string;
		difficulty?: string;
		type: string;
	} = {
		amount,
		type: "multiple",
	};

	if (category) {
		params.category = category;
	}
	if (difficulty && difficulty !== "any") {
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
