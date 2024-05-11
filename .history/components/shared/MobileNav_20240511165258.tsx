import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import { Separator } from "../ui/separator";
import NavItems from "./NavItems";

type MobileNavProps = {
  id: string;
};

const MobileNav = ({ id }: MobileNavProps) => {
  return (
    <nav className="md:hidden">
      <Sheet>
        <SheetTrigger className="align-middle">
          <Image
            src="/assets/icons/menu.svg"
            alt="menu"
            width={24}
            height={24}
            className="cursor-pointer"
          />
        </SheetTrigger>
        <SheetContent className="flex flex-col gap-6 bg-blue md:hidden">
          <h2 className="text-green h2-bold">point.game</h2>
          <Separator className="border border-gray-50" />
          <NavItems id={id} />
        </SheetContent>
      </Sheet>
    </nav>
  );
};

export default MobileNav;
