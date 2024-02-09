import { atom } from "jotai";

import { QuestionList } from "../types";

export const stepAtom = atom(0);

export const questionListAtom = atom<QuestionList>([]);

export const incorrectListAtom = atom<QuestionList>([]);
