import { FilmPlayer } from "@/components/ui/FilmPlayer";

export function SeasonVideo() {
  return <section className="season-section"><div className="site-shell season-layout">
    <div className="season-film"><FilmPlayer base="nazomer" posterName="nazomer-poster" posterWidths={[480,768,1024,1440,1920]} posterSizes="(max-width: 800px) 90vw, 620px" alt="Geeske vertelt over de nazomer" buttonLabel="Speel de seizoensles over de nazomer af" /></div>
    <div className="season-copy"><p className="eyebrow">Een klein moment, nu al</p><h2 className="section-title">Even vertragen.<br/><em>Voel maar mee.</em></h2><p>Een eerste kennismaking met mijn manier van werken. In deze korte video neem ik je mee in de nazomer, met houdingen en vragen om bij stil te staan.</p><span className="film-duration">De nazomer <i/> 3 min 50</span></div>
  </div></section>;
}
