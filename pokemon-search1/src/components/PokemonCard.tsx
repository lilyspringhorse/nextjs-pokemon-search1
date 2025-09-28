import Image from 'next/image';

interface PokemonCardProps {
    name: string;
    types: string[];
    imageUrl: string;
}

export default function PokemonCard({
    name,
    types,
    imageUrl,
}: PokemonCardProps) {
    return (
        <div className="flex flex-col items-center p-6 rounded-xl shadow-lg bg-white w-96">
            <div className="text-2xl font-bold mb-2">{name}</div>
            <div className="text-sm text-gray-600 mb-4">{types.join(', ')}</div>
            <Image src={imageUrl} alt={name} width={200} height={200} />
        </div>
    );
}
