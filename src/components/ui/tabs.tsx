import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";

import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const tabsListVariants = cva("inline-flex ", {
  variants: {
    variant: {
      default:
        "relative bg-muted text-muted-foreground inline-flex h-8 w-fit items-center justify-center rounded-[6px] p-0.5",
      underline:
        "relative inline-flex h-9 items-center text-muted-foreground w-full justify-start rounded-none border-b bg-transparent p-0",
      // Add more variants here
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

const tabsTriggerVariants = cva("inline-flex items-center justify-center", {
  variants: {
    variant: {
      default:
        "cursor-pointer relative z-10 dark:data-[state=active]:text-foreground data-[state=active]:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring text-muted-foreground dark:text-muted-foreground inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-[6px] border border-transparent px-2 py-1 text-sm whitespace-nowrap focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
      underline:
        "cursor-pointer relative h-9 whitespace-nowrap text-[15px] ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 rounded-none bg-transparent mr-5 py-2.5 text-grey-opacity-800 data-[state=active]:font-medium shadow-none",
      // Add more variants here
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

function Tabs({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      className={cn("flex flex-col gap-2", className)}
      {...props}
    />
  );
}

function TabsList({
  className,
  children,
  variant,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List> &
  VariantProps<typeof tabsListVariants>) {
  const listRef = React.useRef<HTMLDivElement>(null);
  const indicatorRef = React.useRef<HTMLDivElement>(null);

  const updateIndicator = React.useCallback(() => {
    const list = listRef.current;
    const ind = indicatorRef.current;
    if (!list || !ind) return;

    const active = list.querySelector<HTMLElement>('[data-state="active"]');
    if (!active) return;

    const listRect = list.getBoundingClientRect();
    const activeRect = active.getBoundingClientRect();
    const left = activeRect.left - listRect.left + list.scrollLeft;
    const width = activeRect.width;

    ind.style.transform = `translateX(${left}px)`;
    ind.style.width = `${width}px`;
  }, []);

  React.useLayoutEffect(() => {
    updateIndicator();
    document.addEventListener("resize", updateIndicator);
    return () => document.removeEventListener("resize", updateIndicator);
  }, [children, updateIndicator]);

  return (
    <TabsPrimitive.List
      ref={listRef}
      data-slot="tabs-list"
      className={cn(tabsListVariants({ variant, className }))}
      {...props}
    >
      {children}
      <div
        ref={indicatorRef}
        className={cn(
          variant === "underline"
            ? "absolute bottom-0 left-0 h-[2px] bg-grey-opacity-800 transition-[width,transform] duration-300 ease-out"
            : "absolute top-[3px] left-0 h-[26px] rounded-[6px] bg-white shadow-sm z-0 transition-[width,transform] duration-300 ease-out",
        )}
      />
    </TabsPrimitive.List>
  );
}

function TabsTrigger({
  className,
  variant,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger> &
  VariantProps<typeof tabsTriggerVariants>) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(tabsTriggerVariants({ variant, className }))}
      {...props}
    />
  );
}

function TabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn("flex-1 outline-none", className)}
      {...props}
    />
  );
}

export { Tabs, TabsList, TabsTrigger, TabsContent };
