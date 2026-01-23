export default function Tooltip({ text, children }) {
  return (
    <span className="ttWrap">
      {children}
      <span className="ttBubble" role="tooltip">
        {text}
      </span>
    </span>
  );
}
