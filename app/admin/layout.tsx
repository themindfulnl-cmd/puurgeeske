import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Home, LogOut } from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-[#f8f2f4] md:flex">
    <aside className="border-b border-[#ead8df] bg-white p-5 md:w-64 md:min-h-screen md:border-b-0 md:border-r flex flex-col">
      <Link href="/admin" className="flex items-center gap-3"><Image src="/brand/puurgeeske-sunset.png" alt="PuurGeeske" width={56} height={56} className="rounded-xl" /><span className="font-serif text-xl text-[#793057]">PuurGeeske</span></Link>
      <p className="text-xs text-stone-500 mt-2">Websitebeheer</p>
      <nav className="mt-8 grid gap-2">
        <Link href="/admin" className="flex items-center gap-3 rounded-xl px-4 py-3 text-stone-700 hover:bg-[#f8f2f4]"><Home size={19} /> Overzicht</Link>
        <Link href="/admin/events" className="flex items-center gap-3 rounded-xl px-4 py-3 text-stone-700 hover:bg-[#f8f2f4]"><Calendar size={19} /> Lessen & workshops</Link>
      </nav>
      <div className="mt-auto grid gap-2 pt-6">
        <Link href="/" className="flex items-center gap-3 rounded-xl px-4 py-3 text-stone-600 hover:bg-[#f8f2f4]"><Home size={18} /> Bekijk website</Link>
        <form action="/api/admin/logout" method="POST"><button type="submit" className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-red-700 hover:bg-red-50"><LogOut size={18} /> Uitloggen</button></form>
      </div>
    </aside>
    <main className="min-w-0 flex-1">{children}</main>
  </div>;
}
