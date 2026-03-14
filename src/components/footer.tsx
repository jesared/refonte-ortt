export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="max-w-6xl mx-auto px-4 py-4 text-sm text-slate-600">
        © {new Date().getFullYear()} Olympique Rémois Tennis de Table
      </div>
    </footer>
  );
}
