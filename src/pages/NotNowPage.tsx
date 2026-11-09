import { Link } from "react-router-dom";
import { notNow } from "../data/personalization";

export default function NotNowPage() {
  return (
    <div className="not-now">
      <main id="main" className="not-now__card">
        <p className="eyebrow">· {notNow.eyebrow} ·</p>
        <h1 className="not-now__title">{notNow.title}</h1>
        <div className="not-now__copy">
          {notNow.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <div className="not-now__actions">
          <Link className="btn btn--ghost" to="/">
            {notNow.backLabel}
          </Link>
          <Link className="btn btn--text" to="/#letter">
            {notNow.letterLabel}
          </Link>
        </div>
      </main>
    </div>
  );
}
