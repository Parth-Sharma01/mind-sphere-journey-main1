import { Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface InfoButtonProps {
  title: string;
  description: string;
  howCalculated: string;
  tips: string[];
}

export function InfoButton({ title, description, howCalculated, tips }: InfoButtonProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button className="inline-flex items-center justify-center h-5 w-5 rounded-full hover:bg-white/10 transition-colors">
            <Info className="h-4 w-4 text-muted-foreground hover:text-foreground" />
          </button>
        </TooltipTrigger>
        <TooltipContent side="right" className="w-80 p-4 glass">
          <div className="space-y-3">
            <div>
              <h4 className="font-semibold text-sm">{title}</h4>
              <p className="text-xs text-muted-foreground mt-1">{description}</p>
            </div>
            <div className="border-t border-white/10 pt-2">
              <p className="text-xs font-medium text-foreground mb-1">How it's calculated:</p>
              <p className="text-xs text-muted-foreground">{howCalculated}</p>
            </div>
            {tips.length > 0 && (
              <div className="border-t border-white/10 pt-2">
                <p className="text-xs font-medium text-foreground mb-2">Tips to improve:</p>
                <ul className="space-y-1">
                  {tips.map((tip, i) => (
                    <li key={i} className="text-xs text-muted-foreground flex gap-2">
                      <span className="text-emerald-300">✓</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
