import Link from "next/link";
import Contacts from "./contacts/page";

export default function Home() {
  return (
    <div className="text-2xl grid gap-2 justify-center p-4">
      Selamat Datang

      <Link
            href="/contacts"
            className="inline-flex items-center space-x-1 text-white bg-blue-700 hover:bg-blue-800 px-5 py-[9px] rounded-sm text-sm"
        >
            Ke Halaman Kontak
        </Link>
    </div>
  )
}
