import React, { useState } from "react";
import { CheckCircle, XCircle } from "lucide-react";
import ChatBubble from "./ChatBubble";
import ResultCard from "./ResultCard";
import { cn } from "@/lib/utils";

interface Question {
  id: string;
  text: string;
  category: string;
}

interface Props {
  questions: Question[];
  onDiagnosisDone: (answers: { [key: string]: boolean }, result: string) => void;
}

const QuestionFlow: React.FC<Props> = ({ questions, onDiagnosisDone }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [chatHistory, setChatHistory] = useState<
    { type: "question" | "answer"; text: string }[]
  >([]);
  const [answers, setAnswers] = useState<{ [key: string]: boolean }>({});
  const [diagnosisResult, setDiagnosisResult] = useState<string | null>(null);

  const performDiagnosis = () => {
    let stunting = 0,
      hiv = 0,
      dbd = 0;

    questions.forEach((q) => {
      if (answers[q.id]) {
        if (q.category === "stunting") stunting++;
        if (q.category === "hiv") hiv++;
        if (q.category === "dbd") dbd++;
      }
    });

    let result = "";
    let flags = 0;

    if (stunting >= 2) {
      result += "Indikasi kemungkinan *Stunting*.\n";
      flags++;
    }
    if (hiv >= 2) {
      result += "Indikasi kemungkinan *HIV*.\n";
      flags++;
    }
    if (dbd >= 2) {
      result += "Indikasi kemungkinan *DBD*.\n";
      flags++;
    }

    if (flags === 0) {
      result =
        "Tidak ditemukan indikasi kuat ke arah Stunting, HIV, atau DBD berdasarkan gejala yang diberikan.";
    }

    setDiagnosisResult(result);
    onDiagnosisDone(answers, result); // optional callback
  };

  const handleAnswer = (answer: boolean) => {
    const currentQuestion = questions[currentStep];
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: answer }));
    setChatHistory((prev) => [
      ...prev,
      { type: "question", text: currentQuestion.text },
      { type: "answer", text: answer ? "Ya" : "Tidak" },
    ]);

    if (currentStep + 1 < questions.length) {
      setCurrentStep(currentStep + 1);
    } else {
      performDiagnosis();
    }
  };

  return (
    <div className="w-full bg-white rounded-xl shadow-lg p-6 space-y-6 border border-gray-100 min-h-[400px] flex flex-col">
      {chatHistory.map((entry, i) => (
        <ChatBubble key={i} type={entry.type} text={entry.text} />
      ))}

      {!diagnosisResult && currentStep < questions.length && (
        <div className="flex flex-col items-start mt-4">
          <p className="font-semibold mb-3">{questions[currentStep].text}</p>
          <div className="flex gap-4">
            <button
              onClick={() => handleAnswer(true)}
              className="bg-tealCustom text-white px-4 py-2 rounded-lg flex items-center gap-2"
            >
              <CheckCircle size={18} /> Ya
            </button>
            <button
              onClick={() => handleAnswer(false)}
              className="bg-red-500 text-white px-4 py-2 rounded-lg flex items-center gap-2"
            >
              <XCircle size={18} /> Tidak
            </button>
          </div>
        </div>
      )}

      {diagnosisResult && <ResultCard result={diagnosisResult} />}
    </div>
  );
};

export default QuestionFlow;
