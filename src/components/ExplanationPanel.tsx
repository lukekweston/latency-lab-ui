import { Card, CardContent } from '../components/ui/card';

interface Props {
  explanation: string;
}

const ExplanationPanel = ({ explanation }: Props) => {
  return (
    <Card>
      <CardContent className="text-sm p-4 max-h-[180px] overflow-auto text-muted-foreground">
        <h3 className="text-md font-semibold mb-2">Explanation</h3>
        <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
          {explanation}
        </p>
      </CardContent>
    </Card>
  );
};

export default ExplanationPanel;
