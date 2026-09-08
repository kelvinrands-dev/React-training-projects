import Header from "../components/Header";
import "./NoPage.css";

export function NoPage({ cart }) {
  return (
    <>
      <Header cart={cart} />
      <div className="no-page-text">Page Not Found</div>
    </>
  );
}
