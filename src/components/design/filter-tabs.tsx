"use client";

import * as React from "react";

import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

/**
 * The site's filter-tab styling, as thin wrappers over the shadcn primitives.
 *
 * Wrappers rather than one `<FilterTabs items>` component because the four
 * call sites differ in *layout* (a 2×4 grid here, `flex-1` triggers there,
 * numbered wrapping labels on /development). These bake the visual language
 * and leave layout to the call site.
 */
export const FilterTabsList = React.forwardRef<
  React.ElementRef<typeof TabsList>,
  React.ComponentPropsWithoutRef<typeof TabsList>
>(({ className, ...props }, ref) => (
  <TabsList
    ref={ref}
    className={cn(
      "h-auto flex-wrap justify-center gap-1.5 rounded-xl border border-border/80 bg-muted/50 p-1.5",
      className
    )}
    {...props}
  />
));
FilterTabsList.displayName = "FilterTabsList";

export const FilterTabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsTrigger>,
  React.ComponentPropsWithoutRef<typeof TabsTrigger>
>(({ className, ...props }, ref) => (
  <TabsTrigger
    ref={ref}
    className={cn(
      "rounded-lg px-3 py-2.5 text-sm font-semibold data-[state=active]:bg-primary data-[state=active]:text-primary-foreground",
      className
    )}
    {...props}
  />
));
FilterTabsTrigger.displayName = "FilterTabsTrigger";
