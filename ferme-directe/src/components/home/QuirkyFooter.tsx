'use client';

import { ArrowRight, Mail } from 'lucide-react';

const FAQ_ITEMS = [
  {
    q: 'Livrati si in afara orasului?',
    a: 'Momentan livram doar in oras si in zonele limitrofe pentru a garanta prospetimea.'
  },
  {
    q: 'Sunt rosiile voastre bio?',
    a: 'Cultivam curat, fara pesticide de sinteza. Asteptam certificarea oficiala, dar pamantul e martor.'
  },
  {
    q: 'Ce se intampla daca nu sunt multumit?',
    a: 'Simplu: ne scrii, venim sa luam comanda inapoi si iti restituim banii. Fara discutii.'
  }
];

export default function QuirkyFooter() {
  return (
    <section className="bg-zinc-900 border-t-2 border-zinc-900">
      
      {/* Massive Newsletter Section */}
      <div className="py-24 border-b-2 border-zinc-700 bg-[#d9381e]">
        <div className="container-site max-w-4xl mx-auto text-center">
          <h2 className="font-display text-5xl md:text-7xl uppercase text-[#f4efdf] mb-8 leading-none">
            Rămâi în <br/>Contact.
          </h2>
          <p className="text-[#f4efdf] text-xl mb-12 font-medium">
            Fără spam. Doar vești bune despre recoltă, rețete de sezon și invitații la fermă.
          </p>
          <form className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto" onSubmit={(e) => e.preventDefault()}>
            <div className="relative flex-grow">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-zinc-900" />
              <input 
                type="email" 
                placeholder="Adresa ta de email" 
                className="w-full bg-[#f4efdf] border-2 border-zinc-900 text-zinc-900 text-lg py-4 pl-14 pr-4 rounded-full outline-none focus:shadow-[4px_4px_0px_0px_rgba(24,24,27,1)] transition-shadow placeholder:text-zinc-500 font-bold"
                required
              />
            </div>
            <button type="submit" className="btn bg-zinc-900 text-[#f4efdf] text-lg px-8 py-4 border-2 border-zinc-900 hover:bg-[#f3ca20] hover:text-zinc-900 transition-colors">
              Abonează-te
            </button>
          </form>
        </div>
      </div>

      {/* Accordion FAQ & Contact Info */}
      <div className="py-24 bg-[#f4efdf]">
        <div className="container-site">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            
            {/* FAQ */}
            <div>
              <h3 className="font-display text-4xl text-zinc-900 uppercase mb-8">Întrebări Frecvente</h3>
              <div className="flex flex-col gap-4">
                {FAQ_ITEMS.map((item, i) => (
                  <details key={i} className="group bg-white border-2 border-zinc-900 rounded-xl p-6 cursor-pointer shadow-[4px_4px_0px_0px_rgba(24,24,27,1)]">
                    <summary className="font-bold text-lg text-zinc-900 flex justify-between items-center list-none">
                      {item.q}
                      <span className="transition group-open:rotate-45 text-2xl leading-none">+</span>
                    </summary>
                    <p className="mt-4 text-zinc-700 font-medium pt-4 border-t-2 border-zinc-100">
                      {item.a}
                    </p>
                  </details>
                ))}
              </div>
            </div>

            {/* Info */}
            <div className="flex flex-col justify-between">
              <div>
                <h3 className="font-display text-4xl text-zinc-900 uppercase mb-8">Ferma Noastră</h3>
                <address className="not-italic text-lg text-zinc-800 font-medium flex flex-col gap-2">
                  <p>Strada Câmpului, Nr. 12</p>
                  <p>Județul Ilfov, România</p>
                  <p className="mt-4 font-mono font-bold">L-V: 08:00 - 18:00</p>
                </address>
              </div>
              <div className="mt-12">
                <a href="mailto:salut@fermadirecte.ro" className="inline-flex items-center gap-2 font-display text-2xl uppercase text-[#d9381e] hover:text-zinc-900 transition-colors">
                  salut@fermadirecte.ro <ArrowRight className="w-6 h-6" />
                </a>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Massive Typography Bottom */}
      <div className="bg-zinc-900 py-12 overflow-hidden flex justify-center border-t-2 border-zinc-900">
        <h2 className="font-display text-[12vw] font-black text-transparent bg-clip-text bg-gradient-to-b from-zinc-700 to-zinc-900 uppercase leading-none select-none tracking-tight">
          SĂ MÂNCĂM BINE
        </h2>
      </div>

    </section>
  );
}
