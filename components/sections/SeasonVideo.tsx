import { FilmPlayer } from "@/components/ui/FilmPlayer";

export function SeasonVideo() {
  return <section className="season-section"><div className="site-shell season-layout">
    <div className="season-copy"><p className="eyebrow">Een moment met Geeske</p><h2 className="section-title">Beweeg mee met<br/><em>het seizoen.</em></h2><p>De nazomer nodigt uit om stil te staan. In deze korte video vertel ik over het oogstseizoen en de houdingen en vragen die daarbij passen.</p><span className="film-duration">De nazomer <i/> 3 min 50</span></div>
    <div className="season-film"><FilmPlayer base="nazomer" posterName="nazomer-poster" posterWidths={[480,768,1024,1440,1920]} posterSizes="(max-width: 800px) 90vw, 620px" alt="Geeske vertelt over de nazomer" buttonLabel="Speel de seizoensles over de nazomer af" /></div>
  </div></section>;
}
