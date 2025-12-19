# 🎮 Pokédex Next.js

Una aplicación Pokédex interactiva construida con Next.js 16, TypeScript y Tailwind CSS. Explora el fascinante mundo de los Pokémon con información detallada, búsqueda avanzada y una interfaz moderna y responsiva.

## 📋 Tabla de Contenidos

- [Características](#características)
- [Tecnologías Utilizadas](#tecnologías-utilizadas)
- [Instalación](#instalación)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Uso](#uso)
- [API](#api)
- [Componentes](#componentes)
- [Despliegue](#despliegue)
- [Contribución](#contribución)
- [Licencia](#licencia)

## ✨ Características

- **Listado de Pokémon**: Navega a través de todos los Pokémon con paginación
- **Búsqueda**: Busca Pokémon por nombre de forma instantánea
- **Detalles Completos**: Vista detallada de cada Pokémon con estadísticas, habilidades y descripciones
- **Diseño Responsivo**: Interfaz optimizada para dispositivos móviles y de escritorio
- **Optimización de Imágenes**: Uso del componente Image de Next.js para una carga eficiente
- **Navegación Fluida**: Transiciones suaves entre páginas y componentes
- **Manejo de Errores**: Gestión elegante de errores y estados de carga

## 🛠 Tecnologías Utilizadas

- **[Next.js 16](https://nextjs.org/)**: Framework de React con App Router
- **[TypeScript](https://www.typescriptlang.org/)**: Tipado estático para mayor seguridad en el código
- **[Tailwind CSS](https://tailwindcss.com/)**: Framework de CSS para estilos modernos
- **[PokeAPI](https://pokeapi.co/)**: API pública para obtener datos de Pokémon
- **[ESLint](https://eslint.org/)**: Linter para mantener la calidad del código

## 🚀 Instalación

1. Clona el repositorio:

```bash
git clone https://github.com/tu-usuario/next-pokemon.git
cd next-pokemon
```

2. Instala las dependencias:

```bash
npm install
# o
yarn install
# o
pnpm install
```

3. Ejecuta el servidor de desarrollo:

```bash
npm run dev
# o
yarn dev
# o
pnpm dev
```

4. Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver la aplicación.

## 📂 Estructura del Proyecto

```
next-pokemon/
├── src/
│   ├── app/                    # Estructura de la aplicación (App Router)
│   │   ├── pokemon/
│   │   │   └── [id]           # Ruta dinámica para detalles de Pokémon
│   │   ├── globals.css        # Estilos globales
│   │   ├── layout.tsx         # Layout principal de la aplicación
│   │   ├── page.tsx           # Página principal (listado de Pokémon)
│   │   └── ...                # Archivos de error, loading, etc.
│   ├── components/            # Componentes reutilizables
│   │   ├── PokemonCard.tsx    # Tarjeta individual de Pokémon
│   │   ├── PokemonGrid.tsx    # Cuadrícula de Pokémon
│   │   ├── SearchBar.tsx      # Barra de búsqueda
│   │   └── Pagination.tsx     # Componente de paginación
│   ├── lib/                   # Utilidades y configuración
│   │   └── api.ts             # Cliente para la API de Pokémon
│   ├── types/                 # Definiciones de tipos TypeScript
│   │   └── index.ts           # Tipos de datos de Pokémon
│   └── styles/                # Estilos adicionales
├── public/                    # Assets públicos
├── next.config.ts             # Configuración de Next.js
└── ...                        # Archivos de configuración adicionales
```

## 💡 Uso

### Navegación Principal

- **Página Inicial**: Muestra un listado paginado de 20 Pokémon por defecto
- **Búsqueda**: Utiliza la barra de búsqueda para filtrar Pokémon por nombre
- **Detalles**: Haz clic en cualquier Pokémon para ver su información detallada

### Componentes Interactivos

1. **SearchBar**: Permite buscar Pokémon por nombre en tiempo real
2. **PokemonCard**: Tarjeta interactiva con imagen básica del Pokémon
3. **Pagination**: Navega entre las diferentes páginas de resultados
4. **PokemonGrid**: Muestra una cuadrícula responsiva de tarjetas de Pokémon

## 🌐 API

La aplicación utiliza la [PokéAPI](https://pokeapi.co/) para obtener los datos de los Pokémon. El cliente de API está centralizado en `src/lib/api.ts` y proporciona los siguientes métodos:

### Métodos Principales

- `getPokemonList(page, limit)`: Obtiene una lista paginada de Pokémon
- `searchPokemonByName(name)`: Busca Pokémon por nombre
- `getPokemonDetails(id)`: Obtiene detalles específicos de un Pokémon
- `getPokemonSpecies(id)`: Obtiene información de la especie del Pokémon
- `getPokemonWithSpecies(id)`: Combina detalles y especie en una sola llamada

### Ejemplo de Uso

```typescript
// Obtener la primera página de Pokémon
const { pokemons, pagination } = await pokemonAPI.getPokemonList(1, 20);

// Buscar Pokémon por nombre
const searchResults = await pokemonAPI.searchPokemonByName('pikachu');

// Obtener detalles completos de un Pokémon
const { details, species } = await pokemonAPI.getPokemonWithSpecies(25);
```

## 🧩 Componentes

### PokemonCard

Componente que muestra una tarjeta con información básica de un Pokémon:

```typescript
interface PokemonCardProps {
  pokemon: Pokemon;
  onClick?: () => void;
}
```

### PokemonGrid

Componente que renderiza una cuadrícula de tarjetas de Pokémon:

```typescript
interface PokemonGridProps {
  pokemons: Pokemon[];
  onPokemonClick: (pokemon: Pokemon) => void;
  isLoading: boolean;
}
```

### SearchBar

Componente para buscar Pokémon por nombre:

```typescript
interface SearchBarProps {
  onSearch: (query: string) => void;
}
```

### Pagination

Componente para navegar entre páginas de resultados:

```typescript
interface PaginationProps {
  pagination: PaginationInfo;
  currentPage: number;
  onPageChange: (page: number) => void;
}
```

## 🚀 Despliegue

### Build para Producción

```bash
npm run build
npm start
```

### Despliegue en Vercel

1. Conecta tu repositorio a Vercel
2. Configura las variables de entorno si es necesario
3. Despliega automáticamente

### Despliegue en Otras Plataformas

La aplicación es compatible con cualquier plataforma que soporte aplicaciones Next.js:

- Netlify
- Railway
- Heroku
- AWS Amplify

## 🔧 Configuración

### Configuración de Imágenes Externas

Para permitir imágenes de dominios externos como `raw.githubusercontent.com`, el archivo `next.config.ts` incluye:

```typescript
const nextConfig: NextConfig = {
  images: {
    domains: ["raw.githubusercontent.com"],
  },
};
```

## 🤝 Contribución

1. Haz un fork del proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 🐛 Solución de Problemas

### Imagen de Pokémon no carga

Si las imágenes de Pokémon no se cargan, verifica que el dominio `raw.githubusercontent.com` esté configurado en `next.config.ts`.

### Error de API

Si experimentas problemas con la API de Pokémon, verifica:
1. Conexión a internet
2. Disponibilidad de la PokeAPI
3. Límites de rate limiting de la API

### Problemas de TypeScript

Asegúrate de que todos los tipos estén correctamente importados desde `@/types`.

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo `LICENSE` para más información.

## 🙏 Agradecimientos

- A [PokeAPI](https://pokeapi.co/) por proporcionar la API gratuita de Pokémon
- Al equipo de [Next.js](https://nextjs.org/) por el increíble framework
- A los creadores de [Tailwind CSS](https://tailwindcss.com/) por las utilidades de CSS

## 📞 Contacto

Si tienes alguna pregunta o sugerencia, no dudes en contactarme:

- [Tu Nombre](mailto:tu-email@example.com)
- [GitHub](https://github.com/tu-usuario)
- [Twitter](https://twitter.com/tu-usuario)