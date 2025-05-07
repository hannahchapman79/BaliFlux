import { fetchQuestions } from "@/lib/actions/fetchQuestions";
import Questionnaire from "@/components/questionnaire/Questionnaire";
import { Questions } from "@/types/questions"; 

export default async function QuestionnairePage() {
  const { questions } = await fetchQuestions();

  return (
    <div className="flex flex-col items-center justify-center py-2">
      <Questionnaire questions={questions as Questions[]} />
    </div>
  );
}