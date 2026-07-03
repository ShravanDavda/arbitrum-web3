export function Background() {
  return (
    <div aria-hidden className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 grid-bg opacity-40 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
      <div className="absolute top-[-15%] left-[-10%] w-[45rem] h-[45rem] rounded-full bg-primary/25 blur-3xl animate-blob" />
      <div className="absolute top-[30%] right-[-15%] w-[40rem] h-[40rem] rounded-full bg-accent/25 blur-3xl animate-blob [animation-delay:-6s]" />
      <div className="absolute bottom-[-20%] left-[20%] w-[35rem] h-[35rem] rounded-full bg-primary-glow/20 blur-3xl animate-blob [animation-delay:-12s]" />
    </div>
  );
}
