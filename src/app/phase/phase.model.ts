export type PhasePhonetic = {
  text: string;
  audio?: string;
};

export type PhaseMeaning = {
  partOfSpeech: string;
  definitions: {
    definition: string;
    synonyms: string[];
    antonyms: string[];
  }[];
  synonyms: string[];
  antonyms: string[];
};

export type Phase = {
  word: string;
  phonetic: string;
  phonetics: PhasePhonetic[];
  meanings: PhaseMeaning[];
  sourceUrls?: string[];
};

export type PhaseError = {
  title: string;
  message: string;
  resolution: string;
  phase: string;
};
