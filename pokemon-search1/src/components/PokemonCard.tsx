import { Pokemon } from '@/types/pokemon';
import Image from 'next/image';
import typeNames from '@/types/typeNames.json';

interface PokemonCardProps {
    pokemon: Pokemon;
}

const translateTypes = (types: string[]) => {
    return types
        .map((t) => {
            const key = t.toLowerCase();
            return (typeNames as Record<string, string>)[key] ?? 'ふめい';
        })
        .join('、');
};

export default function PokemonCard({ pokemon }: PokemonCardProps) {
    return (
        <div className="flex flex-col items-center p-6 rounded-xl shadow-lg bg-white w-96">
            <div className="text-2xl font-bold mb-2">{pokemon.name}</div>
            <div className="text-sm text-gray-600 mb-4">
                {translateTypes(pokemon.types)}
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
