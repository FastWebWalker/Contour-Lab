export function ArrowRightIcon({
  className,
  size = 36,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M28.5 17.25C28.9142 17.25 29.25 17.5858 29.25 18C29.25 18.4142 28.9142 18.75 28.5 18.75H7.5C7.08579 18.75 6.75 18.4142 6.75 18C6.75 17.5858 7.08579 17.25 7.5 17.25H28.5Z"
        fill="currentColor"
      />
      <path
        d="M17.4697 6.96967C17.7626 6.67678 18.2373 6.67678 18.5302 6.96967L29.0302 17.4697C29.3231 17.7626 29.3231 18.2373 29.0302 18.5302L18.5302 29.0302C18.2373 29.3231 17.7626 29.3231 17.4697 29.0302C17.1768 28.7373 17.1768 28.2626 17.4697 27.9697L27.4394 17.9999L17.4697 8.03022C17.1768 7.73732 17.1768 7.26256 17.4697 6.96967Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function ArrowRightBasicIcon({
  className,
  size = 20,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M5 12H19M19 12L14 7M19 12L14 17"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
