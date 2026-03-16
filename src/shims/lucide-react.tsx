import * as React from "react";

type IconProps = React.SVGProps<SVGSVGElement>;

type LucideProps = IconProps & {
  size?: number | string;
};

function BaseIcon({
  children,
  className,
  size = 24,
  ...props
}: React.PropsWithChildren<LucideProps>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      width={size}
      height={size}
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

export function Sun(props: LucideProps) {
  return (
    <BaseIcon {...props}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="m4.93 4.93 1.41 1.41" />
      <path d="m17.66 17.66 1.41 1.41" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="m6.34 17.66-1.41 1.41" />
      <path d="m19.07 4.93-1.41 1.41" />
    </BaseIcon>
  );
}

export function Moon(props: LucideProps) {
  return (
    <BaseIcon {...props}>
      <path d="M12 3a7.5 7.5 0 1 0 9 9A9 9 0 1 1 12 3Z" />
    </BaseIcon>
  );
}

export function Menu(props: LucideProps) {
  return (
    <BaseIcon {...props}>
      <path d="M4 6h16" />
      <path d="M4 12h16" />
      <path d="M4 18h16" />
    </BaseIcon>
  );
}

export function LayoutDashboard(props: LucideProps) {
  return (
    <BaseIcon {...props}>
      <rect x="3" y="3" width="7" height="8" rx="1" />
      <rect x="14" y="3" width="7" height="5" rx="1" />
      <rect x="14" y="11" width="7" height="10" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
    </BaseIcon>
  );
}

export function FileText(props: LucideProps) {
  return (
    <BaseIcon {...props}>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <path d="M14 2v6h6" />
      <path d="M8 13h8" />
      <path d="M8 17h8" />
      <path d="M8 9h2" />
    </BaseIcon>
  );
}

export function Receipt(props: LucideProps) {
  return (
    <BaseIcon {...props}>
      <path d="M4 3h16v18l-2-1.5L16 21l-2-1.5L12 21l-2-1.5L8 21l-2-1.5L4 21z" />
      <path d="M8 7h8" />
      <path d="M8 11h8" />
      <path d="M8 15h5" />
    </BaseIcon>
  );
}

export function Newspaper(props: LucideProps) {
  return (
    <BaseIcon {...props}>
      <path d="M4 18h15a1 1 0 0 0 1-1V5H8a2 2 0 0 0-2 2v11" />
      <path d="M4 18a2 2 0 1 1 0-4h2" />
      <path d="M8 7h8" />
      <path d="M8 11h8" />
      <path d="M8 15h4" />
    </BaseIcon>
  );
}

export function GalleryVerticalEnd(props: LucideProps) {
  return (
    <BaseIcon {...props}>
      <path d="M3 3h18v5H3z" />
      <path d="m7 14 2.5-3 3 4 2-2 3.5 5H7z" />
      <path d="M3 21h18" />
    </BaseIcon>
  );
}

export function Users(props: LucideProps) {
  return (
    <BaseIcon {...props}>
      <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="8.5" cy="7" r="4" />
      <path d="M20 8v6" />
      <path d="M23 11h-6" />
    </BaseIcon>
  );
}

export function Handshake(props: LucideProps) {
  return (
    <BaseIcon {...props}>
      <path d="m11 14 2.5 2.5a2 2 0 0 0 2.8 0l4.2-4.2a2 2 0 0 0 0-2.8l-2.5-2.5a2 2 0 0 0-2.8 0L13 9" />
      <path d="M13 15 9.5 11.5a2 2 0 0 0-2.8 0L2.5 15.7a2 2 0 0 0 0 2.8L5 21" />
      <path d="m7 7 2-2a2 2 0 0 1 2.8 0l1.2 1.2" />
    </BaseIcon>
  );
}

export function Settings(props: LucideProps) {
  return (
    <BaseIcon {...props}>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.6 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 8.92 4.6H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9c.18.5.69.84 1.22.84H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </BaseIcon>
  );
}

export function Bell(props: LucideProps) {
  return (
    <BaseIcon {...props}>
      <path d="M10.27 21a2 2 0 0 0 3.46 0" />
      <path d="M4 16h16" />
      <path d="M6 16V11a6 6 0 1 1 12 0v5" />
    </BaseIcon>
  );
}

export function Trophy(props: LucideProps) {
  return (
    <BaseIcon {...props}>
      <path d="M8 21h8" />
      <path d="M12 17v4" />
      <path d="M8 4h8v5a4 4 0 0 1-8 0z" />
      <path d="M16 6h3a1 1 0 0 1 1 1v1a4 4 0 0 1-4 4" />
      <path d="M8 6H5a1 1 0 0 0-1 1v1a4 4 0 0 0 4 4" />
    </BaseIcon>
  );
}

export function Search(props: LucideProps) {
  return (
    <BaseIcon {...props}>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </BaseIcon>
  );
}

export function X(props: LucideProps) {
  return (
    <BaseIcon {...props}>
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </BaseIcon>
  );
}

export function Image(props: LucideProps) {
  return (
    <BaseIcon {...props}>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <circle cx="9" cy="9" r="1.5" />
      <path d="m21 15-4-4-7 7" />
    </BaseIcon>
  );
}

export function Shield(props: LucideProps) {
  return (
    <BaseIcon {...props}>
      <path d="M12 3 5 6v6c0 5 3.5 7.5 7 9 3.5-1.5 7-4 7-9V6z" />
    </BaseIcon>
  );
}

export function ShieldUser(props: LucideProps) {
  return (
    <BaseIcon {...props}>
      <path d="M20 13c0 5-3.5 7.5-8 9-4.5-1.5-8-4-8-9V6l8-3 8 3z" />
      <circle cx="12" cy="10" r="2.5" />
      <path d="M8.5 16a3.5 3.5 0 0 1 7 0" />
    </BaseIcon>
  );
}


export function ChevronDown(props: LucideProps) {
  return (
    <BaseIcon {...props}>
      <path d="m6 9 6 6 6-6" />
    </BaseIcon>
  );
}
export function LogIn(props: LucideProps) {
  return (
    <BaseIcon {...props}>
      <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
      <path d="M10 17l5-5-5-5" />
      <path d="M15 12H3" />
    </BaseIcon>
  );
}

export function LogOut(props: LucideProps) {
  return (
    <BaseIcon {...props}>
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <path d="M14 17l5-5-5-5" />
      <path d="M19 12H9" />
    </BaseIcon>
  );
}

export function Download(props: LucideProps) {
  return (
    <BaseIcon {...props}>
      <path d="M12 3v12" />
      <path d="m7 10 5 5 5-5" />
      <path d="M5 21h14" />
    </BaseIcon>
  );
}
