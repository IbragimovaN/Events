"use client";

type AuthorBadgeProps = {
  className?: string;
};

export const AuthorBadge = ({ className }: AuthorBadgeProps) => {
  return (
    <div className={`absolute bottom-6 right-2 ${className}`}>
      <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
        Ваше событие
      </span>
    </div>
  );
};
