import React from "react";
import { cn } from "@/lib/utils";

interface TableProps {
  columns: string[];
  data: (string[])[];
  className?: string;
}

export const Table: React.FC<TableProps> = ({ columns, data, className }) => {
  return (
    <div className={cn("overflow-x-auto rounded-lg border border-muted", className)}>
      <table className="min-w-full bg-background text-foreground">
        <thead>
          <tr>
            {columns.map((col, idx) => (
              <th
                key={idx}
                className="px-4 py-3 font-semibold text-base border-b border-muted text-center bg-accent"
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i} className="hover:bg-muted transition-colors">
              {row.map((cell, j) => (
                <td
                  key={j}
                  className="px-4 py-3 border-b border-muted text-center text-sm"
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
