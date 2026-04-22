import * as React from "react";

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: React.ElementType;
}

export const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ as: Component = "div", className = "", children, ...props }, ref) => {
    return (
      <Component
        ref={ref}
        className={[
          "w-full",
          /* єдиний відступ: mobile 16px, tablet 32px, desktop 80px */
          "px-4",
          "min-[768px]:px-8",
          "min-[1440px]:px-[80px]",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Container.displayName = "Container";
