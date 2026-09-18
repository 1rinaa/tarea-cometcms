// composables/useOscarData.js
import { ref, computed } from 'vue';

// Estado global (compartido entre todos los componentes)
const data = ref([]);
const loading = ref(false);
const error = ref(null);

// Diccionario de traducciones de categorías (inglés → español) - YA ESTÁ EN EL SCRIPT
const categoryTranslations = {
    'actor in a leading role': 'Mejor Actor',
    'actress in a leading role': 'Mejor Actriz',
    'actor in a supporting role': 'Mejor Actor de Reparto',
    'actress in a supporting role': 'Mejor Actriz de Reparto',
    'best picture': 'Mejor Película',
    'directing': 'Mejor Director',
    'animated feature film': 'Mejor Película de Animación',
    'international feature film': 'Mejor Película Internacional',
    'foreign language film': 'Mejor Película Internacional',
    'music (original song)': 'Mejor Canción Original',
    'music (original score)': 'Mejor Banda Sonora',
    'music (scoring)': 'Mejor Banda Sonora'
};

// Función para traducir categoría
const translateCategory = (category) => {
    if (!category) return category;
    return categoryTranslations[category.toLowerCase()] || category;
};

export function useOscarData() {
    const loadData = async () => {
        if (data.value.length > 0) return;
        
        loading.value = true;
        error.value = null;
        
        try {
            // Traemos TODO en paralelo
           const [nomRes, peliRes, catRes, perRes] = await Promise.all([
            $fetch('/api/comet/content/nominaciones', { query: { limit: 100 } }),
            $fetch('/api/comet/content/peliculas', { query: { limit: 100 } }),
            $fetch('/api/comet/content/categorias', { query: { limit: 100 } }),
            $fetch('/api/comet/content/personas', { query: { limit: 100 } })
          ]);
            
            const nominaciones = nomRes.data || [];
            const peliculas = peliRes.data || [];
            const categorias = catRes.data || [];
            const personas = perRes.data || [];
            
            console.log('📦 Crudos:', {
            nominaciones: nominaciones.length,
            peliculas: peliculas.length,
            categorias: categorias.length,
            personas: personas.length
            });
    
            
            // Índices por id para búsqueda rápida
            const peliMap = Object.fromEntries(peliculas.map(p => [p.id, p]));
            const catMap = Object.fromEntries(categorias.map(c => [c.id, c]));
            const perMap = Object.fromEntries(personas.map(p => [p.id, p]));
            
            // Transformación
            data.value = nominaciones.map(nom => {
            const nd = nom.data || {};
            const peli = peliMap[nd.pel_cula] || {};
            const cat = catMap[nd.categoria] || {};
            const per = perMap[nd.persona] || null;
            
            const pf = peli.data || {};
            const cf = cat.data || {};
            const perf = per ? (per.data || {}) : null;
            
            const nombrePersona = perf?.nombre || null;
            const nombreCategoria = cf.nombre || cat.title || 'Sin categoría';
            const tituloPeli = pf.titulo || peli.title || 'Desconocida';
            
            return {
                id: nom.id,
                film: tituloPeli,
                category: nombreCategoria,
                year_ceremony: pf.anio || 0,
                year_film: pf.anio || 0,
                ceremony: pf.anio || 0,
                poster: (pf.poster && pf.poster[0]) ? pf.poster[0] : '/posters/placeholder.jpg',
                country: 'Estados Unidos',
                winner: Boolean(nd.ganador),
                people: nombrePersona ? [nombrePersona] : [],
                allNames: nombrePersona ? [nombrePersona] : [],
                name: nombrePersona || 'Anónimo',
                totalNominations: 1,
                winnersCount: nd.ganador ? 1 : 0,
                description: (() => {
                    const winnerText = nd.ganador ? 'Ganador' : 'Nominado';
                    const base = `${winnerText} del Oscar a ${nombreCategoria} en ${pf.anio || 'N/A'}`;
                    return nombrePersona ? `${base} - ${nombrePersona}` : base;
                })()
            };
            });
            
            console.log('✅ Transformados:', data.value.length);
            console.log('📊 Primer registro:', data.value[0]);
        } catch (err) {
            error.value = err.message;
            console.error('❌ Error:', err);
        } finally {
            loading.value = false;
        }
    };

    // --- FUNCIONES EXISTENTES ---
    const getYears = computed(() => {
        if (!data.value || !Array.isArray(data.value)) return [];
        const years = [...new Set(data.value.map(item => item.year_ceremony))];
        return years.filter(y => y > 0).sort((a, b) => b - a);
    });

    const getCategories = computed(() => {
        if (!data.value || !Array.isArray(data.value)) return [];
        const categories = [...new Set(data.value.map(item => item.category))];
        return categories.sort();
    });

    // ✅ NUEVO: Obtener países únicos
    const getCountries = computed(() => {
        if (!data.value || !Array.isArray(data.value)) return [];
        const countries = [...new Set(data.value.map(item => item.country))];
        return countries.filter(c => c).sort();
    });

    // ✅ NUEVO: Obtener películas por país
    const getFilmsByCountry = (country) => {
        if (!data.value || !Array.isArray(data.value)) return [];
        return data.value.filter(item => item.country === country);
    };

    // ✅ NUEVO: Obtener personas por país
    const getPeopleByCountry = (country) => {
        if (!data.value || !Array.isArray(data.value)) return [];
        const people = new Set();
        data.value.forEach(item => {
            if (item.country === country && item.name) {
                people.add(item.name);
            }
        });
        return [...people].sort();
    };

    // --- FUNCIONES PARA ESTADÍSTICAS ---

    // Películas con más premios
    const getTopWinningFilms = (limit = 10) => {
        if (!data.value || !Array.isArray(data.value)) return [];
        const filmWins = {};
        data.value.forEach(item => {
            if (item.winner && item.film) {
                filmWins[item.film] = (filmWins[item.film] || 0) + 1;
            }
        });
        return Object.entries(filmWins)
            .sort((a, b) => b[1] - a[1])
            .slice(0, limit)
            .map(([film, wins]) => ({ film, wins }));
    };

    // Películas con más nominaciones
    const getTopNominatedFilms = (limit = 10) => {
        if (!data.value || !Array.isArray(data.value)) return [];
        const filmNoms = {};
        data.value.forEach(item => {
            if (item.film) {
                filmNoms[item.film] = (filmNoms[item.film] || 0) + 1;
            }
        });
        return Object.entries(filmNoms)
            .sort((a, b) => b[1] - a[1])
            .slice(0, limit)
            .map(([film, noms]) => ({ film, noms }));
    };

    // Actores/actrices/directores con más premios
    const getTopWinningActors = (limit = 12) => {
        if (!data.value || !Array.isArray(data.value)) return [];
    
        // Categorías de actuación/dirección (match exacto, no substring)
        const performerCategories = [
            'Mejor Actor',
            'Mejor Actriz',
            'Mejor Actor de Reparto',
            'Mejor Actriz de Reparto',
            'Mejor Director',
            'Mejor Película'
        ];
    
        // Categorías de película donde el "premio" es para los productores listados
        const pictureCategories = [
            'Mejor Película'
        ];
    
        const personWins = {};
    
        // Helper: separa nombres pegados por "/" y los limpia
        // "Frances McDormand/Peter Spears/Mollye Asher" -> ["Frances McDormand", "Peter Spears", "Mollye Asher"]
        // "Sally Hawkins" -> ["Sally Hawkins"] (no rompe nombres normales sin "/")
        const splitNames = (rawName) => {
            if (!rawName) return [];
            return rawName
                .split('/')
                .map(n => n.trim())
                .filter(n => n.length > 0);
        };
    
        data.value.forEach(item => {
            if (!item.winner) return;
    
            const isPerformerCategory = performerCategories.includes(item.category);
            const isPictureCategory = pictureCategories.includes(item.category);
    
            if (!isPerformerCategory && !isPictureCategory) return;
    
            const rawPeople = item.people || [];
            if (rawPeople.length === 0) return;
    
            // Aplana el array: cada elemento puede convertirse en 1+ nombres reales
            const allNames = rawPeople.flatMap(splitNames);
    
            allNames.forEach(cleanName => {
                if (!personWins[cleanName]) {
                    personWins[cleanName] = {
                        name: cleanName,
                        wins: 0,
                        categories: [],
                        films: [],
                        country: item.country || 'Desconocido'
                    };
                }
    
                personWins[cleanName].wins++;
                personWins[cleanName].categories.push(item.category);
                personWins[cleanName].films.push({
                    film: item.film,
                    year: item.year_ceremony,
                    category: item.category
                });
            });
        });
    
        return Object.values(personWins)
            .sort((a, b) => b.wins - a.wins)
            .slice(0, limit);
    };

    //  Actores/actrices con más nominaciones
    const getTopNominatedActors = (limit = 10) => {
        if (!data.value || !Array.isArray(data.value)) return [];
        
        const personCategories = [
            'Mejor Actor',
            'Mejor Actriz',
            'Mejor Actor de Reparto',
            'Mejor Actriz de Reparto',
            'Mejor Director'
        ];
        
        // ✅ Contar nominaciones por persona
        const personNoms = {};
        
        data.value.forEach(item => {
            // Verificar si la categoría es de persona
            const isPersonCategory = personCategories.some(cat => 
                item.category?.includes(cat)
            );
            if (!isPersonCategory) return;
            
            // Usar las personas del array "people"
            const people = item.people || [];
            if (people.length === 0) return;
            
            people.forEach(personName => {
                if (!personName || personName.trim() === '') return;
                
                const cleanName = personName.trim();
                
                if (!personNoms[cleanName]) {
                    personNoms[cleanName] = {
                        name: cleanName,
                        noms: 0,
                        country: item.country || 'Desconocido'
                    };
                }
                
                personNoms[cleanName].noms++;
            });
        });
        
        return Object.values(personNoms)
            .sort((a, b) => b.noms - a.noms)
            .slice(0, limit);
    };

    // Categorías con más premios
    const getTopCategories = (limit = 10) => {
        if (!data.value || !Array.isArray(data.value)) return [];
        const catWins = {};
        data.value.forEach(item => {
            if (item.winner && item.category) {
                catWins[item.category] = (catWins[item.category] || 0) + 1;
            }
        });
        return Object.entries(catWins)
            .sort((a, b) => b[1] - a[1])
            .slice(0, limit)
            .map(([category, wins]) => ({ category, wins }));
    };

    // Ganadores por década
    const getWinnersByDecade = () => {
        if (!data.value || !Array.isArray(data.value)) return [];
        const decades = {};
        data.value.forEach(item => {
            if (item.winner && item.year_ceremony) {
                const decade = Math.floor(item.year_ceremony / 10) * 10;
                decades[decade] = (decades[decade] || 0) + 1;
            }
        });
        return Object.entries(decades)
            .sort((a, b) => a[0] - b[0])
            .map(([decade, count]) => ({ decade: parseInt(decade), count }));
    };

    // ✅ Obtener todos los premios de una persona
    const getPersonAwards = (personName) => {
        if (!data.value || !Array.isArray(data.value)) return [];
        if (!personName) return [];
        
        const cleanSearch = personName.trim().toLowerCase();
        
        return data.value.filter(item => {
            // Solo ganadores
            if (!item.winner) return false;
            
            // Verificar si la persona está en el array "people"
            const people = item.people || [];
            return people.some(p => p.trim().toLowerCase() === cleanSearch);
        });
    };

    // ✅ Obtener conteo de premios de una persona
    const getPersonWinCount = (personName) => {
        return getPersonAwards(personName).length;
    };

    // ✅ Obtener categorías en las que ha ganado una persona
    const getPersonWinCategories = (personName) => {
        const awards = getPersonAwards(personName);
        const categories = new Set();
        awards.forEach(item => {
            if (item.category) categories.add(item.category);
        });
        return [...categories];
    };

    // ✅ NUEVO: Estadísticas por país
    const getCountryStats = (country) => {
        if (!data.value || !Array.isArray(data.value)) return null;
        const items = data.value.filter(item => item.country === country);
        if (items.length === 0) return null;
        
        const winners = items.filter(item => item.winner).length;
        const films = new Set(items.map(item => item.film)).size;
        const categories = new Set(items.map(item => item.category)).size;
        const people = new Set(items.map(item => item.name)).size;
        
        return {
            country,
            total: items.length,
            winners,
            nominations: items.length - winners,
            films,
            categories,
            people
        };
    };

    return {
        data,
        loading,
        error,
        loadData,
        getYears,
        getCategories,
        getCountries,
        getFilmsByCountry,
        getPeopleByCountry,
        getCountryStats,
        getTopWinningFilms,
        getTopNominatedFilms,
        getTopWinningActors,
        getTopNominatedActors,
        getTopCategories,
        getWinnersByDecade,
        translateCategory,
    };
}