import { Pokemon } from '@/types/pokemon';
import Image from 'next/image';

interface PokemonCardProps {
    pokemon: Pokemon;
}

export default function PokemonCard({ pokemon }: PokemonCardProps) {
    return (
        <div className="flex flex-col items-center p-6 rounded-xl shadow-lg bg-white w-96">
            <div className="text-2xl font-bold mb-2">{pokemon.name}</div>
            <div className="text-sm text-gray-600 mb-4">
                {pokemon.types.join(', ')}
            </div>
            <Image
                src={pokemon.imageUrl}
                alt={pokemon.name}
                width={200}
                height={200}
            />
        </div>
    );
}
