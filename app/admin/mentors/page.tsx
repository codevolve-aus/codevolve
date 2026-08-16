import type { Metadata } from "next";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Field, FieldArea } from "@/components/admin/FormFields";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import DbNotConfigured from "@/components/dashboard/DbNotConfigured";
import { getMentors, isDbConfigured, type Mentor } from "@/lib/content";
import { createMentor, updateMentor, deleteMentor } from "./actions";

export const metadata: Metadata = { title: "Mentors · Admin" };

export default async function AdminMentorsPage() {
  const dbReady = isDbConfigured();
  const mentors = dbReady ? await getMentors() : [];

  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Mentors</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Shown on the homepage and /mentors page.
          </p>
        </div>
        <MentorSheet action={createMentor} trigger="New mentor" title="New mentor" />
      </div>

      {!dbReady && <DbNotConfigured />}

      {dbReady && (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Mentor</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Focus</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mentors.map((mentor) => (
              <TableRow key={mentor.id}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8 border border-border">
                      <AvatarFallback className="bg-secondary font-mono text-xs text-foreground">
                        {mentor.initials}
                      </AvatarFallback>
                    </Avatar>
                    <span className="font-medium text-foreground">{mentor.name}</span>
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {mentor.role} · {mentor.companyType}
                </TableCell>
                <TableCell className="text-muted-foreground">{mentor.focus.join(", ")}</TableCell>
                <TableCell className="flex items-center justify-end gap-2">
                  <MentorSheet
                    action={updateMentor.bind(null, mentor.id)}
                    trigger="Edit"
                    title={`Edit ${mentor.name}`}
                    mentor={mentor}
                  />
                  <AlertDialog>
                    <AlertDialogTrigger render={<Button type="button" variant="ghost" size="sm" />}>
                      Delete
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete &ldquo;{mentor.name}&rdquo;?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This removes them from the mentors page immediately.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <form action={deleteMentor.bind(null, mentor.id)}>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction type="submit" variant="destructive">
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </form>
                    </AlertDialogContent>
                  </AlertDialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}

function MentorSheet({
  action,
  trigger,
  title,
  mentor,
}: {
  action: (formData: FormData) => void;
  trigger: string;
  title: string;
  mentor?: Mentor;
}) {
  return (
    <Sheet>
      <SheetTrigger
        render={<Button type="button" variant={mentor ? "outline" : "default"} size="sm" className="rounded-full" />}
      >
        {trigger}
      </SheetTrigger>
      <SheetContent>
        <form action={action} className="flex h-full flex-col">
          <SheetHeader>
            <SheetTitle>{title}</SheetTitle>
          </SheetHeader>
          <div className="flex flex-1 flex-col gap-4 overflow-y-auto px-4">
            <Field label="Name" name="name" defaultValue={mentor?.name} required />
            <Field label="Role" name="role" defaultValue={mentor?.role} required />
            <Field label="Company type" name="companyType" defaultValue={mentor?.companyType} />
            <Field
              label="Initials (for avatar)"
              name="initials"
              defaultValue={mentor?.initials}
              required
              placeholder="AB"
            />
            <FieldArea label="Bio" name="bio" defaultValue={mentor?.bio} required />
            <Field
              label="Focus areas (comma-separated)"
              name="focus"
              defaultValue={mentor?.focus.join(", ")}
              placeholder="Full-Stack Web, Interview Prep"
            />
          </div>
          <SheetFooter>
            <Button type="submit" className="rounded-full">
              Save mentor
            </Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
}
