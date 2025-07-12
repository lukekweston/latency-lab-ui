interface Props {
  explanation: string[];
}

const ExplanationPanel = ({ explanation }: Props) => {
  return (
    <div style={{ marginTop: '2rem', padding: '1rem', border: '1px solid #ccc' }}>
      <h2>Optimization Explanation</h2>
      <ul style={{ paddingLeft: '1.2rem' }}>
        {explanation.map((item, idx) => (
          <li key={idx} style={{ marginBottom: '0.5rem' }}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExplanationPanel;
