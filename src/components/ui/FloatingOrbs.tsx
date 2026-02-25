export function FloatingOrbs() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute w-96 h-96 bg-blue-600/10 rounded-full blur-3xl -top-48 -left-48 animate-float" />
      <div className="absolute w-96 h-96 bg-green-600/10 rounded-full blur-3xl -bottom-48 -right-48 animate-float-delayed" />
    </div>
  );
}
