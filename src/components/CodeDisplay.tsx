import { Card, CardContent, CardHeader } from '../components/ui/card';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { prism  } from 'react-syntax-highlighter/dist/esm/styles/prism';

type Props = {
  code: string;
};

const CodeDisplay = ({ code }: Props) => {
  return (
    <Card>
      <CardHeader className="text-xl font-semibold">Generated Java Code</CardHeader>
      <CardContent className="px-4 py-2">
  <SyntaxHighlighter
    language="java"
    style={prism}
    customStyle={{
      background: 'transparent',
      fontSize: '0.85rem',
      lineHeight: '1.5',
      fontFamily: 'monospace',
      padding: 0,
      margin: 0,
    }}
  >
    {code}
  </SyntaxHighlighter>
</CardContent>
    </Card>
  );
};

export default CodeDisplay;
