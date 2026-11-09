import { Link } from "react-router-dom";

interface StageFooterProps {
  backTo: string;
  backLabel: string;
  nextTo: string;
  nextLabel: string;
  disabled?: boolean;
}

export default function StageFooter({
  backTo,
  backLabel,
  nextTo,
  nextLabel,
  disabled = false,
}: StageFooterProps) {
  return (
    <footer className="stage-footer">
      <Link className="stage-footer__back" to={backTo}>
        ← {backLabel}
      </Link>
      {disabled ? (
        <span className="stage-footer__next">
          <button className="btn btn--gold" type="button" disabled>
            {nextLabel}
          </button>
        </span>
      ) : (
        <Link className="stage-footer__next btn btn--gold" to={nextTo}>
          {nextLabel} <span aria-hidden="true">→</span>
        </Link>
      )}
    </footer>
  );
}
