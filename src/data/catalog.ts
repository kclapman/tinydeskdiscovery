export type Ensemble = 'solo' | 'band';
export type Decade = '2010s' | '2020s';
export type Runtime = 'Under 15 min' | '15–20 min' | 'Over 20 min';

export interface Performance {
  id: string;
  slug: string;
  artist: string;
  genre: string;
  sub: string;
  ens: Ensemble;
  region: string;
  year: number;
  mins: number;
  loves: number;
  moods: string[];
  instr: string[];
  blurb: string;
  setlist: string[];
  decade: Decade;
  rt: Runtime;
  added: number;
  /** YouTube video ID for the official NPR Music upload. */
  videoId?: string;
}

export const MOODS = [
  'late night and hushed',
  'horn section',
  'a cappella harmony',
  'solo piano',
  'rowdy and communal',
  'polyrhythm',
  'tearjerker',
  'virtuoso showing off',
  'sunlit and easy',
  'strings that ache',
  'one voice, no net',
  "groove you can't sit through",
  'gospel-adjacent',
  'sly and funny',
  'slow build, big payoff',
  'room you can hear',
] as const;

type RawRow = [
  string,
  string,
  string,
  Ensemble,
  string,
  number,
  number,
  number,
  string[],
  string[],
  string,
  string,
];

const RAW: RawRow[] = [
  ['Anderson .Paak & The Free Nationals', 'hip-hop', 'neo-soul rap', 'band', 'US', 2016, 22, 98, ["groove you can't sit through", 'horn section', 'rowdy and communal'], ['vocals', 'drums', 'keys', 'guitar', 'bass'], "Drumming and singing at the same time, grinning the whole way. The room can't sit still and neither can you.", 'Come Down|Am I Wrong|Put Me Thru|The Season'],
  ['Mac Miller', 'hip-hop', 'jazz rap', 'band', 'US', 2018, 19, 97, ['late night and hushed', 'slow build, big payoff', 'room you can hear'], ['vocals', 'keys', 'bass', 'drums'], 'Recorded weeks before he died, and it plays like a door left open. The band breathes with him.', "Small Worlds|What's the Use?|2009"],
  ['Tyler, The Creator', 'hip-hop', 'alt rap', 'band', 'US', 2020, 17, 88, ['horn section', 'sly and funny', 'slow build, big payoff'], ['vocals', 'keys', 'horns', 'bass', 'drums'], 'He treats the desk like a stage set — soft-focus arrangements, jokes between songs, one genuinely tender ending.', 'EARFQUAKE|BOREDOM|See You Again'],
  ['Noname', 'hip-hop', 'spoken-word rap', 'band', 'US', 2016, 16, 84, ['late night and hushed', 'polyrhythm', 'room you can hear'], ['vocals', 'keys', 'bass', 'drums'], 'Half-whispered, fast as thought. Bring headphones — the words are the point.', 'Diddy Bop|Forever|Shadow Man'],
  ['Little Simz', 'hip-hop', 'UK rap', 'band', 'UK', 2022, 18, 86, ['horn section', 'slow build, big payoff', 'virtuoso showing off'], ['vocals', 'strings', 'horns', 'bass', 'drums'], 'Strings, horns and a rapper with no interest in coasting. Grows three sizes by the last song.', 'Introvert|Woman|Point and Kill'],
  ['Big Thief', 'indie rock', 'folk rock', 'band', 'US', 2020, 20, 79, ['room you can hear', 'tearjerker', 'sunlit and easy'], ['vocals', 'guitar', 'bass', 'drums'], "Four people leaning in toward one microphone's worth of space. The guitar tone alone is worth it.", 'Not|Cattails|Paul'],
  ['Phoebe Bridgers', 'indie rock', 'singer-songwriter', 'band', 'US', 2017, 14, 82, ['tearjerker', 'late night and hushed', 'strings that ache'], ['vocals', 'guitar', 'strings', 'keys'], "Quiet enough that you hear the chairs creak, sad enough that you don't mind.", 'Smoke Signals|Motion Sickness|Funeral'],
  ['Alvvays', 'indie rock', 'dream pop', 'band', 'Canada', 2018, 15, 68, ['sunlit and easy', 'sly and funny', 'room you can hear'], ['vocals', 'guitar', 'keys', 'bass', 'drums'], 'Jangle turned all the way down, which somehow makes the hooks land harder.', 'In Undertow|Dreams Tonite|Plimsoll Punks'],
  ['Japanese Breakfast', 'indie rock', 'art pop', 'band', 'US', 2021, 16, 76, ['sunlit and easy', 'slow build, big payoff', 'horn section'], ['vocals', 'guitar', 'keys', 'horns', 'drums'], 'A joy record played by people who clearly enjoy each other. The gong is not a bit.', 'Paprika|Be Sweet|Posing in Bondage'],
  ['Wet Leg', 'indie rock', 'post-punk', 'band', 'UK', 2022, 13, 64, ['sly and funny', 'rowdy and communal', 'room you can hear'], ['vocals', 'guitar', 'bass', 'drums'], "Deadpan delivery, very loud guitars, over before you're ready. Best short one on the list.", 'Wet Dream|Chaise Longue|Angelica'],
  ['Kamasi Washington', 'jazz', 'spiritual jazz', 'band', 'US', 2016, 24, 85, ['horn section', 'virtuoso showing off', 'polyrhythm'], ['horns', 'keys', 'bass', 'drums', 'percussion'], 'Two drummers in a room this size. It should not work; it absolutely works.', 'Truth|Change of the Guard'],
  ['Ezra Collective', 'jazz', 'afrobeat jazz', 'band', 'UK', 2023, 21, 81, ['polyrhythm', 'rowdy and communal', 'horn section'], ['horns', 'keys', 'bass', 'drums', 'percussion'], 'Afrobeat and highlife pulling the whole office into a dance. Loudest joy per minute here.', 'Victory Dance|Life Goes On|Ego Killah'],
  ['Esperanza Spalding', 'jazz', 'vocal jazz', 'solo', 'US', 2011, 18, 72, ['virtuoso showing off', 'one voice, no net', 'sly and funny'], ['vocals', 'bass'], "Singing one line while walking a completely different one on upright bass. Watch her hands.", "Radio Song|Black Gold|I Can't Help It"],
  ['Cécile McLorin Salvant', 'jazz', 'standards', 'solo', 'US', 2018, 17, 66, ['one voice, no net', 'solo piano', 'tearjerker'], ['vocals', 'piano'], "Voice and piano, no hiding places. She phrases like she's telling you a secret across a table.", 'Wild Women|The Sound of Music|Somehow I Never Could Believe'],
  ['Leon Bridges', 'soul', 'retro soul', 'band', 'US', 2015, 15, 90, ['sunlit and easy', 'gospel-adjacent', 'room you can hear'], ['vocals', 'guitar', 'bass', 'drums'], 'Sounds like a 1962 single that happened in a 2015 cubicle. Warm from the first bar.', "Coming Home|River|Smooth Sailin'"],
  ['H.E.R.', 'soul', 'contemporary R&B', 'band', 'US', 2018, 19, 89, ['late night and hushed', 'virtuoso showing off', 'tearjerker'], ['vocals', 'guitar', 'keys', 'bass', 'drums'], 'She plays the guitar solo herself and then apologises for it. Peak late-night listening.', 'Focus|Best Part|Against Me'],
  ['Durand Jones & The Indications', 'soul', 'deep soul', 'band', 'US', 2019, 18, 70, ['gospel-adjacent', 'horn section', 'slow build, big payoff'], ['vocals', 'horns', 'guitar', 'bass', 'drums'], 'Two lead singers trading off, harmonies stacked like they rehearsed in a church basement.', "Morning in America|Don't You Know|Is It Any Wonder?"],
  ['Jorja Smith', 'soul', 'neo-soul', 'band', 'UK', 2018, 14, 78, ['late night and hushed', 'tearjerker', 'room you can hear'], ['vocals', 'keys', 'guitar', 'bass'], 'Barely raises her voice and still fills the room. The stripped arrangements do her a favour.', 'Blue Lights|Teenage Fantasy|February 3rd'],
  ['Juanes', 'Latin', 'rock en español', 'band', 'Colombia', 2019, 16, 74, ['rowdy and communal', 'sunlit and easy', 'virtuoso showing off'], ['vocals', 'guitar', 'bass', 'percussion'], 'Nylon strings, a big grin, and a chorus everyone in the room already knows.', 'La Plata|A Dios Le Pido|Fíjate Bien'],
  ['Natalia Lafourcade', 'Latin', 'folk latinoamericano', 'band', 'Mexico', 2017, 20, 80, ['tearjerker', 'strings that ache', 'room you can hear'], ['vocals', 'guitar', 'strings', 'percussion'], 'Son jarocho arrangements so delicate the mics feel intrusive. The harp is the whole ballgame.', 'Tú Sí Sabes Quererme|Soledad y el Mar|Hasta la Raíz'],
  ['Bomba Estéreo', 'Latin', 'electro-cumbia', 'band', 'Colombia', 2021, 19, 71, ['polyrhythm', 'rowdy and communal', "groove you can't sit through"], ['vocals', 'percussion', 'keys', 'bass'], 'Cumbia rhythms unplugged from the club and handed to live percussion. Hips, immediately.', 'Soy Yo|To My Love|Ahora'],
  ['Sturgill Simpson', 'country', 'outlaw country', 'solo', 'US', 2017, 17, 69, ['one voice, no net', 'tearjerker', 'room you can hear'], ['vocals', 'guitar'], 'One man, one guitar, a whole lot of held notes. The plainest thing on this list and maybe the best.', 'Breakers Roar|All Around You|Oh Sarah'],
  ['Brandi Carlile', 'country', 'americana', 'band', 'US', 2019, 18, 83, ['a cappella harmony', 'tearjerker', 'slow build, big payoff'], ['vocals', 'guitar', 'strings', 'bass'], "The Hanseroth twins' harmonies land like a third instrument. Bring tissues, honestly.", 'The Joke|The Mother|Party of One'],
  ['Yo-Yo Ma', 'classical', 'solo cello', 'solo', 'US', 2018, 12, 87, ['strings that ache', 'virtuoso showing off', 'late night and hushed'], ['strings'], 'Bach in a carpeted office, mid-afternoon, no fuss. Twelve minutes that reset your whole day.', 'Cello Suite No. 1: Prelude|Cello Suite No. 3: Sarabande'],
  ['Hilary Hahn', 'classical', 'solo violin', 'solo', 'US', 2019, 14, 58, ['strings that ache', 'virtuoso showing off', 'one voice, no net'], ['strings'], 'Deep cut: a violinist playing Bach and new commissions to a dozen people on office chairs.', 'Partita No. 3: Preludio|Sonata No. 2: Andante|Letter to Anne Frank'],
];

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

/**
 * Verified NPR Music YouTube IDs — only artists where the real Tiny Desk
 * Concert's year matches this catalog's (mock) `year` field. The rest of
 * the catalog's mock years don't line up with any real concert for that
 * artist, so they're left without a videoId pending a decision on how to
 * reconcile the mock metadata with reality.
 */
const VIDEO_IDS: Record<string, string> = {
  'Anderson .Paak & The Free Nationals': 'ferZnZ0_rSM',
  'Mac Miller': 'QrR_gm6RqCo',
  'Phoebe Bridgers': '-hLJNZSIwP8',
  'Esperanza Spalding': 'sBZa7-2bG2I',
  'Cécile McLorin Salvant': 'NkmGue2WQyg',
  'Leon Bridges': 'C_oACPWGvM4',
  'H.E.R.': 'hxxcEzM8r-4',
  'Jorja Smith': 'yXrlhebkpIQ',
  'Natalia Lafourcade': 'JODaYjDyjyQ',
  'Yo-Yo Ma': '3uiUHvET_jg',
};

export const ITEMS: Performance[] = RAW.map((r, i) => {
  const [artist, genre, sub, ens, region, year, mins, loves, moods, instr, blurb, setlistRaw] = r;
  return {
    id: `p${i + 1}`,
    slug: slugify(artist),
    artist,
    genre,
    sub,
    ens,
    region,
    year,
    mins,
    videoId: VIDEO_IDS[artist],
    loves,
    moods,
    instr,
    blurb,
    setlist: setlistRaw.split('|'),
    decade: year < 2020 ? '2010s' : '2020s',
    rt: mins < 15 ? 'Under 15 min' : mins <= 20 ? '15–20 min' : 'Over 20 min',
    added: 25 - i,
  };
});

export function findById(id: string | null | undefined): Performance | undefined {
  return ITEMS.find((p) => p.id === id);
}

export function findBySlug(slug: string | undefined): Performance | undefined {
  return ITEMS.find((p) => p.slug === slug);
}
