/**
 * MOTIVUS logotipas pagal firminį ženklą: „O“ — žalias žiedas su tachometro
 * rodyklės įpjova viršutiniame kairiajame kampe.
 */
export default function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center font-display font-black leading-none tracking-[-0.015em] ${className}`}
      aria-label="MOTIVUS"
    >
      <span aria-hidden="true">M</span>
      <svg viewBox="0 0 100 100" className="mx-[0.03em] h-[0.76em] w-[0.76em] shrink-0" aria-hidden="true">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M50 0a50 50 0 1 0 0 100A50 50 0 0 0 50 0Z
             M50 21a29 29 0 1 1 0 58 29 29 0 0 1 0-58Z
             M21.5 21.5 34 27l-7 7Z"
          fill="currentColor"
        />
      </svg>
      <span aria-hidden="true">TIVUS</span>
    </span>
  );
}
