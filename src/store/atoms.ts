import { atom } from "jotai";

import { QuestionList } from "../types";

export const stepAtom = atom(0);

export const incorrectListAtom = atom<QuestionList>([]);
