import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="border-t bg-blue">
      <div className="flex-center wrapper flex-between flex flex-col gap-4 p-5 text-center sm:flex-row">
        <Link href="/">
          {/* <Image
            src="/assets/images/logo.png"
            alt="logo"
            width={128}
            height={38}
          /> */}
          <h2 className="text-white">point.game</h2>
        </Link>

        <Link href="/how_to">
          <h2 className="text-white">How To</h2>
        </Link>

        <p className="text-white">2024 pointgame. All Rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
