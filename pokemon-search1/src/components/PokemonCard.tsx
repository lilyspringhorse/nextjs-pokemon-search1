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
        <div>
            <div>{name}</div>
            <div>{types.join(', ')}</div>
            <Image src={imageUrl} alt={name} width={200} height={200} />
        </div>
    );
}
