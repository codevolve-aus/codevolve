import type { Metadata } from "next";
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
import { getTestimonials, isDbConfigured, type Testimonial } from "@/lib/content";
import { createTestimonial, updateTestimonial, deleteTestimonial } from "./actions";

export const metadata: Metadata = { title: "Testimonials · Admin" };

export default async function AdminTestimonialsPage() {
  const dbReady = isDbConfigured();
  const testimonials = dbReady ? await getTestimonials() : [];

  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Testimonials</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Shown on the homepage and /success-stories page.
          </p>
        </div>
        <TestimonialSheet action={createTestimonial} trigger="New testimonial" title="New testimonial" />
      </div>

      {!dbReady && <DbNotConfigured />}

      {dbReady && (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Quote</TableHead>
              <TableHead>Track</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {testimonials.map((t) => (
              <TableRow key={t.id}>
                <TableCell className="font-medium text-foreground">{t.name}</TableCell>
                <TableCell className="max-w-sm truncate text-muted-foreground">{t.quote}</TableCell>
                <TableCell className="text-muted-foreground">{t.track}</TableCell>
                <TableCell className="flex items-center justify-end gap-2">
                  <TestimonialSheet
                    action={updateTestimonial.bind(null, t.id)}
                    trigger="Edit"
                    title={`Edit ${t.name}`}
                    testimonial={t}
                  />
                  <AlertDialog>
                    <AlertDialogTrigger render={<Button type="button" variant="ghost" size="sm" />}>
                      Delete
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete this testimonial?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This removes it from the site immediately.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <form action={deleteTestimonial.bind(null, t.id)}>
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

function TestimonialSheet({
  action,
  trigger,
  title,
  testimonial,
}: {
  action: (formData: FormData) => void;
  trigger: string;
  title: string;
  testimonial?: Testimonial;
}) {
  return (
    <Sheet>
      <SheetTrigger
        render={
          <Button
            type="button"
            variant={testimonial ? "outline" : "default"}
            size="sm"
            className="rounded-full"
          />
        }
      >
        {trigger}
      </SheetTrigger>
      <SheetContent>
        <form action={action} className="flex h-full flex-col">
          <SheetHeader>
            <SheetTitle>{title}</SheetTitle>
          </SheetHeader>
          <div className="flex flex-1 flex-col gap-4 overflow-y-auto px-4">
            <Field label="Name" name="name" defaultValue={testimonial?.name} required />
            <Field
              label="Context"
              name="context"
              defaultValue={testimonial?.context}
              placeholder="Year 11 student"
            />
            <FieldArea label="Quote" name="quote" defaultValue={testimonial?.quote} required />
            <Field label="Outcome" name="outcome" defaultValue={testimonial?.outcome} required />
            <Field label="Track" name="track" defaultValue={testimonial?.track} />
          </div>
          <SheetFooter>
            <Button type="submit" className="rounded-full">
              Save testimonial
            </Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
}
