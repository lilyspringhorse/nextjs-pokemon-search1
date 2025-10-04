'use client';

import { useState } from 'react';
import PokemonCard from '../components/PokemonCard';
import PokemonSearch from '../components/PokemonSearch';
import { Pokemon } from '@/types/pokemon';
import axios from 'axios';
import pokemonNames from '@/types/pokemonNames.json';

export default function Home() {
    // 検索されたポケモンの情報を状態として保持
    const [searchedPokemon, setSearchedPokemon] = useState<Pokemon | null>(
        null
    );
    // ページ内に表示するエラーメッセージ
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handleSearch = async (searchName: string) => {
        if (!searchName) {
            // 入力が空の場合は検索結果をクリア
            setSearchedPokemon(null);
            setErrorMessage(null);
            return;
        }

        // 日本語名を英語名に変換
        const enName = getEnName(searchName);
        if (!enName) {
            setErrorMessage('ポケモンの英語名が見つかりません');
            setSearchedPokemon(null);
            return;
        }

        try {
            const pokemon = await searchPokemon(searchName, enName);
            setSearchedPokemon(pokemon);
            setErrorMessage(null);
        } catch (error) {
            if (error instanceof Error) {
                setErrorMessage(error.message);
            } else {
                setErrorMessage('予期せぬエラーが発生しました');
            }
            setSearchedPokemon(null);
        }
    };

    const searchPokemon = async (
        jaName: string,
        enName: string
    ): Promise<Pokemon> => {
        try {
            const res = await axios.get(
                `https://pokeapi.co/api/v2/pokemon/${enName.toLowerCase()}`
            );
            const data = res.data;
            return {
                name: jaName,
                types: data.types.map(
                    (typeInfo: { type: { name: string } }) => typeInfo.type.name
                ),
                imageUrl: data.sprites.other['official-artwork'].front_default,
            };
        } catch (err: unknown) {
            // axios のレスポンスがあり 404 の場合は「見つかりません」エラーを投げる
            if (axios.isAxiosError(err) && err.response?.status === 404) {
                throw new Error('ポケモンが見つかりません');
            }
            throw err;
        }
    };

    const getEnName = (jaName: string) => {
        return (pokemonNames as Record<string, string>)[jaName];
    };

    return (
        <div className="min-h-screen p-8">
            <PokemonSearch onSearch={handleSearch} />
            {searchedPokemon && <PokemonCard pokemon={searchedPokemon} />}
            {errorMessage && (
                <div className="mb-4 text-red-600 font-medium">
                    {errorMessage}
                </div>
            )}
        </div>
    );
}
