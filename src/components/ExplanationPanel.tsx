import { Card, CardContent, CardHeader } from "../components/ui/card";
import ReactMarkdown from "react-markdown";

interface Props {
  explanation: string | string[];
}

const ExplanationPanel = ({ explanation }: Props) => {
  const markdown = Array.isArray(explanation)
    ? explanation.join("\n\n")
    : explanation;

  return (
    <Card className="h-full overflow-auto">
      <CardHeader>
        <h2 className="text-xl font-semibold">Explanation</h2>
      </CardHeader>
      <CardContent className="prose prose-sm max-w-none px-6 pb-6 pt-0 overflow-y-auto">
        <ReactMarkdown>{markdown}</ReactMarkdown>
      </CardContent>
    </Card>
  );
};

export default ExplanationPanel;
