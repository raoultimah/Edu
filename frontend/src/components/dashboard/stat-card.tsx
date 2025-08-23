'use client';

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ArrowDown, ArrowUp } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  change?: {
    value: number;
    trend: "up" | "down" | "neutral";
    text: string;
  };
  className?: string;
}

export function StatCard({ title, value, icon, change, className }: StatCardProps) {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <h3 className="mt-1 text-2xl font-bold">{value}</h3>
          </div>
          <div className="rounded-full bg-primary/10 p-3 text-primary">
            {icon}
          </div>
        </div>
        
        {change && (
          <div className="mt-4 flex items-center text-xs">
            <div
              className={cn(
                "mr-1 flex items-center",
                change.trend === "up" ? "text-success" : change.trend === "down" ? "text-destructive" : "text-muted-foreground"
              )}
            >
              {change.trend === "up" ? (
                <ArrowUp className="mr-1 h-3 w-3" />
              ) : change.trend === "down" ? (
                <ArrowDown className="mr-1 h-3 w-3" />
              ) : null}
              <span>{Math.abs(change.value)}%</span>
            </div>
            <span className="text-muted-foreground">{change.text}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

