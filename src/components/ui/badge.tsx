import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive: "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
        draft: "border-transparent bg-muted text-muted-foreground",
        submitted: "border-transparent bg-status-submitted/10 text-status-submitted",
        review: "border-transparent bg-status-review/10 text-status-review",
        revision: "border-transparent bg-status-revision/10 text-status-revision",
        accepted: "border-transparent bg-status-accepted/10 text-status-accepted",
        rejected: "border-transparent bg-status-rejected/10 text-status-rejected",
        published: "border-transparent bg-status-published/10 text-status-published",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
