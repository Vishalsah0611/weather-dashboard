import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="not-found">
      <h1>404</h1>
      <p>This page doesn't exist.</p>
      <Link className="btn-primary" to="/">
        Back home
      </Link>
    </section>
  );
}
