import { QuizQuestion } from './types';

// TODO: Replace this URL with your actual Google Apps Script deployment URL
export const GOOGLE_SCRIPT_URL = 'INSERT_YOUR_GOOGLE_SCRIPT_URL_HERE'; 

export const QUIZ_DATA: QuizQuestion[] = [
  {
    question: "Do you have the 2026 Gauteng Work Schedule for your subject?",
    options: [
      "Yes, I have it and I've read it thoroughly",
      "Yes, but I haven't gone through it yet",
      "No, I don't have it yet"
    ],
    values: [3, 1, 0],
    category: "schedule"
  },
  {
    question: "Have you customized the work schedule to your school's calendar?",
    options: [
      "Yes, fully customized with all dates",
      "Partially done",
      "Not yet"
    ],
    values: [3, 1, 0],
    category: "planning"
  },
  {
    question: "Do you have day-by-day planning with the 5 required elements ready?",
    options: [
      "Yes, in a format ready for inspections",
      "I plan but don't write it down systematically",
      "No written planning system"
    ],
    values: [3, 1, 0],
    category: "planning"
  },
  {
    question: "Do you know which content was trimmed for 2026 and must NOT be taught?",
    options: [
      "Yes, I have a clear list",
      "I think I know but I'm not 100% sure",
      "No, I don't know what was trimmed"
    ],
    values: [4, 2, 0],
    category: "compliance"
  },
  {
    question: "Have you submitted your Annual Assessment Plan to the district advisor?",
    options: [
      "Yes, already submitted",
      "It's drafted but not submitted",
      "I haven't started it yet"
    ],
    values: [3, 1, 0],
    category: "assessment"
  }
];
