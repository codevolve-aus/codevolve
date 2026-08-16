import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import type { Mentor } from "@/lib/content";

export default function MentorsGrid({ mentors }: { mentors: Mentor[] }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {mentors.map((mentor) => (
        <div
          key={mentor.slug}
          className="flex flex-col gap-4 rounded-xl border border-border bg-card/60 p-6"
        >
          <div className="flex items-center gap-3">
            <Avatar className="h-11 w-11 border border-border">
              <AvatarFallback className="bg-secondary font-mono text-sm text-foreground">
                {mentor.initials}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="text-sm font-semibold text-foreground">{mentor.name}</div>
              <div className="text-xs text-muted-foreground">
                {mentor.role} · {mentor.companyType}
              </div>
            </div>
          </div>
          <p className="text-sm leading-relaxed text-muted-foreground">{mentor.bio}</p>
          <div className="flex flex-wrap gap-2">
            {mentor.focus.map((f) => (
              <Badge key={f} variant="outline" className="font-mono text-[10px]">
                {f}
              </Badge>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
