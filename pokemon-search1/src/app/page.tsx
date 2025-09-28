import PokemonCard from '../components/PokemonCard';

export default function Home() {
    return (
        <div className="min-h-screen p-8">
            <PokemonCard
                name="ピカチュウ"
                types={['でんき']}
                imageUrl="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png"
            />
        </div>
    );
}
