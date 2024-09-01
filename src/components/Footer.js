export default function Footer() {
  return (
    <>
      <div className="fixed-bottom">
        <footer className="footer mt-auto py-3 bg-light">
          <div className="container">
            <span className="text-muted">
              &copy; {new Date().getFullYear()} by Khai.
            </span>
          </div>
        </footer>
      </div>
    </>
  );
}
