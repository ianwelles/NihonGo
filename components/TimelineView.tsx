import React from 'react';
import { CityName } from '../types';

interface TimelineViewProps {
  activeCity: CityName;
  openDay: string | null;
  handleToggle: (e: React.MouseEvent, dayId: string) => void;
}

export const TimelineView: React.FC<TimelineViewProps> = ({ activeCity, openDay, handleToggle }) => {
  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
        {activeCity === 'Tokyo' && (
            <div className="timeline">
                <details open={openDay === 'day1'} className="bg-card-bg mb-6 rounded-xl border border-border overflow-hidden">
                    <summary onClick={(e) => handleToggle(e, 'day1')} className="p-5 cursor-pointer font-bold text-xl flex justify-between items-center bg-card-bg text-primary hover:bg-neutral-800">Day 1: Arrival & Local Life (Tue 18 Feb)</summary>
                    <div className="day-content p-5 text-white">
                        <div className="time-block mb-8 pl-5 border-l-4 border-gray-600">
                            <div className="time-label font-extrabold text-sub-text text-lg uppercase flex items-center gap-2 mb-2">🛬 Morning (10:25 AM)</div>
                            Arrive at <strong><a href="https://tokyo-haneda.com/en/" target="_blank" rel="noreferrer">Haneda Airport</a></strong>. Pick up <a href="https://www.japan-guide.com/e/e2359_003.html" target="_blank" rel="noreferrer">Suica/Pasmo cards</a>.
                        </div>
                        <div className="time-block mb-8 pl-5 border-l-4 border-gray-600">
                            <div className="time-label font-extrabold text-sub-text text-lg uppercase flex items-center gap-2 mb-2">🚅 Day</div>
                            Transfer to <strong>Shinjuku</strong>. Lunch at <a href="https://konjikihototogisu.com/" target="_blank" rel="noreferrer">Sobahouse Konjiki Hototogisu</a>. Walk through 🌳 <a href="https://www.env.go.jp/garden/shinjukugyoen/english/index.html" target="_blank" rel="noreferrer">Shinjuku Gyoen National Garden</a>.
                            <span className="tip-text block mt-2 text-base text-[#ffcc80] italic bg-white/5 p-3 rounded-md">💡 <strong>Tip:</strong> <em>Konjiki Hototogisu</em> holds a Michelin Star for their clam-broth ramen. Arrive early for a ticket!</span>
                        </div>
                        <div className="time-block mb-8 pl-5 border-l-4 border-gray-600">
                            <div className="time-label font-extrabold text-sub-text text-lg uppercase flex items-center gap-2 mb-2">🍢 Evening</div>
                            Dinner at <a href="https://www.torikizoku.co.jp/en/" target="_blank" rel="noreferrer">Torikizoku</a> (Yakitori) or the atmospheric <a href="http://shinjuku-omoide.com/english/" target="_blank" rel="noreferrer">Omoide Yokocho</a>.
                            <span className="tip-text block mt-2 text-base text-[#ffcc80] italic bg-white/5 p-3 rounded-md">💡 <strong>Tip:</strong> <em>Torikizoku</em> is a reliable chain where every item is the same price—great for a low-stress first meal.</span>
                        </div>
                    </div>
                </details>

                <details open={openDay === 'day2'} className="bg-card-bg mb-6 rounded-xl border border-border overflow-hidden">
                    <summary onClick={(e) => handleToggle(e, 'day2')} className="p-5 cursor-pointer font-bold text-xl flex justify-between items-center bg-card-bg text-primary hover:bg-neutral-800">Day 2: Old Tokyo & Culture (Wed 19 Feb)</summary>
                    <div className="day-content p-5 text-white">
                        <div className="time-block mb-8 pl-5 border-l-4 border-gray-600">
                            <div className="time-label font-extrabold text-sub-text text-lg uppercase flex items-center gap-2 mb-2">⛩️ Morning</div>
                            Visit <a href="https://www.senso-ji.jp/english/" target="_blank" rel="noreferrer">Senso-ji Temple</a> in Asakusa.
                            <span className="tip-text block mt-2 text-base text-[#ffcc80] italic bg-white/5 p-3 rounded-md">💡 <strong>Tip:</strong> Try the <em>Ningyo-yaki</em> (doll-shaped sponge cakes) on Nakamise street; they are freshly baked and filled with red bean paste.</span>
                        </div>
                        <div className="time-block mb-8 pl-5 border-l-4 border-gray-600">
                            <div className="time-label font-extrabold text-sub-text text-lg uppercase flex items-center gap-2 mb-2">🏯 Day</div>
                            Walk the <a href="https://www.kunaicho.go.jp/e-event/higashigyoen02.html" target="_blank" rel="noreferrer">Imperial Palace East Gardens</a>. Lunch at 🍣 <a href="https://www.tsukiji.or.jp/english/" target="_blank" rel="noreferrer">Tsukiji Outer Market</a>.
                            <span className="tip-text block mt-2 text-base text-[#ffcc80] italic bg-white/5 p-3 rounded-md">💡 <strong>Tip:</strong> At Tsukiji, look for the queues at <em>Sushizanmai</em> for reliable quality, or grab a <em>Tamagoyaki</em> (sweet egg omelette) stick for a classic street snack.</span>
                        </div>
                        <div className="time-block mb-8 pl-5 border-l-4 border-gray-600">
                            <div className="time-label font-extrabold text-sub-text text-lg uppercase flex items-center gap-2 mb-2">🍸 Evening</div>
                            Dinner at <a href="http://www.n-nagi.com/english/" target="_blank" rel="noreferrer">Ramen Nagi</a> (Golden Gai). Then explore 🏳️‍🌈 <a href="https://www.timeout.com/tokyo/lgbtq/shinjuku-nichome-guide" target="_blank" rel="noreferrer">Shinjuku Ni-chōme</a>. Drinks at <a href="https://bridge-shinjuku.com/" target="_blank" rel="noreferrer">Bridge</a> or <a href="https://www.travelgay.com/venue/new-sazae/" target="_blank" rel="noreferrer">New Sazae</a>.
                            <span className="tip-text block mt-2 text-base text-[#ffcc80] italic bg-white/5 p-3 rounded-md">💡 <strong>Tip:</strong> <em>Ramen Nagi</em> is legendary for its intense Niboshi (sardine) broth. <em>New Sazae</em> is a disco institution since the 60s/70s.</span>
                        </div>
                    </div>
                </details>

                <details open={openDay === 'day3'} className="bg-card-bg mb-6 rounded-xl border border-border overflow-hidden">
                    <summary onClick={(e) => handleToggle(e, 'day3')} className="p-5 cursor-pointer font-bold text-xl flex justify-between items-center bg-card-bg text-primary hover:bg-neutral-800">Day 3: Modern Icons (Thu 20 Feb)</summary>
                    <div className="day-content p-5 text-white">
                        <div className="time-block mb-8 pl-5 border-l-4 border-gray-600">
                            <div className="time-label font-extrabold text-sub-text text-lg uppercase flex items-center gap-2 mb-2">📸 Morning</div>
                            Witness the <a href="https://www.japan-guide.com/e/e3007.html" target="_blank" rel="noreferrer">Shibuya Crossing</a>.
                        </div>
                        <div className="time-block mb-8 pl-5 border-l-4 border-gray-600">
                            <div className="time-label font-extrabold text-sub-text text-lg uppercase flex items-center gap-2 mb-2">🏙️ Day</div>
                            Views from <a href="https://www.yokoso.metro.tokyo.lg.jp/en/tenbou/" target="_blank" rel="noreferrer">Tokyo Metro Gov. Building</a>. Walk 👠 <a href="https://www.japan-guide.com/e/e3006.html#takeshita" target="_blank" rel="noreferrer">Takeshita Street</a> (Harajuku).
                        </div>
                        <div className="time-block mb-8 pl-5 border-l-4 border-gray-600">
                            <div className="time-label font-extrabold text-sub-text text-lg uppercase flex items-center gap-2 mb-2">🍣 Lunch</div>
                            Authentic sushi at <a href="https://japan-food.guide/en/restaurants/962" target="_blank" rel="noreferrer">Sushi Kunimitsu</a> or <a href="https://www.instagram.com/osushiya_taiki/" target="_blank" rel="noreferrer">Osushiya Taiki</a>.
                            <span className="tip-text block mt-2 text-base text-[#ffcc80] italic bg-white/5 p-3 rounded-md">💡 <strong>Tip:</strong> <em>Kunimitsu</em> is highly rated (4.7★) for its <em>Omakase</em> course. Booking essential.</span>
                        </div>
                        <div className="time-block mb-8 pl-5 border-l-4 border-gray-600">
                            <div className="time-label font-extrabold text-sub-text text-lg uppercase flex items-center gap-2 mb-2">🍜 Dinner</div>
                            <a href="https://www.fu-unji.com/" target="_blank" rel="noreferrer">Fuunji</a> (Shinjuku).
                            <span className="tip-text block mt-2 text-base text-[#ffcc80] italic bg-white/5 p-3 rounded-md">💡 <strong>Tip:</strong> Known for the best <em>Tsukemen</em> (dipping noodles) in Tokyo. Expect a line, but it moves fast!</span>
                        </div>
                    </div>
                </details>

                <div className="hotel-section bg-[#121212] rounded-2xl border border-border overflow-hidden mt-10 mb-8 shadow-2xl">
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/2 p-6 border-b md:border-b-0 md:border-r border-border">
                      <div className="flex items-center gap-2 mb-4">
                        <span className="bg-primary text-white text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-widest">Base Camp</span>
                        <span className="text-sub-text font-bold text-xs uppercase tracking-widest">Selected Hotel</span>
                      </div>
                      <h3 className="text-2xl font-black text-white mb-2 leading-none uppercase tracking-tighter">Hilton Tokyo</h3>
                      <p className="text-sm text-gray-400 mb-6 leading-relaxed italic">6-6-2 Nishi-Shinjuku, Shinjuku-ku, Tokyo 160-0023, Japan</p>
                      <div className="flex gap-3">
                        <a href="https://www.hilton.com/en/hotels/tyohitw-hilton-tokyo/" target="_blank" rel="noreferrer" className="flex-1 text-center py-3 bg-white text-black font-black text-xs rounded-lg hover:bg-accent hover:text-white transition-all uppercase tracking-widest no-underline border-none">Official Site</a>
                        <a href="https://www.google.com/maps/dir/?api=1&destination=35.6925,139.6921" target="_blank" rel="noreferrer" className="flex-1 text-center py-3 border border-white/20 text-white font-bold text-xs rounded-lg hover:bg-white/5 transition-all uppercase tracking-widest no-underline">Directions</a>
                      </div>
                    </div>
                    <div className="md:w-1/2 p-8 bg-neutral-900/50 flex flex-col justify-center">
                      <h4 className="text-[11px] font-black text-primary uppercase tracking-[0.2em] mb-3 flex items-center gap-2">
                        <span className="w-8 h-[1px] bg-primary"></span> Neighborhood Insights
                      </h4>
                      <p className="text-sm text-sub-text leading-relaxed font-medium">
                        Nishi-Shinjuku is Tokyo's premier skyscraper district. It offers a sophisticated, professional atmosphere a short walk from the neon-lit 'Golden Gai'. Don't miss the free observation decks at the Tokyo Metropolitan Government Building nearby. The area is exceptionally well-connected and borders the beautiful Shinjuku Central Park, perfect for a peaceful morning stroll.
                      </p>
                      <div className="mt-5 flex gap-2">
                        <span className="text-[9px] font-black uppercase text-white/30 tracking-widest border border-white/10 px-2 py-1 rounded">Local Vibe</span>
                        <span className="text-[9px] font-black uppercase text-white/30 tracking-widest border border-white/10 px-2 py-1 rounded">Expert Guide</span>
                      </div>
                    </div>
                  </div>
                </div>
            </div>
        )}

        {activeCity === 'Kyoto' && (
            <div className="timeline">
                <details open={openDay === 'day4'} className="bg-card-bg mb-6 rounded-xl border border-border overflow-hidden">
                    <summary onClick={(e) => handleToggle(e, 'day4')} className="p-5 cursor-pointer font-bold text-xl flex justify-between items-center bg-card-bg text-primary hover:bg-neutral-800">Day 4: Bullet Train & Gion (Fri 21 Feb)</summary>
                    <div className="day-content p-5 text-white">
                        <div className="time-block mb-8 pl-5 border-l-4 border-gray-600">
                            <div className="time-label font-extrabold text-sub-text text-lg uppercase flex items-center gap-2 mb-2">🚅 Morning</div>
                            <a href="https://www.japan-guide.com/e/e2018.html" target="_blank" rel="noreferrer">Shinkansen</a> to Kyoto (2.5 hrs). Buy an Ekiben!
                            <span className="tip-text block mt-2 text-base text-[#ffcc80] italic bg-white/5 p-3 rounded-md">💡 <strong>Tip:</strong> Buy a "Makunouchi" bento at Tokyo Station's <em>Ekibenya Matsuri</em> before boarding.</span>
                        </div>
                        <div className="time-block mb-8 pl-5 border-l-4 border-gray-600">
                            <div className="time-label font-extrabold text-sub-text text-lg uppercase flex items-center gap-2 mb-2">🍵 Afternoon</div>
                            Check in. Explore <a href="https://www.japan-guide.com/e/e3902.html" target="_blank" rel="noreferrer">Gion District</a> and Pontocho Alley.
                        </div>
                        <div className="time-block mb-8 pl-5 border-l-4 border-gray-600">
                            <div className="time-label font-extrabold text-sub-text text-lg uppercase flex items-center gap-2 mb-2">🍱 Dinner</div>
                            Traditional <a href="https://www.japan-guide.com/e/e2036.html" target="_blank" rel="noreferrer">Kyo-Kaiseki</a> meal in Gion.
                            <span className="tip-text block mt-2 text-base text-[#ffcc80] italic bg-white/5 p-3 rounded-md">💡 <strong>Tip:</strong> <em>Kaiseki</em> is the haute cuisine of Japan. If not booked, wander down <strong>Pontocho Alley</strong> for atmospheric river-side dining.</span>
                        </div>
                    </div>
                </details>

                <details open={openDay === 'day5'} className="bg-card-bg mb-6 rounded-xl border border-border overflow-hidden">
                    <summary onClick={(e) => handleToggle(e, 'day5')} className="p-5 cursor-pointer font-bold text-xl flex justify-between items-center bg-card-bg text-primary hover:bg-neutral-800">Day 5: Shrines, Zen & Tea (Sat 22 Feb)</summary>
                    <div className="day-content p-5 text-white">
                        <div className="time-block mb-8 pl-5 border-l-4 border-gray-600">
                            <div className="time-label font-extrabold text-sub-text text-lg uppercase flex items-center gap-2 mb-2">⛩️ Morning</div>
                            <a href="http://inari.jp/en/" target="_blank" rel="noreferrer">Fushimi Inari Taisha</a> (1,000 Gates). Go early!
                            <span className="tip-text block mt-2 text-base text-[#ffcc80] italic bg-white/5 p-3 rounded-md">💡 <strong>Tip:</strong> Arriving by 8:00 AM avoids the massive crowds and allows for a peaceful walk up the mountain.</span>
                        </div>
                        <div className="time-block mb-8 pl-5 border-l-4 border-gray-600">
                            <div className="time-label font-extrabold text-sub-text text-lg uppercase flex items-center gap-2 mb-2">🍂 Day</div>
                            Visit <a href="https://www.kiyomizudera.or.jp/en/" target="_blank" rel="noreferrer">Kiyomizu-dera</a> and attend a traditional Tea Ceremony.
                        </div>
                        <div className="time-block mb-8 pl-5 border-l-4 border-gray-600">
                            <div className="time-label font-extrabold text-sub-text text-lg uppercase flex items-center gap-2 mb-2">🥗 Lunch</div>
                            <a href="https://www.honke-daiichiasahi.com/" target="_blank" rel="noreferrer">Honke Daiichi-Asahi</a> (Kyoto Ramen).
                            <span className="tip-text block mt-2 text-base text-[#ffcc80] italic bg-white/5 p-3 rounded-md">💡 <strong>Tip:</strong> A Kyoto institution serving classic soy-based ramen. A perfect "fanatic" stop.</span>
                        </div>
                        <div className="time-block mb-8 pl-5 border-l-4 border-gray-600">
                            <div className="time-label font-extrabold text-sub-text text-lg uppercase flex items-center gap-2 mb-2">🍱 Dinner</div>
                            Explore a <a href="https://www.japan-guide.com/e/e2062.html" target="_blank" rel="noreferrer">Depachika</a> (Department Store Food Hall) for a variety dinner.
                        </div>
                    </div>
                </details>

                <details open={openDay === 'day6'} className="bg-card-bg mb-6 rounded-xl border border-border overflow-hidden">
                    <summary onClick={(e) => handleToggle(e, 'day6')} className="p-5 cursor-pointer font-bold text-xl flex justify-between items-center bg-card-bg text-primary hover:bg-neutral-800">Day 6: Bamboo & Local Flavours (Sun 23 Feb)</summary>
                    <div className="day-content p-5 text-white">
                        <div className="time-block mb-8 pl-5 border-l-4 border-gray-600">
                            <div className="time-label font-extrabold text-sub-text text-lg uppercase flex items-center gap-2 mb-2">🥒 Morning</div>
                            <a href="https://www.kyoto-nishiki.or.jp/" target="_blank" rel="noreferrer">Nishiki Market</a> ("Kyoto's Kitchen").
                            <span className="tip-text block mt-2 text-base text-[#ffcc80] italic bg-white/5 p-3 rounded-md">💡 <strong>Tip:</strong> Try the <em>Tako Tamago</em> (red baby octopus with a quail egg inside).</span>
                        </div>
                        <div className="time-block mb-8 pl-5 border-l-4 border-gray-600">
                            <div className="time-label font-extrabold text-sub-text text-lg uppercase flex items-center gap-2 mb-2">🎋 Day</div>
                            Train to <a href="https://www.japan-guide.com/e/e3912.html" target="_blank" rel="noreferrer">Arashiyama</a> (Bamboo Grove) or 🦌 Nara Deer Park.
                        </div>
                        <div className="time-block mb-8 pl-5 border-l-4 border-gray-600">
                            <div className="time-label font-extrabold text-sub-text text-lg uppercase flex items-center gap-2 mb-2">🍲 Dinner</div>
                            <a href="https://kyoto.travel/en/dining/obanzai.html" target="_blank" rel="noreferrer">Obanzai</a> (home cooking) at a local tavern.
                            <span className="tip-text block mt-2 text-base text-[#ffcc80] italic bg-white/5 p-3 rounded-md">💡 <strong>Tip:</strong> <em>Obanzai</em> focuses on seasonal Kyoto vegetables. For casual exploration, walk down <strong>Kiyamachi-dori</strong>.</span>
                        </div>
                    </div>
                </details>

                <div className="hotel-section bg-[#121212] rounded-2xl border border-border overflow-hidden mt-10 mb-8 shadow-2xl">
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/2 p-6 border-b md:border-b-0 md:border-r border-border">
                      <div className="flex items-center gap-2 mb-4">
                        <span className="bg-primary text-white text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-widest">Base Camp</span>
                        <span className="text-sub-text font-bold text-xs uppercase tracking-widest">Selected Hotel</span>
                      </div>
                      <h3 className="text-2xl font-black text-white mb-2 leading-none uppercase tracking-tighter">DoubleTree By Hilton Kyoto Station</h3>
                      <p className="text-sm text-gray-400 mb-6 leading-relaxed italic">15 Higashi Kujo Nishi Iwamotocho, Minami-ku, Kyoto, 601-8005, Japan</p>
                      <div className="flex gap-3">
                        <a href="https://www.hilton.com/en/hotels/itmksdi-doubletree-kyoto-station/" target="_blank" rel="noreferrer" className="flex-1 text-center py-3 bg-white text-black font-black text-xs rounded-lg hover:bg-accent hover:text-white transition-all uppercase tracking-widest no-underline border-none">Official Site</a>
                        <a href="https://www.google.com/maps/dir/?api=1&destination=34.9825,135.7621" target="_blank" rel="noreferrer" className="flex-1 text-center py-3 border border-white/20 text-white font-bold text-xs rounded-lg hover:bg-white/5 transition-all uppercase tracking-widest no-underline">Directions</a>
                      </div>
                    </div>
                    <div className="md:w-1/2 p-8 bg-neutral-900/50 flex flex-col justify-center">
                      <h4 className="text-[11px] font-black text-primary uppercase tracking-[0.2em] mb-3 flex items-center gap-2">
                        <span className="w-8 h-[1px] bg-primary"></span> Neighborhood Insights
                      </h4>
                      <p className="text-sm text-sub-text leading-relaxed font-medium">
                        The south side of Kyoto Station is a modern gateway to the city. Often quieter than the northern entrance, it features major shopping complexes like Kyoto Avanti and Aeon Mall. It's the most convenient spot for Shinkansen travelers and offers the quickest rail access to the Fushimi Inari shrine and the deer park in nearby Nara.
                      </p>
                      <div className="mt-5 flex gap-2">
                        <span className="text-[9px] font-black uppercase text-white/30 tracking-widest border border-white/10 px-2 py-1 rounded">Local Vibe</span>
                        <span className="text-[9px] font-black uppercase text-white/30 tracking-widest border border-white/10 px-2 py-1 rounded">Expert Guide</span>
                      </div>
                    </div>
                  </div>
                </div>
            </div>
        )}

        {activeCity === 'Osaka' && (
            <div className="timeline">
                <details open={openDay === 'day7'} className="bg-card-bg mb-6 rounded-xl border border-border overflow-hidden">
                    <summary onClick={(e) => handleToggle(e, 'day7')} className="p-5 cursor-pointer font-bold text-xl flex justify-between items-center bg-card-bg text-primary hover:bg-neutral-800">Day 7: Kitchen of Japan (Mon 24 Feb)</summary>
                    <div className="day-content p-5 text-white">
                        <div className="time-block mb-8 pl-5 border-l-4 border-gray-600">
                            <div className="time-label font-extrabold text-sub-text text-lg uppercase flex items-center gap-2 mb-2">🚆 Morning</div>
                            Train to Osaka (30 mins). Visit <a href="https://www.osakacastle.net/english/" target="_blank" rel="noreferrer">Osaka Castle</a>.
                        </div>
                        <div className="time-block mb-8 pl-5 border-l-4 border-gray-600">
                            <div className="time-label font-extrabold text-sub-text text-lg uppercase flex items-center gap-2 mb-2">🦀 Day</div>
                            Lunch at <a href="https://www.kushikatsu-daruma.com/" target="_blank" rel="noreferrer">Kushikatsu Daruma</a>. Eat through <a href="https://osaka-info.jp/en/spot/dotonbori/" target="_blank" rel="noreferrer">Dotonbori</a> and retro <a href="https://osaka-info.jp/en/spot/shinsekai/" target="_blank" rel="noreferrer">Shinsekai</a>.
                            <span className="tip-text block mt-2 text-base text-[#ffcc80] italic bg-white/5 p-3 rounded-md">💡 <strong>Tip:</strong> Famous for "no double dipping" fried skewers. The Dotombori branch has the giant angry chef statue!</span>
                        </div>
                        <div className="time-block mb-8 pl-5 border-l-4 border-gray-600">
                            <div className="time-label font-extrabold text-sub-text text-lg uppercase flex items-center gap-2 mb-2">🏳️‍🌈 Evening</div>
                            Visit <a href="https://insideosaka.com/osaka-gay-district/" target="_blank" rel="noreferrer">Dōyama-chō</a> (Gay District).
                        </div>
                        <div className="time-block mb-8 pl-5 border-l-4 border-gray-600">
                            <div className="time-label font-extrabold text-sub-text text-lg uppercase flex items-center gap-2 mb-2">🥞 Dinner</div>
                            Okonomiyaki at <a href="https://2951.jp/" target="_blank" rel="noreferrer">Fukutaro</a> or <a href="http://www.ajinoya-okonomiyaki.com/top/" target="_blank" rel="noreferrer">Ajinoya Honten</a>.
                            <span className="tip-text block mt-2 text-base text-[#ffcc80] italic bg-white/5 p-3 rounded-md">💡 <strong>Tip:</strong> Both places are legendary. Order the <em>Negiyaki</em> (green onion pancake) at Fukutaro.</span>
                        </div>
                    </div>
                </details>

                <div className="hotel-section bg-[#121212] rounded-2xl border border-border overflow-hidden mt-10 mb-8 shadow-2xl">
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/2 p-6 border-b md:border-b-0 md:border-r border-border">
                      <div className="flex items-center gap-2 mb-4">
                        <span className="bg-primary text-white text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-widest">Base Camp</span>
                        <span className="text-sub-text font-bold text-xs uppercase tracking-widest">Selected Hotel</span>
                      </div>
                      <h3 className="text-2xl font-black text-white mb-2 leading-none uppercase tracking-tighter">Hilton Osaka</h3>
                      <p className="text-sm text-gray-400 mb-6 leading-relaxed italic">1-8-8, Umeda, Kita-ku, Osaka 530-0001, Japan</p>
                      <div className="flex gap-3">
                        <a href="https://www.hilton.com/en/hotels/osahitw-hilton-osaka/" target="_blank" rel="noreferrer" className="flex-1 text-center py-3 bg-white text-black font-black text-xs rounded-lg hover:bg-accent hover:text-white transition-all uppercase tracking-widest no-underline border-none">Official Site</a>
                        <a href="https://www.google.com/maps/dir/?api=1&destination=34.7003,135.4955" target="_blank" rel="noreferrer" className="flex-1 text-center py-3 border border-white/20 text-white font-bold text-xs rounded-lg hover:bg-white/5 transition-all uppercase tracking-widest no-underline">Directions</a>
                      </div>
                    </div>
                    <div className="md:w-1/2 p-8 bg-neutral-900/50 flex flex-col justify-center">
                      <h4 className="text-[11px] font-black text-primary uppercase tracking-[0.2em] mb-3 flex items-center gap-2">
                        <span className="w-8 h-[1px] bg-primary"></span> Neighborhood Insights
                      </h4>
                      <p className="text-sm text-sub-text leading-relaxed font-medium">
                        Umeda is Osaka's glittering northern hub. It's a vertical city of giant department stores, high-end dining, and the futuristic Umeda Sky Building. Being at the nexus of the city's rail network makes day trips to Kyoto or Kobe effortless. The 'Kitashinchi' entertainment district nearby offers world-class cocktail bars and sophisticated dining.
                      </p>
                      <div className="mt-5 flex gap-2">
                        <span className="text-[9px] font-black uppercase text-white/30 tracking-widest border border-white/10 px-2 py-1 rounded">Local Vibe</span>
                        <span className="text-[9px] font-black uppercase text-white/30 tracking-widest border border-white/10 px-2 py-1 rounded">Expert Guide</span>
                      </div>
                    </div>
                  </div>
                </div>
            </div>
        )}

        {activeCity === 'Shanghai' && (
            <div className="timeline">
                <details open={openDay === 'day8'} className="bg-card-bg mb-6 rounded-xl border border-border overflow-hidden">
                    <summary onClick={(e) => handleToggle(e, 'day8')} className="p-5 cursor-pointer font-bold text-xl flex justify-between items-center bg-card-bg text-primary hover:bg-neutral-800">Day 8: Arrival & Maglev (Tue 25 Feb)</summary>
                    <div className="day-content p-5 text-white">
                        <div className="time-block mb-8 pl-5 border-l-4 border-gray-600">
                            <div className="time-label font-extrabold text-sub-text text-lg uppercase flex items-center gap-2 mb-2">🛫 Travel</div>
                            Fly KIX to PVG. Ride the <a href="https://www.meet-in-shanghai.net/traffic/maglev" target="_blank" rel="noreferrer">MAGLEV</a> (430km/h).
                            <span className="tip-text block mt-2 text-base text-[#ffcc80] italic bg-white/5 p-3 rounded-md">💡 <strong>Tip:</strong> Maglev closes at 23:40. If hungry late, wander <strong>Anfu Road</strong> near FFC.</span>
                        </div>
                    </div>
                </details>

                <details open={openDay === 'day9'} className="bg-card-bg mb-6 rounded-xl border border-border overflow-hidden">
                    <summary onClick={(e) => handleToggle(e, 'day9')} className="p-5 cursor-pointer font-bold text-xl flex justify-between items-center bg-card-bg text-primary hover:bg-neutral-800">Day 9: Birthday Celebration 🎂 (Wed 26 Feb)</summary>
                    <div className="day-content p-5 text-white">
                        <div className="time-block mb-8 pl-5 border-l-4 border-gray-600">
                            <div className="time-label font-extrabold text-sub-text text-lg uppercase flex items-center gap-2 mb-2">🌳 Day</div>
                            Walk the <a href="https://www.smartshanghai.com/articles/tourist/the-former-french-concession" target="_blank" rel="noreferrer">French Concession</a>. Shopping and cafe hopping at <strong>Ferguson Lane</strong>.
                        </div>
                        <div className="time-block mb-8 pl-5 border-l-4 border-gray-600">
                            <div className="time-label font-extrabold text-sub-text text-lg uppercase flex items-center gap-2 mb-2">🥢 Dinner</div>
                            <strong><a href="https://guide.michelin.com/en/shanghai-municipality/shanghai/restaurant/fu-1039" target="_blank" rel="noreferrer">Fu 1039</a></strong> (Classic) or <strong><a href="https://guide.michelin.com/en/shanghai-municipality/shanghai/restaurant/fu-he-hui" target="_blank" rel="noreferrer">Fu He Hui</a></strong> (Veg).
                            <span className="tip-text block mt-2 text-base text-[#ffcc80] italic bg-white/5 p-3 rounded-md">💡 <strong>Tip:</strong> <em>Fu 1039</em> (1 Michelin Star) for Smoked Fish. <em>Fu He Hui</em> (2 Michelin Stars) for world-class vegetarian.</span>
                        </div>
                        <div className="time-block mb-8 pl-5 border-l-4 border-gray-600">
                            <div className="time-label font-extrabold text-sub-text text-lg uppercase flex items-center gap-2 mb-2">🍸 Drinks</div>
                            <a href="https://www.timeoutshanghai.com/venue/Bars__Clubs-Bars-Gay_Bars/1368/Eddys-Bar.html" target="_blank" rel="noreferrer">Eddy's</a> or <a href="https://www.smartshanghai.com/venue/9946/Lucca" target="_blank" rel="noreferrer">Lucca 390</a>.
                        </div>
                    </div>
                </details>

                <details open={openDay === 'day10'} className="bg-card-bg mb-6 rounded-xl border border-border overflow-hidden">
                    <summary onClick={(e) => handleToggle(e, 'day10')} className="p-5 cursor-pointer font-bold text-xl flex justify-between items-center bg-card-bg text-primary hover:bg-neutral-800">Day 10: History & Skylines (Thu 27 Feb)</summary>
                    <div className="day-content p-5 text-white">
                        <div className="time-block mb-8 pl-5 border-l-4 border-gray-600">
                            <div className="time-label font-extrabold text-sub-text text-lg uppercase flex items-center gap-2 mb-2">🏮 Morning</div>
                            <a href="https://www.meet-in-shanghai.net/scenic-spots/yu-garden" target="_blank" rel="noreferrer">Yu Garden</a> & Bazaar.
                        </div>
                        <div className="time-block mb-8 pl-5 border-l-4 border-gray-600">
                            <div className="time-label font-extrabold text-sub-text text-lg uppercase flex items-center gap-2 mb-2"> dumpling Lunch</div>
                            <a href="https://guide.michelin.com/en/shanghai-municipality/shanghai/restaurant/jianguo-328" target="_blank" rel="noreferrer">Jianguo 328</a>.
                            <span className="tip-text block mt-2 text-base text-[#ffcc80] italic bg-white/5 p-3 rounded-md">💡 <strong>Tip:</strong> Bib Gourmand favorite for MSG-free home-style cooking.</span>
                        </div>
                        <div className="time-block mb-8 pl-5 border-l-4 border-gray-600">
                            <div className="time-label font-extrabold text-sub-text text-lg uppercase flex items-center gap-2 mb-2">🏙️ Evening</div>
                            Walk <a href="https://www.meet-in-shanghai.net/scenic-spots/the-bund" target="_blank" rel="noreferrer">The Bund</a>.
                        </div>
                        <div className="time-block mb-8 pl-5 border-l-4 border-gray-600">
                            <div className="time-label font-extrabold text-sub-text text-lg uppercase flex items-center gap-2 mb-2">🍽️ Dinner</div>
                            <a href="https://guide.michelin.com/en/shanghai-municipality/shanghai/restaurant/old-jesse-xuhui" target="_blank" rel="noreferrer">Old Jesse</a>.
                            <span className="tip-text block mt-2 text-base text-[#ffcc80] italic bg-white/5 p-3 rounded-md">💡 <strong>Tip:</strong> Pre-order the <em>Hong Shao Rou</em> and <em>Scallion Roasted Fish Head</em> when booking!</span>
                        </div>
                    </div>
                </details>

                <details open={openDay === 'day11'} className="bg-card-bg mb-6 rounded-xl border border-border overflow-hidden">
                    <summary onClick={(e) => handleToggle(e, 'day11')} className="p-5 cursor-pointer font-bold text-xl flex justify-between items-center bg-card-bg text-primary hover:bg-neutral-800">Day 11: Departure (Fri 28 Feb)</summary>
                    <div className="day-content p-5 text-white">
                        <div className="time-block mb-8 pl-5 border-l-4 border-gray-600">
                            <div className="time-label font-extrabold text-sub-text text-lg uppercase flex items-center gap-2 mb-2">🛫 Morning</div>
                            Ride MAGLEV to PVG. Access First Class Lounge.
                        </div>
                        <div className="time-block mb-8 pl-5 border-l-4 border-gray-600">
                            <div className="time-label font-extrabold text-sub-text text-lg uppercase flex items-center gap-2 mb-2">🥟 Snack</div>
                            Yang's Dumplings inside airport.
                            <span className="tip-text block mt-2 text-base text-[#ffcc80] italic bg-white/5 p-3 rounded-md">💡 <strong>Tip:</strong> Bite a small hole in the <em>Sheng Jian Bao</em> first to vent the steam!</span>
                        </div>
                    </div>
                </details>

                <div className="hotel-section bg-[#121212] rounded-2xl border border-border overflow-hidden mt-10 mb-8 shadow-2xl">
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/2 p-6 border-b md:border-b-0 md:border-r border-border">
                      <div className="flex items-center gap-2 mb-4">
                        <span className="bg-primary text-white text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-widest">Base Camp</span>
                        <span className="text-sub-text font-bold text-xs uppercase tracking-widest">Selected Hotel</span>
                      </div>
                      <h3 className="text-2xl font-black text-white mb-2 leading-none uppercase tracking-tighter">Hilton Shanghai City Center</h3>
                      <p className="text-sm text-gray-400 mb-6 leading-relaxed italic">No. 488 West Yan'an Road, Shanghai, 200050, China</p>
                      <div className="flex gap-3">
                        <a href="https://www.hilton.com/en/hotels/shamshi-hilton-shanghai-city-center/" target="_blank" rel="noreferrer" className="flex-1 text-center py-3 bg-white text-black font-black text-xs rounded-lg hover:bg-accent hover:text-white transition-all uppercase tracking-widest no-underline border-none">Official Site</a>
                        <a href="https://www.google.com/maps/dir/?api=1&destination=31.2185,121.4332" target="_blank" rel="noreferrer" className="flex-1 text-center py-3 border border-white/20 text-white font-bold text-xs rounded-lg hover:bg-white/5 transition-all uppercase tracking-widest no-underline">Directions</a>
                      </div>
                    </div>
                    <div className="md:w-1/2 p-8 bg-neutral-900/50 flex flex-col justify-center">
                      <h4 className="text-[11px] font-black text-primary uppercase tracking-[0.2em] mb-3 flex items-center gap-2">
                        <span className="w-8 h-[1px] bg-primary"></span> Neighborhood Insights
                      </h4>
                      <p className="text-sm text-sub-text leading-relaxed font-medium">
                        Located near the edge of the historic Former French Concession, West Yan'an Road offers a blend of colonial charm and modern luxury. The neighborhood is famous for its tree-lined streets, boutique cafes, and art-deco architecture. It provides a more localized and authentic 'Old Shanghai' feel compared to the tourist-heavy Bund.
                      </p>
                      <div className="mt-5 flex gap-2">
                        <span className="text-[9px] font-black uppercase text-white/30 tracking-widest border border-white/10 px-2 py-1 rounded">Local Vibe</span>
                        <span className="text-[9px] font-black uppercase text-white/30 tracking-widest border border-white/10 px-2 py-1 rounded">Expert Guide</span>
                      </div>
                    </div>
                  </div>
                </div>
            </div>
        )}
      </div>
  );
};
