import './HoverLink.css';

function HoverLink({ link, modificBlock, modificText, text, children }) {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className={`hover-link ${modificBlock}`}
    >
      <p className={`hover-link__text ${modificText}`}>{text}</p>
      {children}
    </a>
  );
}

export default HoverLink;
