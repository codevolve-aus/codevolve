import Link from "next/link";
import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
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
import { getAllTracks, isDbConfigured } from "@/lib/content";
import { createTrack, deleteTrack, setTrackEnabled } from "./actions";
import { cn } from "@/lib/utils";

export const metadata: Metadata = { title: "Tracks · Admin" };

export default async function AdminTracksPage() {
  const dbReady = isDbConfigured();
  const tracks = dbReady ? await getAllTracks({ includeDisabled: true }) : [];

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Tracks</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage career tracks. Edit a track to add modules and lessons.
          </p>
        </div>
        <Sheet>
          <SheetTrigger render={<Button className="rounded-full" />}>New track</SheetTrigger>
          <SheetContent>
            <form action={createTrack} className="flex h-full flex-col">
              <SheetHeader>
                <SheetTitle>New track</SheetTitle>
              </SheetHeader>
              <div className="flex flex-1 flex-col gap-4 overflow-y-auto px-4">
                <Field label="Title" name="title" required />
                <Field label="Slug (optional — derived from title)" name="slug" />
                <Field label="Tagline" name="tagline" required />
                <FieldArea label="Description" name="description" required />
                <Field label="Category" name="category" required placeholder="Software Engineering" />
                <Field label="Level" name="level" placeholder="Beginner" />
                <Field label="Duration (weeks)" name="durationWeeks" type="number" placeholder="8" />
                <Field
                  label="Gradient classes"
                  name="gradient"
                  placeholder="from-violet-500 to-cyan-400"
                />
                <Field label="Icon (lucide name)" name="icon" placeholder="code-2" />
                <FieldArea
                  label="Outcomes (one per line)"
                  name="outcomes"
                  placeholder={"Build real projects\nShip to production"}
                />
                <label className="flex items-center gap-2 text-sm text-foreground">
                  <input type="checkbox" name="comingSoon" className="h-4 w-4 rounded border-input" />
                  Coming soon (no enrollment yet)
                </label>
                <label className="flex items-center gap-2 text-sm text-foreground">
                  <input
                    type="checkbox"
                    name="enabled"
                    defaultChecked
                    className="h-4 w-4 rounded border-input"
                  />
                  Enabled (visible on the public site)
                </label>
              </div>
              <SheetFooter>
                <Button type="submit" className="rounded-full">
                  Create track
                </Button>
              </SheetFooter>
            </form>
          </SheetContent>
        </Sheet>
      </div>

      {!dbReady && <DbNotConfigured />}

      {dbReady && (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Modules</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tracks.map((track) => (
              <TableRow key={track.id}>
                <TableCell className="font-medium text-foreground">{track.title}</TableCell>
                <TableCell className="text-muted-foreground">{track.category}</TableCell>
                <TableCell className="flex flex-wrap gap-1.5">
                  {!track.enabled ? (
                    <Badge variant="destructive">Disabled</Badge>
                  ) : track.comingSoon ? (
                    <Badge variant="secondary">Coming soon</Badge>
                  ) : (
                    <Badge className="bg-commit-green text-background">Live</Badge>
                  )}
                </TableCell>
                <TableCell className="text-muted-foreground">{track.modules.length}</TableCell>
                <TableCell className="flex items-center justify-end gap-2">
                  <Link
                    href={`/admin/tracks/${track.id}`}
                    className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
                  >
                    Edit
                  </Link>
                  <form action={setTrackEnabled.bind(null, track.id, !track.enabled)}>
                    <Button type="submit" variant="outline" size="sm">
                      {track.enabled ? "Disable" : "Enable"}
                    </Button>
                  </form>
                  <AlertDialog>
                    <AlertDialogTrigger render={<Button variant="ghost" size="sm" />}>
                      Delete
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete &ldquo;{track.title}&rdquo;?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This deletes the track and all its modules and lessons. Student
                          enrollments/progress for this track are kept but will no longer resolve
                          to a lesson.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <form action={deleteTrack.bind(null, track.id)}>
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
