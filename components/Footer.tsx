export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/5 px-6 py-8">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-white/25 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-gradient-to-br from-violet-500 to-cyan-400 flex items-center justify-center text-white font-bold text-[10px]">
            CV
          </div>
          <span>&copy; {year} Codevolve Pty Ltd. All rights reserved.</span>
        </div>
        <div className="flex items-center gap-6">
          <a href="#about" className="hover:text-white/60 transition-colors">About</a>
          <a href="#products" className="hover:text-white/60 transition-colors">Products</a>
          <a href="#contact" className="hover:text-white/60 transition-colors">Contact</a>
          <a href="https://scout.codevolve.com.au/privacy" className="hover:text-white/60 transition-colors">Privacy</a>
          <a href="https://scout.codevolve.com.au/terms" className="hover:text-white/60 transition-colors">Terms</a>
        </div>
      </div>
    </footer>
  );
}
