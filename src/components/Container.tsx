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
          "w-full mx-auto",
          /* 288/320=90% | 704/768≈91.67% | 1317/1440≈91.46% */
          "max-w-[90%] px-4",
          "min-[768px]:max-w-[91.67%] min-[768px]:px-8",
          "min-[1440px]:max-w-[91.46%] min-[1440px]:px-12",
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
