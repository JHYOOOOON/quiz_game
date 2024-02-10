import { CategoryList, QuestionList } from "./types";

export type CategoryResponse = {
	trivia_categories: CategoryList;
};

export type QuestionResponse = {
	response_code: string;
	results: QuestionList;
};
