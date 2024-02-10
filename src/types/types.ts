type Category = {
	id: number;
	name: string;
};

export type CategoryList = Category[];

export type WithAny<T> = "any" | T;

export type Difficulty = "easy" | "medium" | "hard";

export type Type = "boolean" | "multiple";

type Question = {
	type: Type;
	difficulty: Difficulty;
	category: string;
	question: string;
	correct_answer: string;
	incorrect_answers: string[];
};

export type QuestionList = Question[];
