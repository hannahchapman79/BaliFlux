import { fetchQuestions } from "@/lib/actions/fetchQuestions";
import Questionnaire from "@/components/questionnaire/Questionnaire";

export default async function QuestionnairePage() {
  const { questions } = await fetchQuestions();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <title>Create trip!</title>
      <Questionnaire questions={questions} />
    </div>
  );
}
