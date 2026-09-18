const fs = require('fs');
const path = require('path');

// Lee el CSV
const csvPath = path.join(__dirname, '../the_oscar_award.csv');
console.log('📂 Leyendo archivo:', csvPath);

const csvData = fs.readFileSync(csvPath, 'utf-8');
const lines = csvData.split('\n');
const headers = lines[0].split(',').map(h => h.trim());

console.log('📋 Headers:', headers);

// Convierte a JSON
const allData = [];
let winnerCount = 0;

for (let i = 1; i < lines.length; i++) {
    if (lines[i].trim() === '') continue;
    
    const values = lines[i].split(',');
    const entry = {};
    
    headers.forEach((header, index) => {
        let value = values[index]?.trim() || '';
        
        if (header === 'winner') {
            value = value.toLowerCase() === 'true';
            if (value) winnerCount++;
        } else if (header === 'year_film' || header === 'year_ceremony' || header === 'ceremony') {
            value = parseInt(value) || 0;
        }
        
        entry[header] = value;
    });
    
    allData.push(entry);
}

console.log(`📊 Total registros originales: ${allData.length}`);
console.log(`🏆 Total ganadores originales: ${winnerCount}`);

// ============================================
// ✅ MAPEO DE PAÍSES - TODOS EN ESPAÑOL
// ============================================

// Normalización de países (inglés → español)
const countryNormalization = {
    'United States': 'Estados Unidos',
    'USA': 'Estados Unidos',
    'U.S.A.': 'Estados Unidos',
    'America': 'Estados Unidos',
    'US': 'Estados Unidos',
    'United Kingdom': 'Reino Unido',
    'UK': 'Reino Unido',
    'England': 'Reino Unido',
    'Great Britain': 'Reino Unido',
    'France': 'Francia',
    'Germany': 'Alemania',
    'Spain': 'España',
    'Italy': 'Italia',
    'Japan': 'Japón',
    'South Korea': 'Corea del Sur',
    'Korea': 'Corea del Sur',
    'Mexico': 'México',
    'Argentina': 'Argentina',
    'Brazil': 'Brasil',
    'Chile': 'Chile',
    'Colombia': 'Colombia',
    'Peru': 'Perú',
    'Venezuela': 'Venezuela',
    'Uruguay': 'Uruguay',
    'Paraguay': 'Paraguay',
    'Bolivia': 'Bolivia',
    'Ecuador': 'Ecuador',
    'Costa Rica': 'Costa Rica',
    'Panama': 'Panamá',
    'Cuba': 'Cuba',
    'Dominican Republic': 'República Dominicana',
    'Puerto Rico': 'Puerto Rico',
    'El Salvador': 'El Salvador',
    'Guatemala': 'Guatemala',
    'Honduras': 'Honduras',
    'Nicaragua': 'Nicaragua',
    'China': 'China',
    'Taiwan': 'Taiwán',
    'Hong Kong': 'Hong Kong',
    'India': 'India',
    'Australia': 'Australia',
    'New Zealand': 'Nueva Zelanda',
    'Canada': 'Canadá',
    'Ireland': 'Irlanda',
    'Denmark': 'Dinamarca',
    'Sweden': 'Suecia',
    'Norway': 'Noruega',
    'Finland': 'Finlandia',
    'Iceland': 'Islandia',
    'Poland': 'Polonia',
    'Russia': 'Rusia',
    'Iran': 'Irán',
    'Israel': 'Israel',
    'Turkey': 'Turquía',
    'Egypt': 'Egipto',
    'South Africa': 'Sudáfrica',
    'Nigeria': 'Nigeria',
    'Morocco': 'Marruecos',
    'Tunisia': 'Túnez',
    'Algeria': 'Argelia',
    'Lebanon': 'Líbano',
    'Jordan': 'Jordania',
    'Palestine': 'Palestina',
    'Syria': 'Siria',
    'Iraq': 'Irak',
    'Saudi Arabia': 'Arabia Saudita',
    'United Arab Emirates': 'Emiratos Árabes Unidos',
    'Qatar': 'Qatar',
    'Kuwait': 'Kuwait',
    'Bahrain': 'Baréin',
    'Oman': 'Omán',
    'Yemen': 'Yemen',
};

// Mapeo de países para películas (todos en español)
const filmCountries = {
    // === JAPÓN ===
    'Spirited Away': 'Japón',
    'Howl\'s Moving Castle': 'Japón',
    'My Neighbor Totoro': 'Japón',
    'Princess Mononoke': 'Japón',
    'The Boy and the Heron': 'Japón',
    'The Wind Rises': 'Japón',
    'Ponyo': 'Japón',
    'The Secret World of Arrietty': 'Japón',
    'From Up on Poppy Hill': 'Japón',
    'The Tale of the Princess Kaguya': 'Japón',
    'When Marnie Was There': 'Japón',
    'Grave of the Fireflies': 'Japón',
    'Akira': 'Japón',
    'Ghost in the Shell': 'Japón',
    'Your Name': 'Japón',
    'Weathering with You': 'Japón',
    'Suzume': 'Japón',
    'Drive My Car': 'Japón',
    'Shoplifters': 'Japón',
    'Perfect Days': 'Japón',
    'Monster': 'Japón',
    
    // === COREA DEL SUR ===
    'Parasite': 'Corea del Sur',
    'Memories of Murder': 'Corea del Sur',
    'Burning': 'Corea del Sur',
    'The Host': 'Corea del Sur',
    'Okja': 'Corea del Sur',
    'Decision to Leave': 'Corea del Sur',
    
    // === MÉXICO ===
    'Roma': 'México',
    'Amores Perros': 'México',
    'Y Tu Mamá También': 'México',
    'Children of Men': 'México',
    'Gravity': 'Estados Unidos',
    'The Revenant': 'Estados Unidos',
    'Birdman': 'Estados Unidos',
    'The Shape of Water': 'Estados Unidos',
    'Nightmare Alley': 'Estados Unidos',
    
    // === FRANCIA ===
    'The Artist': 'Francia',
    'Amélie': 'Francia',
    'The Intouchables': 'Francia',
    'Portrait of a Lady on Fire': 'Francia',
    'Anatomy of a Fall': 'Francia',
    'Titane': 'Francia',
    'The Umbrellas of Cherbourg': 'Francia',
    'The 400 Blows': 'Francia',
    
    // === REINO UNIDO ===
    'The King\'s Speech': 'Reino Unido',
    'Slumdog Millionaire': 'Reino Unido',
    'The Queen': 'Reino Unido',
    'The Favourite': 'Reino Unido',
    '1917': 'Reino Unido',
    'The Father': 'Reino Unido',
    'Belfast': 'Reino Unido',
    'The Zone of Interest': 'Reino Unido',
    'The Imitation Game': 'Reino Unido',
    'The Theory of Everything': 'Reino Unido',
    'Bohemian Rhapsody': 'Reino Unido',
    'Darkest Hour': 'Reino Unido',
    'Dunkirk': 'Reino Unido',
    
    // === IRLANDA ===
    'The Banshees of Inisherin': 'Irlanda',
    'The Quiet Girl': 'Irlanda',
    
    // === ALEMANIA ===
    'The Lives of Others': 'Alemania',
    'Toni Erdmann': 'Alemania',
    'All Quiet on the Western Front': 'Alemania',
    
    // === ITALIA ===
    'The Great Beauty': 'Italia',
    'Life Is Beautiful': 'Italia',
    'Cinema Paradiso': 'Italia',
    'The Hand of God': 'Italia',
    
    // === ESPAÑA ===
    'All About My Mother': 'España',
    'Volver': 'España',
    'Pan\'s Labyrinth': 'España',
    'The Sea Inside': 'España',
    'Parallel Mothers': 'España',
    'Talk to Her': 'España',
    
    // === ARGENTINA ===
    'The Secret in Their Eyes': 'Argentina',
    'Wild Tales': 'Argentina',
    'Argentina, 1985': 'Argentina',
    
    // === BRASIL ===
    'City of God': 'Brasil',
    'Central Station': 'Brasil',
    'I\'m Still Here': 'Brasil',
    
    // === CHINA / TAIWAN ===
    'Crouching Tiger, Hidden Dragon': 'Taiwán',
    'Hero': 'China',
    'Farewell My Concubine': 'China',
    'The Grandmaster': 'China',
    
    // === IRÁN ===
    'A Separation': 'Irán',
    'The Salesman': 'Irán',
    'About Elly': 'Irán',
    
    // === DINAMARCA ===
    'Another Round': 'Dinamarca',
    'The Hunt': 'Dinamarca',
    'Babette\'s Feast': 'Dinamarca',
    
    // === AUSTRALIA ===
    'Mad Max: Fury Road': 'Australia',
    'The Power of the Dog': 'Australia',
    
    // === NUEVA ZELANDA ===
    'The Lord of the Rings: The Return of the King': 'Nueva Zelanda',
    'The Piano': 'Nueva Zelanda',
};

// ============================================
// MAPEO DE PAÍSES POR PERSONA
// ============================================

const personCountries = {
    // JAPÓN
    'Hayao Miyazaki': 'Japón',
    'Toshio Suzuki': 'Japón',
    'Isao Takahata': 'Japón',
    'Hiromasa Yonebayashi': 'Japón',
    'Gorō Miyazaki': 'Japón',
    'Makoto Shinkai': 'Japón',
    'Mamoru Hosoda': 'Japón',
    'Satoshi Kon': 'Japón',
    'Akira Kurosawa': 'Japón',
    'Yasujirō Ozu': 'Japón',
    'Kenji Mizoguchi': 'Japón',
    'Ryuichi Sakamoto': 'Japón',
    'Joe Hisaishi': 'Japón',
    'Ryusuke Hamaguchi': 'Japón',
    'Hirokazu Kore-eda': 'Japón',
    'Takashi Yamazaki': 'Japón',
    'Shinji Higuchi': 'Japón',
    'Hideaki Anno': 'Japón',
    
    // COREA DEL SUR
    'Bong Joon-ho': 'Corea del Sur',
    'Park Chan-wook': 'Corea del Sur',
    'Lee Chang-dong': 'Corea del Sur',
    'Kim Ki-duk': 'Corea del Sur',
    'Hong Sang-soo': 'Corea del Sur',
    'Im Sang-soo': 'Corea del Sur',
    
    // MÉXICO
    'Alfonso Cuarón': 'México',
    'Guillermo del Toro': 'México',
    'Alejandro González Iñárritu': 'México',
    'Carlos Reygadas': 'México',
    'Michel Franco': 'México',
    'Gael García Bernal': 'México',
    'Salma Hayek': 'México',
    'Lupita Nyong\'o': 'México', // Nacida en México
    'Diego Luna': 'México',
    'Eugenio Derbez': 'México',
    'Yalitza Aparicio': 'México',
    'Marina de Tavira': 'México',
    
    // ESPAÑA
    'Pedro Almodóvar': 'España',
    'Penélope Cruz': 'España',
    'Antonio Banderas': 'España',
    'Javier Bardem': 'España',
    'Isabel Coixet': 'España',
    'Alberto Rodríguez': 'España',
    'Pablo Sorozábal': 'España',
    'Alejandro Amenábar': 'España',
    'Juan Antonio Bayona': 'España',
    
    // FRANCIA
    'François Truffaut': 'Francia',
    'Jean-Luc Godard': 'Francia',
    'Claude Chabrol': 'Francia',
    'Eric Rohmer': 'Francia',
    'Jacques Rivette': 'Francia',
    'Agnès Varda': 'Francia',
    'Jean-Pierre Jeunet': 'Francia',
    'Luc Besson': 'Francia',
    'Michel Gondry': 'Francia',
    'Céline Sciamma': 'Francia',
    'Justine Triet': 'Francia',
    'Isabelle Huppert': 'Francia',
    'Marion Cotillard': 'Francia',
    'Juliette Binoche': 'Francia',
    'Audrey Tautou': 'Francia',
    'Catherine Deneuve': 'Francia',
    'Jean Dujardin': 'Francia',
    'Bérénice Bejo': 'Francia',
    
    // ITALIA
    'Paolo Sorrentino': 'Italia',
    'Roberto Benigni': 'Italia',
    'Giuseppe Tornatore': 'Italia',
    'Pier Paolo Pasolini': 'Italia',
    'Federico Fellini': 'Italia',
    'Michelangelo Antonioni': 'Italia',
    'Sergio Leone': 'Italia',
    'Sofia Coppola': 'Estados Unidos', // Nacida en USA pero con conexión italiana
    'Gabriele Salvatores': 'Italia',
    'Carlo Bernini': 'Italia',
    
    // REINO UNIDO
    'Christopher Nolan': 'Reino Unido',
    'Alfred Hitchcock': 'Reino Unido',
    'Charlie Chaplin': 'Reino Unido',
    'David Lean': 'Reino Unido',
    'Ridley Scott': 'Reino Unido',
    'Tony Scott': 'Reino Unido',
    'Mike Leigh': 'Reino Unido',
    'Ken Loach': 'Reino Unido',
    'Stephen Daldry': 'Reino Unido',
    'Sam Mendes': 'Reino Unido',
    'Danny Boyle': 'Reino Unido',
    'Guy Ritchie': 'Reino Unido',
    'Matthew Warchus': 'Reino Unido',
    'Tom Hooper': 'Reino Unido',
    'Steve McQueen': 'Reino Unido',
    'Adele': 'Reino Unido',
    'Kate Winslet': 'Reino Unido',
    'Daniel Day-Lewis': 'Reino Unido',
    'Anthony Hopkins': 'Reino Unido',
    'Judi Dench': 'Reino Unido',
    'Maggie Smith': 'Reino Unido',
    'Helen Mirren': 'Reino Unido',
    
    // IRLANDA
    'Saoirse Ronan': 'Irlanda',
    'Cillian Murphy': 'Irlanda',
    'Paul Mescal': 'Irlanda',
    'Colin Farrell': 'Irlanda',
    'Brendan Gleeson': 'Irlanda',
    'Barry Keoghan': 'Irlanda',
    'Martin McDonagh': 'Irlanda',
    'Lenny Abrahamson': 'Irlanda',
    'Jim Sheridan': 'Irlanda',
    'Neil Jordan': 'Irlanda',
    'John Huston': 'Estados Unidos', // Pero nacionalizado irlandés
    'Aidan Quinn': 'Irlanda',
    'Gabriel Byrne': 'Irlanda',
    'Pierce Brosnan': 'Irlanda',
    'Liam Neeson': 'Irlanda',
    'Maureen O\'Hara': 'Irlanda',
    'Maureen Cusack': 'Irlanda',
    
    // ALEMANIA
    'Werner Herzog': 'Alemania',
    'Rainer Werner Fassbinder': 'Alemania',
    'Wim Wenders': 'Alemania',
    'Volker Schlöndorff': 'Alemania',
    'Fatih Akin': 'Alemania',
    'Maren Ade': 'Alemania',
    'Toni Erdmann': 'Alemania',
    'Sandra Hüller': 'Alemania',
    'Marlene Dietrich': 'Alemania',
    'Michael Fassbender': 'Alemania', // Nacido en Alemania
    'Diane Kruger': 'Alemania',
    'Daniel Brühl': 'Alemania',
    'Franka Potente': 'Alemania',
    
    // ARGENTINA
    'Fernando Solanas': 'Argentina',
    'Luis Ortega': 'Argentina',
    'Pablo Trapero': 'Argentina',
    'Damián Szifrón': 'Argentina',
    'Marcos Carnevale': 'Argentina',
    'Natalia Oreiro': 'Argentina',
    'Ricardo Darín': 'Argentina',
    'Guillermo Francella': 'Argentina',
    'Dolores Fonzi': 'Argentina',
    'Manuela Martelli': 'Argentina',
    'Damián Alcázar': 'Argentina',
    
    // BRASIL
    'Fernando Meirelles': 'Brasil',
    'Walter Salles': 'Brasil',
    'José Padilha': 'Brasil',
    'Kleber Mendonça Filho': 'Brasil',
    'Sônia Braga': 'Brasil',
    'Wagner Moura': 'Brasil',
    'Alice Braga': 'Brasil',
    'Selton Mello': 'Brasil',
    
    // CANADÁ
    'Denis Villeneuve': 'Canadá',
    'Atom Egoyan': 'Canadá',
    'David Cronenberg': 'Canadá',
    'James Cameron': 'Canadá',
    'Norman Jewison': 'Canadá',
    'Sarah Polley': 'Canadá',
    'Xavier Dolan': 'Canadá',
    'Ryan Reynolds': 'Canadá',
    'Rachel McAdams': 'Canadá',
    'Elliot Page': 'Canadá',
    'Keanu Reeves': 'Canadá',
    'Sandra Oh': 'Canadá',
};

// ============================================
// MAPEO DE PRODUCTORES PARA NOMINACIONES COMPARTIDAS
// ============================================

const producerMappings = {
    // STUDIO GHIBLI - Productores que comparten nominaciones con Miyazaki
    'Toshio Suzuki': [
        'Spirited Away',
        'Howl\'s Moving Castle',
        'The Boy and the Heron',
        'The Wind Rises',
        'My Neighbor Totoro',
        'Princess Mononoke',
        'Ponyo',
        'The Secret World of Arrietty',
        'The Tale of the Princess Kaguya',
        'When Marnie Was There',
        'From Up on Poppy Hill',
        'Grave of the Fireflies',
        'Only Yesterday',
        'Whisper of the Heart',
        'The Cat Returns'
    ],
    'Isao Takahata': [
        'Grave of the Fireflies',
        'Only Yesterday',
        'Pom Poko',
        'My Neighbors the Yamadas',
        'The Tale of the Princess Kaguya'
    ],
    'Yoshiaki Nishimura': [
        'The Tale of the Princess Kaguya',
        'When Marnie Was There'
    ],
    
    // PIXAR / ANIMACIÓN
    'Darla K. Anderson': [
        'Toy Story 3',
        'Coco',
        'A Bug\'s Life',
        'Cars'
    ],
    'Pete Docter': [
        'Up',
        'Inside Out',
        'Soul',
        'Monsters, Inc.',
        'WALL-E'
    ],
    'Andrew Stanton': [
        'Finding Nemo',
        'WALL-E',
        'A Bug\'s Life',
        'The Incredibles'
    ],
    'John Lasseter': [
        'Toy Story',
        'Toy Story 2',
        'Toy Story 3',
        'Cars',
        'A Bug\'s Life'
    ],
    'Ed Catmull': [
        'Toy Story 3',
        'Up',
        'WALL-E',
        'Inside Out'
    ],
    
    // PRODUCTORES DE PELÍCULAS INTERNACIONALES
    'Celine Rattray': [
        'The Kids Are All Right',
        'Still Alice'
    ],
    'Trudie Styler': [
        'The Queen',
        'Moon'
    ],
    'Meg Ryan': [
        'Hanging Up',
        'Ithaca'
    ],
    'Jay Roach': [
        'Bombshell',
        'Austin Powers'
    ],
    'Betsy Beers': [
        'Grey\'s Anatomy',
        'The Proposal'
    ],
    
    // PRODUCTORES DE DRIVE MY CAR (Japón)
    'Osamu Kubota': [
        'Drive My Car'
    ],
    'Misaki Kawamura': [
        'Drive My Car'
    ],
    
    // PRODUCTORES DE PARASITE (Corea del Sur)
    'Kwak Sin-ae': [
        'Parasite',
        'The Host'
    ],
    'Jang Young-hwan': [
        'Parasite'
    ],
    'Lee Joon-dong': [
        'Parasite'
    ],
};

// ============================================
// FILTRADO DE DATOS
// ============================================

// 1. Definir películas con posters locales
const filmImages = {
    // === Mejores Películas ===
    'American Beauty': '/posters/american-beauty.jpg',
    'Gladiator': '/posters/gladiator.jpg',
    'A Beautiful Mind': '/posters/a-beautiful-mind.jpg',
    'Chicago': '/posters/chicago.jpg',
    'The Lord of the Rings: The Return of the King': '/posters/the-lord-of-the-rings-the-return-of-the-king.jpg',
    'Million Dollar Baby': '/posters/million-dollar-baby.jpg',
    'Crash': '/posters/crash.jpg',
    'The Departed': '/posters/the-departed.jpg',
    'No Country for Old Men': '/posters/no-country-for-old-men.jpg',
    'Slumdog Millionaire': '/posters/slumdog-millionaire.jpg',
    'The Hurt Locker': '/posters/the-hurt-locker.jpg',
    'The King\'s Speech': '/posters/the-kings-speech.jpg',
    'The Artist': '/posters/the-artist.jpg',
    'Argo': '/posters/argo.jpg',
    '12 Years a Slave': '/posters/12-years-a-slave.jpg',
    'Birdman': '/posters/birdman.jpg',
    'Spotlight': '/posters/spotlight.jpg',
    'Moonlight': '/posters/moonlight.jpg',
    'The Shape of Water': '/posters/the-shape-of-water.jpg',
    'Green Book': '/posters/green-book.jpg',
    'Parasite': '/posters/parasite.jpg',
    'Nomadland': '/posters/nomadland.jpg',
    'CODA': '/posters/coda.jpg',
    'Everything Everywhere All at Once': '/posters/everything-everywhere-all-at-once.jpg',
    'Oppenheimer': '/posters/oppenheimer.jpg',
    
    // === ANIMACIÓN JAPONESA ===
    'Spirited Away': '/posters/spirited-away.jpg',
    'Howl\'s Moving Castle': '/posters/howls-moving-castle.jpg',
    'My Neighbor Totoro': '/posters/my-neighbor-totoro.jpg',
    'Princess Mononoke': '/posters/princess-mononoke.jpg',
    'The Boy and the Heron': '/posters/the-boy-and-the-heron.jpg',
    'The Wind Rises': '/posters/the-wind-rises.jpg',
    'Ponyo': '/posters/ponyo.jpg',
    'The Secret World of Arrietty': '/posters/the-secret-world-of-arrietty.jpg',
    'The Tale of the Princess Kaguya': '/posters/the-tale-of-the-princess-kaguya.jpg',
    'When Marnie Was There': '/posters/when-marnie-was-there.jpg',
    
    // === OTRAS PELÍCULAS DESTACADAS ===
    'Drive My Car': '/posters/drive-my-car.jpg',
    'Roma': '/posters/roma.jpg',
    'The Banshees of Inisherin': '/posters/the-banshees-of-inisherin.jpg',
    'Anatomy of a Fall': '/posters/anatomy-of-a-fall.jpg',
    'All Quiet on the Western Front': '/posters/all-quiet-on-the-western-front.jpg',
    'The Zone of Interest': '/posters/the-zone-of-interest.jpg',
    'The Father': '/posters/the-father.jpg',
    '1917': '/posters/1917.jpg',
    'Belfast': '/posters/belfast.jpg',
    'Dune': '/posters/dune.jpg',
    'The Irishman': '/posters/the-irishman.jpg',
    'Joker': '/posters/joker.jpg',
    'Once Upon a Time in Hollywood': '/posters/once-upon-a-time-in-hollywood.jpg',
    'The Revenant': '/posters/the-revenant.jpg',
    'La La Land': '/posters/la-la-land.jpg',
    'The Grand Budapest Hotel': '/posters/the-grand-budapest-hotel.jpg',
    'Mad Max: Fury Road': '/posters/mad-max-fury-road.jpg',
    'Whiplash': '/posters/whiplash.jpg',
    'Inception': '/posters/inception.jpg',
    'The Dark Knight': '/posters/the-dark-knight.jpg',
    'Encanto': '/posters/encanto.jpg',
    'Coco': '/posters/coco.jpg',
    'Up': '/posters/up.jpg',
    'Frozen': '/posters/frozen.jpg',
    'Toy Story 3': '/posters/toy-story-3.jpg',
    'Inside Out': '/posters/inside-out.jpg',
    'Soul': '/posters/soul.jpg',
    'Spider-Man: Into the Spider-Verse': '/posters/spider-man-into-the-spider-verse.jpg',
    'The Mitchells vs. the Machines': '/posters/the-mitchells-vs-the-machines.jpg',
    'Klaus': '/posters/klaus.jpg',
    'Toy Story 4': '/posters/toy-story-4.jpg',
    'How to Train Your Dragon': '/posters/how-to-train-your-dragon.jpg',
    'How to Train Your Dragon 2': '/posters/how-to-train-your-dragon-2.jpg',
    'How to Train Your Dragon 3': '/posters/how-to-train-your-dragon-3.jpg',
};

// ============================================
// MAPEO DE CATEGORÍAS - TODAS EN ESPAÑOL
// ============================================

const categoryTranslations = {
    // ACTUACIÓN
    'ACTOR IN A LEADING ROLE': 'Mejor Actor',
    'ACTRESS IN A LEADING ROLE': 'Mejor Actriz',
    'ACTOR IN A SUPPORTING ROLE': 'Mejor Actor de Reparto',
    'ACTRESS IN A SUPPORTING ROLE': 'Mejor Actriz de Reparto',
    
    // PELÍCULA
    'BEST PICTURE': 'Mejor Película',
    'OUTSTANDING PICTURE': 'Mejor Película',
    'BEST MOTION PICTURE': 'Mejor Película',
    'OUTSTANDING PRODUCTION': 'Mejor Película',
    'OUTSTANDING MOTION PICTURE': 'Mejor Película',
    
    // DIRECCIÓN
    'DIRECTING': 'Mejor Director',
    'DIRECTING (Comedy Picture)': 'Mejor Director',
    'DIRECTING (Dramatic Picture)': 'Mejor Director',
    
    // ANIMACIÓN
    'ANIMATED FEATURE FILM': 'Mejor Película de Animación',
    
    // INTERNACIONAL
    'FOREIGN LANGUAGE FILM': 'Mejor Película Internacional',
    'INTERNATIONAL FEATURE FILM': 'Mejor Película Internacional',
    
    // MÚSICA
    'MUSIC (ORIGINAL SONG)': 'Mejor Canción Original',
    'MUSIC (ORIGINAL SCORE)': 'Mejor Banda Sonora',
    'MUSIC (SCORING)': 'Mejor Banda Sonora',
};

const allowedCanonCategories = Object.keys(categoryTranslations);

// 3. Filtrar datos (años 2000-2026)
const filteredData = allData.filter(item => {
    if (!item.film || !item.name || !item.year_ceremony) return false;
    
    const canonCategory = item.canon_category || item.category;
    if (!allowedCanonCategories.includes(canonCategory)) return false;
    
    if (item.year_ceremony < 2000 || item.year_ceremony > 2026) return false;
    
    return true;
});

console.log(`📊 Registros filtrados: ${filteredData.length}`);

// ============================================
// FUNCIÓN PARA NORMALIZAR NOMBRES
// ============================================

const normalizeFilmName = (name) => {
    if (!name) return '';
    return name
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '');
};

// ============================================
// LEER POSTERS EXISTENTES
// ============================================

const postersDir = path.join(__dirname, '../public/posters');
const existingPosters = new Set();

if (fs.existsSync(postersDir)) {
    const files = fs.readdirSync(postersDir);
    files.forEach(file => {
        const name = path.parse(file).name.toLowerCase();
        existingPosters.add(name);
    });
    console.log(`📁 Posters disponibles: ${existingPosters.size} archivos`);
} else {
    console.warn('⚠️ Carpeta de posters no encontrada:', postersDir);
}

const findPoster = (filmName) => {
    if (!filmName) return '/posters/placeholder.jpg';
    
    // Primero buscar en filmImages
    if (filmImages[filmName]) {
        return filmImages[filmName];
    }
    
    const normalized = normalizeFilmName(filmName);
    
    if (existingPosters.has(normalized)) {
        return `/posters/${normalized}.jpg`;
    }
    
    const variants = [
        normalized,
        normalized.replace(/-/g, ' '),
        normalized.replace(/'/g, ''),
        normalized.replace(/[^a-z0-9]/g, ''),
    ];
    
    for (const variant of variants) {
        if (existingPosters.has(variant)) {
            return `/posters/${variant}.jpg`;
        }
    }
    
    for (const posterName of existingPosters) {
        if (posterName.includes(normalized) || normalized.includes(posterName)) {
            return `/posters/${posterName}.jpg`;
        }
    }
    
    return '/posters/placeholder.jpg';
};

// ============================================
// ✅ FUNCIÓN PARA DETERMINAR PAÍS (VERSIÓN CORREGIDA)
// ============================================

const determineCountry = (item) => {
    // 1. PRIORIDAD MÁXIMA: Mapeo de películas (fuente más confiable)
    if (item.film && filmCountries[item.film]) {
        return filmCountries[item.film];
    }
    
    // 2. País en el CSV (normalizado)
    if (item.country) {
        const normalized = countryNormalization[item.country] || item.country;
        return normalized;
    }
    
    // 3. Buscar por persona
    const cleanName = item.name?.trim();
    if (cleanName && personCountries[cleanName]) {
        return personCountries[cleanName];
    }
    
    // 4. Para categorías internacionales: usar el país de la película, no el nombre
    const canonCategory = (item.canon_category || item.category || '').toUpperCase();
    if (canonCategory === 'FOREIGN LANGUAGE FILM' || canonCategory === 'INTERNATIONAL FEATURE FILM') {
        // Buscar por coincidencia parcial en filmCountries
        if (item.film) {
            for (const [film, country] of Object.entries(filmCountries)) {
                if (item.film.toLowerCase().includes(film.toLowerCase()) || 
                    film.toLowerCase().includes(item.film.toLowerCase())) {
                    return country;
                }
            }
        }
        // Si no se encuentra, intentar extraer del nombre (pero es menos fiable)
        const nameParts = item.name?.split('/') || [];
        for (const part of nameParts) {
            const trimmed = part.trim();
            for (const [eng, esp] of Object.entries(countryNormalization)) {
                if (trimmed.includes(eng) || trimmed.includes(esp) || esp.includes(trimmed)) {
                    return esp;
                }
            }
        }
    }
    
    // 5. Por defecto
    return 'Estados Unidos';
};

// ============================================
// ✅ NUEVO: Función para expandir productores
// ============================================

const expandProducers = (items) => {
    const expanded = [];
    
    items.forEach(item => {
        // Primero agregar el item original
        expanded.push(item);
        
        // Verificar si es un productor que necesita expansión
        const name = item.name?.trim();
        if (!name) return;
        
        // Buscar si el nombre está en producerMappings
        if (producerMappings[name]) {
            const films = producerMappings[name];
            
            // Si la película actual está en la lista, crear registros para las otras
            if (films.includes(item.film)) {
                // Buscar en los datos originales para las otras películas del productor
                // Pero solo si no estamos ya en un loop infinito
                // Esta función se ejecuta después de que los datos están filtrados
            }
        }
    });
    
    return expanded;
};

// ============================================
// 7. Normalizar y traducir datos
// ============================================

// Primero, crear un mapa de películas para cada persona
const personFilms = {};
allData.forEach(item => {
    const name = item.name?.trim();
    if (!name || !item.film) return;
    
    if (!personFilms[name]) {
        personFilms[name] = new Set();
    }
    personFilms[name].add(item.film);
});

// Ahora, para cada productor en producerMappings, agregar registros adicionales
const extraItems = [];

Object.keys(producerMappings).forEach(producer => {
    const films = producerMappings[producer];
    
    // Verificar si el productor ya existe en los datos
    const existingFilms = personFilms[producer] || new Set();
    
    films.forEach(film => {
        // Si el productor no tiene esta película en los datos originales,
        // buscar un registro similar para clonarlo
        if (!existingFilms.has(film)) {
            // Buscar un registro de esta película con otro nombre para clonar
            const templateItem = allData.find(item => 
                item.film === film && 
                item.canon_category && 
                allowedCanonCategories.includes(item.canon_category)
            );
            
            if (templateItem) {
                // Clonar el registro cambiando el nombre al productor
                const newItem = { ...templateItem };
                newItem.name = producer;
                newItem._isProducerExpansion = true;
                extraItems.push(newItem);
            }
        }
    });
});

console.log(`📦 Registros expandidos para productores: ${extraItems.length}`);

// Combinar datos filtrados con expansiones de productores
const allFilteredData = [...filteredData, ...extraItems];

// Eliminar duplicados (mismo nombre, película, categoría, año)
const seen = new Set();
const uniqueData = [];

allFilteredData.forEach(item => {
    const key = `${item.film}-${item.name}-${item.category}-${item.year_ceremony}`;
    if (!seen.has(key)) {
        seen.add(key);
        uniqueData.push(item);
    }
});

console.log(`📊 Datos únicos después de expansión: ${uniqueData.length}`);

// ============================================
// 8. Seleccionar datos finales (TODOS, sin límite)
// ============================================

// Agrupar por década para ver estadísticas
const decadeStats = {};
uniqueData.forEach(item => {
    if (!item.year_ceremony) return;
    const decade = Math.floor(item.year_ceremony / 10) * 10;
    if (!decadeStats[decade]) decadeStats[decade] = { winners: 0, nominees: 0 };
    if (item.winner) decadeStats[decade].winners++;
    else decadeStats[decade].nominees++;
});

console.log('📊 Estadísticas por década:');
Object.keys(decadeStats).sort().forEach(decade => {
    console.log(`  ${decade}s: ${decadeStats[decade].winners} premios, ${decadeStats[decade].nominees} nominados (total: ${decadeStats[decade].winners + decadeStats[decade].nominees})`);
});

// Ya tenemos uniqueData con todos los registros
const selectedData = uniqueData;

console.log(`📊 Total seleccionados: ${selectedData.length}`);
console.log(`🏆 Ganadores: ${selectedData.filter(item => item.winner).length}`);
console.log(`📋 Nominados: ${selectedData.filter(item => item.winner !== true).length}`);

// ============================================
// ✅ NUEVO: AGRUPAR POR PELÍCULA + CATEGORÍA + AÑO
// ============================================

console.log('\n🔄 Agrupando registros por película, categoría y año...');

const groupedData = new Map();

uniqueData.forEach(item => {
    // Normalizar categoría
    const canonCategory = (item.canon_category || item.category || '').toUpperCase();
    const translatedCategory = categoryTranslations[canonCategory] || canonCategory;
    
    // Clave de agrupación: película + categoría traducida + año
    const key = `${item.film}-${translatedCategory}-${item.year_ceremony}`;
    
    if (!groupedData.has(key)) {
        groupedData.set(key, {
            film: item.film,
            category: translatedCategory,
            year_ceremony: item.year_ceremony,
            year_film: item.year_film || item.year_ceremony,
            ceremony: item.ceremony,
            poster: findPoster(item.film),
            country: determineCountry(item),
            winner: item.winner, // El primero que encuentre
            people: [],
            allNames: [],
            // Para estadísticas
            totalNominations: 0,
            winnersCount: 0,
            isWinner: false
        });
    }
    
    const group = groupedData.get(key);
    
    // Agregar persona si no está duplicada
    const name = item.name?.trim() || 'Anónimo';
    if (!group.people.includes(name)) {
        group.people.push(name);
    }
    
    // Agregar allNames
    const names = (item.name || '').split('/').map(n => n.trim()).filter(Boolean);
    names.forEach(n => {
        if (!group.allNames.includes(n)) {
            group.allNames.push(n);
        }
    });
    
    // Actualizar contadores
    group.totalNominations++;
    if (item.winner) {
        group.winnersCount++;
        group.isWinner = true;
        // Si es ganador, actualizar el winner del grupo
        group.winner = true;
    }
});

console.log(`📊 Registros agrupados: ${groupedData.size} (de ${uniqueData.length} originales)`);

// ============================================
// CONVERTIR A ARRAY Y GENERAR JSON
// ============================================

const translatedData = Array.from(groupedData.values()).map(group => {
    // Crear descripción
    const winnerText = group.isWinner ? 'Ganador' : 'Nominado';
    const peopleText = group.people.length > 1 
        ? `${group.people.length} nominados` 
        : group.people[0] || 'Anónimo';
    
    return {
        id: `${group.film}-${group.category}-${group.year_ceremony}`,
        film: group.film,
        category: group.category,
        year_ceremony: group.year_ceremony,
        year_film: group.year_film,
        ceremony: group.ceremony,
        poster: group.poster,
        country: group.country,
        winner: group.isWinner,
        // ✅ PERSONAS AGRUPADAS
        people: group.people,
        allNames: group.allNames,
        // Para compatibilidad con código existente
        name: group.people.length > 1 ? group.people.join(', ') : group.people[0] || 'Anónimo',
        // Estadísticas del grupo
        totalNominations: group.totalNominations,
        winnersCount: group.winnersCount,
        description: `${winnerText} del Oscar a ${group.category} en ${group.year_ceremony} - ${peopleText}`
    };
});

// Ordenar por año (más reciente primero)
translatedData.sort((a, b) => b.year_ceremony - a.year_ceremony);

// ============================================
// GUARDAR DATOS
// ============================================

const outputDir = path.join(__dirname, '../public/data');
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

const outputPath = path.join(outputDir, 'oscar-data.json');
fs.writeFileSync(outputPath, JSON.stringify(translatedData, null, 2));

console.log(`✅ Datos guardados en: ${outputPath}`);
console.log(`📊 Total final: ${translatedData.length} registros agrupados`);
console.log(`🌍 Países únicos: ${[...new Set(translatedData.map(item => item.country))].sort().join(', ')}`);

// ============================================
// ESTADÍSTICAS
// ============================================

console.log('\n📊 Estadísticas por país:');
const countryStats = {};
translatedData.forEach(item => {
    if (!countryStats[item.country]) {
        countryStats[item.country] = { total: 0, winners: 0, films: new Set(), categories: new Set() };
    }
    countryStats[item.country].total++;
    if (item.winner) countryStats[item.country].winners++;
    if (item.film) countryStats[item.country].films.add(item.film);
    if (item.category) countryStats[item.country].categories.add(item.category);
});

Object.keys(countryStats)
    .sort((a, b) => countryStats[b].total - countryStats[a].total)
    .forEach(country => {
        const stats = countryStats[country];
        console.log(`  ${country}: ${stats.total} registros, ${stats.winners} premios, ${stats.films.size} películas, ${stats.categories.size} categorías`);
    });

// Verificación de Miyazaki
console.log('\n🎬 Registros de Hayao Miyazaki (agrupados):');
const miyazakiItems = translatedData.filter(item => 
    item.people?.includes('Hayao Miyazaki') || item.allNames?.includes('Hayao Miyazaki')
);
miyazakiItems.forEach(item => {
    const people = item.people?.join(', ') || 'N/A';
    console.log(`  ${item.film} (${item.category}) - ${item.winner ? '🏆' : '📋'} - ${people}`);
});

console.log('\n🎬 Registros de Toshio Suzuki (agrupados):');
const suzukiItems = translatedData.filter(item => 
    item.people?.includes('Toshio Suzuki') || item.allNames?.includes('Toshio Suzuki')
);
suzukiItems.forEach(item => {
    const people = item.people?.join(', ') || 'N/A';
    console.log(`  ${item.film} (${item.category}) - ${item.winner ? '🏆' : '📋'} - ${people}`);
});

// Mostrar ejemplo de agrupación
console.log('\n📋 Ejemplo de agrupación (Mejor Actor 2024):');
const example = translatedData.find(item => 
    item.category === 'Mejor Actor' && item.year_ceremony === 2024
);
if (example) {
    console.log(`  Película: ${example.film}`);
    console.log(`  Categoría: ${example.category}`);
    console.log(`  Año: ${example.year_ceremony}`);
    console.log(`  Nominados: ${example.people?.join(', ')}`);
    console.log(`  Total: ${example.totalNominations} nominaciones`);
}