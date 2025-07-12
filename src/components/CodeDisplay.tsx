interface Props {
  code: string;
}

const CodeDisplay = ({ code }: Props) => {
  return (
    <div style={{ marginTop: '2rem', padding: '1rem', border: '1px solid #ccc' }}>
      <h2>Java Code</h2>
      <pre
        style={{
          backgroundColor: '#f5f5f5',
          padding: '1rem',
          overflowX: 'auto',
          whiteSpace: 'pre-wrap',
          fontFamily: 'monospace',
          fontSize: '0.9rem',
        }}
      >
        {code}
      </pre>
    </div>
  );
};

export default CodeDisplay;
