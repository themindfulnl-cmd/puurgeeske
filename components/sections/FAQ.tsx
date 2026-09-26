import Link from "next/link";
export function FAQ(){return <section className="py-24 bg-background"><div className="container mx-auto px-6 md:px-12 faq-layout"><div><p className="eyebrow">Een fijne eerste stap</p><h2 className="text-4xl md:text-5xl mt-5 mb-6">Nog een <em className="text-primary">vraag?</em></h2><p className="text-muted-foreground leading-relaxed">Je hoeft nog niet precies te weten wat je zoekt. We denken graag met je mee.</p><Link href="/contact" className="text-link mt-7">Neem contact op ↗</Link></div><div>{[
['Hoe maak ik een afspraak?','Stuur Geeske een WhatsApp-bericht of e-mail. Samen stem je het aanbod, de datum en de locatie af.'],
['Waar vind ik de actuele lestijden?','Neem contact op voor de huidige planning. In de agenda vind je de aangekondigde workshops en de bijbehorende boekingslink.'],
['Kan ik eerst overleggen welke sessie past?','Zeker. Vertel waar je naar op zoek bent en stel gerust je vragen voordat je een afspraak maakt.']
].map(([q,a])=><details className="faq-item" key={q}><summary>{q}<span aria-hidden="true">+</span></summary><p>{a}</p></details>)}</div></div></section>}
