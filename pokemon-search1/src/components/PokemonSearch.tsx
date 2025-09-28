'use client';

import { useState } from 'react';

interface PokemonSearchProps {
    onSearch: (pokemonName: string) => void;
}

export default function PokemonSearch({ onSearch }: PokemonSearchProps) {
    const [searchName, setSearchName] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSearch(searchName);
    };

    return (
        <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
            <input
                type="text"
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
                placeholder="ポケモン名を入力"
                className="px-4 py-2 border rounded-lg max-w-96"
            />
            <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
                検索
            </button>
        </form>
    );
}
