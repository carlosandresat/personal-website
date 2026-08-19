export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="flex items-center py-6 w-full shrink-0 px-4 md:px-6 border-t">
      <p className="text-xs text-muted-foreground">
        © {year} Developed by{" "}
        <span className="font-bold text-foreground">Carlos Arévalo</span>.
      </p>
    </footer>
  );
}
