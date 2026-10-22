import Link from "next/link";
import { ArrowUpRight, Plus } from "lucide-react";
const questions = [
  ['Hoe maak ik een afspraak?', 'Stuur me een WhatsApp-bericht of e-mail. Samen bespreken we wat je zoekt en spreken we een datum en locatie af.'],
  ['Waar vind ik de actuele lestijden?', 'Neem contact met me op voor de huidige lesplanning. Aangekondigde workshops vind je in de agenda, met de bijbehorende boekingslink.'],
  ['Welke les of sessie past bij mij?', 'Dat bespreken we samen. Vertel me wat je zoekt en stel je vragen voordat je een afspraak maakt.'],
];
export function FAQ() {
  return <section className="faq-section"><div className="site-shell faq-layout"><div><p className="eyebrow">Praktisch</p><h2 className="section-title">Goed om <br/><em>te weten.</em></h2><p>Staat je vraag er niet bij?<br/>Stuur me gerust een bericht.</p><Link href="/contact" className="text-link">Neem contact op <ArrowUpRight size={15}/></Link></div><div>{questions.map(([q,a],i) => <details className="faq-item" key={q}><summary><span className="faq-number">0{i+1}</span><span>{q}</span><Plus size={18} strokeWidth={1.3}/></summary><p>{a}</p></details>)}</div></div></section>;
}
