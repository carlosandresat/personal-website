import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function ComingSoonDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>View more</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Cooming Soon</DialogTitle>
          <DialogDescription>
            The page for this course is still being integrated, but you can
            contact me directly if you need information.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
