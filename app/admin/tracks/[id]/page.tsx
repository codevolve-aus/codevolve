import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { eq } from "drizzle-orm";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Field, FieldArea } from "@/components/admin/FormFields";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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
import { getDb } from "@/src/db";
import { tracks } from "@/src/db/schema";
import { STAGE_ORDER, STAGE_META } from "@/lib/evolution";
import { isClerkConfigured } from "@/lib/clerk-config";
import {
  updateTrack,
  createModule,
  updateModule,
  deleteModule,
  createLesson,
  updateLesson,
  deleteLesson,
} from "./actions";

async function getTrackForEdit(id: string) {
  const db = getDb();
  return db.query.tracks.findFirst({
    where: eq(tracks.id, id),
    with: {
      modules: {
        orderBy: (m, { asc }) => [asc(m.order)],
        with: { lessons: { orderBy: (l, { asc }) => [asc(l.order)] } },
      },
    },
  });
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  // Keep this static when Clerk isn't configured — admin/layout.tsx bails out to a fully
  // static notice in that case, so this must not be the route's only dynamic data access.
  if (!isClerkConfigured()) return { title: "Track · Admin" };
  const { id } = await params;
  const track = await getTrackForEdit(id);
  return { title: track ? `${track.title} · Admin` : "Track · Admin" };
}

export default async function AdminTrackEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const track = await getTrackForEdit(id);
  if (!track) notFound();

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-10">
      <div className="flex items-center gap-3">
        <div>
          <p className="font-mono text-xs text-muted-foreground">/tracks/{track.slug}</p>
          <h1 className="mt-1 text-2xl font-semibold text-foreground">{track.title}</h1>
        </div>
        {!track.enabled && (
          <span className="rounded-full bg-destructive/15 px-2.5 py-0.5 font-mono text-xs text-destructive">
            Disabled
          </span>
        )}
      </div>

      <section className="rounded-xl border border-border bg-card/60 p-6">
        <h2 className="text-sm font-semibold text-foreground">Track details</h2>
        <form action={updateTrack.bind(null, track.id)} className="mt-4 flex flex-col gap-4">
          <Field label="Title" name="title" defaultValue={track.title} required />
          <Field label="Tagline" name="tagline" defaultValue={track.tagline} required />
          <FieldArea
            label="Description"
            name="description"
            defaultValue={track.description}
            required
          />
          <div className="grid grid-cols-2 gap-4">
            <Field label="Category" name="category" defaultValue={track.category} required />
            <Field label="Level" name="level" defaultValue={track.level} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Field
              label="Duration (weeks)"
              name="durationWeeks"
              type="number"
              defaultValue={String(track.durationWeeks)}
            />
            <Field label="Icon (lucide name)" name="icon" defaultValue={track.icon} />
          </div>
          <Field label="Gradient classes" name="gradient" defaultValue={track.gradient} />
          <FieldArea
            label="Outcomes (one per line)"
            name="outcomes"
            defaultValue={track.outcomes.join("\n")}
          />
          <label className="flex items-center gap-2 text-sm text-foreground">
            <input
              type="checkbox"
              name="comingSoon"
              defaultChecked={track.comingSoon}
              className="h-4 w-4 rounded border-input"
            />
            Coming soon (no enrollment yet)
          </label>
          <label className="flex items-center gap-2 text-sm text-foreground">
            <input
              type="checkbox"
              name="enabled"
              defaultChecked={track.enabled}
              className="h-4 w-4 rounded border-input"
            />
            Enabled (visible on the public site; disabling freezes it for enrolled students too)
          </label>
          <Button type="submit" className="w-fit rounded-full">
            Save track
          </Button>
        </form>
      </section>

      <section>
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">
            Modules &amp; lessons ({track.modules.length})
          </h2>
        </div>

        <Accordion className="mt-4">
          {track.modules.map((mod) => (
            <AccordionItem key={mod.id} value={mod.id} className="border-border">
              <AccordionTrigger className="text-sm">
                <span className="flex items-center gap-2">
                  <code className="font-mono text-xs" style={{ color: STAGE_META[mod.stage as keyof typeof STAGE_META]?.color }}>
                    {mod.stage}
                  </code>
                  {mod.title}
                  <span className="font-mono text-xs text-muted-foreground">
                    ({mod.lessons.length} lessons)
                  </span>
                </span>
              </AccordionTrigger>
              <AccordionContent className="flex flex-col gap-6">
                <form
                  action={updateModule.bind(null, track.id, mod.id)}
                  className="flex flex-col gap-3 rounded-lg border border-border p-4"
                >
                  <Field label="Module title" name="title" defaultValue={mod.title} required />
                  <FieldArea label="Summary" name="summary" defaultValue={mod.summary} />
                  <div className="grid gap-1.5">
                    <Label htmlFor={`stage-${mod.id}`}>Evolution stage</Label>
                    <Select name="stage" defaultValue={mod.stage}>
                      <SelectTrigger id={`stage-${mod.id}`}>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {STAGE_ORDER.map((s) => (
                          <SelectItem key={s} value={s}>
                            {s}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex gap-2">
                    <Button type="submit" size="sm" className="rounded-full">
                      Save module
                    </Button>
                    <DeleteModuleButton trackId={track.id} moduleId={mod.id} title={mod.title} />
                  </div>
                </form>

                <div className="flex flex-col gap-3 pl-4">
                  {mod.lessons.map((lesson) => (
                    <LessonEditor
                      key={lesson.id}
                      trackId={track.id}
                      lesson={lesson}
                    />
                  ))}

                  <details className="rounded-lg border border-dashed border-border p-4">
                    <summary className="cursor-pointer text-sm font-medium text-foreground">
                      + Add lesson
                    </summary>
                    <form
                      action={createLesson.bind(null, track.id, mod.id)}
                      className="mt-4 flex flex-col gap-3"
                    >
                      <Field label="Title" name="title" required />
                      <Field label="Summary" name="summary" />
                      <FieldArea
                        label="Content (markdown)"
                        name="content"
                        required
                        placeholder={"Explain the concept.\n\n**Exercise:** ..."}
                      />
                      <div className="grid grid-cols-2 gap-4">
                        <Field label="Minutes" name="minutes" type="number" placeholder="20" />
                        <Field label="XP" name="xp" type="number" placeholder="20" />
                      </div>
                      <Button type="submit" size="sm" className="w-fit rounded-full">
                        Add lesson
                      </Button>
                    </form>
                  </details>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <details className="mt-4 rounded-lg border border-dashed border-border p-4">
          <summary className="cursor-pointer text-sm font-medium text-foreground">
            + Add module
          </summary>
          <form action={createModule.bind(null, track.id)} className="mt-4 flex flex-col gap-3">
            <Field label="Title" name="title" required />
            <FieldArea label="Summary" name="summary" />
            <div className="grid gap-1.5">
              <Label htmlFor="new-module-stage">Evolution stage</Label>
              <Select name="stage" defaultValue="init">
                <SelectTrigger id="new-module-stage">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {STAGE_ORDER.map((s) => (
                    <SelectItem key={s} value={s}>
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button type="submit" size="sm" className="w-fit rounded-full">
              Add module
            </Button>
          </form>
        </details>
      </section>
    </div>
  );
}

function LessonEditor({
  trackId,
  lesson,
}: {
  trackId: string;
  lesson: { id: string; title: string; summary: string; content: string; minutes: number; xp: number };
}) {
  return (
    <details className="rounded-lg border border-border p-4">
      <summary className="cursor-pointer text-sm font-medium text-foreground">
        {lesson.title}{" "}
        <span className="font-mono text-xs text-muted-foreground">
          ({lesson.minutes}m · {lesson.xp}xp)
        </span>
      </summary>
      <form
        action={updateLesson.bind(null, trackId, lesson.id)}
        className="mt-4 flex flex-col gap-3"
      >
        <Field label="Title" name="title" defaultValue={lesson.title} required />
        <Field label="Summary" name="summary" defaultValue={lesson.summary} />
        <FieldArea
          label="Content (markdown)"
          name="content"
          defaultValue={lesson.content}
          required
          rows={8}
        />
        <div className="grid grid-cols-2 gap-4">
          <Field
            label="Minutes"
            name="minutes"
            type="number"
            defaultValue={String(lesson.minutes)}
          />
          <Field label="XP" name="xp" type="number" defaultValue={String(lesson.xp)} />
        </div>
        <div className="flex gap-2">
          <Button type="submit" size="sm" className="rounded-full">
            Save lesson
          </Button>
          <DeleteLessonButton trackId={trackId} lessonId={lesson.id} title={lesson.title} />
        </div>
      </form>
    </details>
  );
}

function DeleteModuleButton({
  trackId,
  moduleId,
  title,
}: {
  trackId: string;
  moduleId: string;
  title: string;
}) {
  return (
    <AlertDialog>
      <AlertDialogTrigger render={<Button type="button" variant="ghost" size="sm" />}>
        Delete module
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete &ldquo;{title}&rdquo;?</AlertDialogTitle>
          <AlertDialogDescription>
            This deletes the module and all its lessons.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <form action={deleteModule.bind(null, trackId, moduleId)}>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction type="submit" variant="destructive">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}

function DeleteLessonButton({
  trackId,
  lessonId,
  title,
}: {
  trackId: string;
  lessonId: string;
  title: string;
}) {
  return (
    <AlertDialog>
      <AlertDialogTrigger render={<Button type="button" variant="ghost" size="sm" />}>
        Delete lesson
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete &ldquo;{title}&rdquo;?</AlertDialogTitle>
          <AlertDialogDescription>
            Students who completed this lesson keep their XP, but it won&apos;t appear in the
            track anymore.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <form action={deleteLesson.bind(null, trackId, lessonId)}>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction type="submit" variant="destructive">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
