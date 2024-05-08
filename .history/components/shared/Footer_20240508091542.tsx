import Link from "next/link";

const Footer = () => {
  return (
    <footer className="border-t bg-blue">
      <div className="flex-center wrapper flex-between flex flex-col gap-2 p-5 text-center sm:flex-row">
        <Link href="/">
          <p className="text-green p-medium-18">point.game</p>
        </Link>
        <Link href="/leagues">
          <p className="text-green p-medium-18">Leagues</p>
        </Link>

        <Link href="/how_to">
          <p className="text-green p-medium-18">How to point.game</p>
        </Link>

        <p className="text-green">2024 pointgame. All Rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
