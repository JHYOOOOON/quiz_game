import { atom } from "jotai";

import { AnswerList } from "../types";

export const answerListAtom = atom<AnswerList>([]);

export const elapsedTimeAtom = atom<number>(0);
