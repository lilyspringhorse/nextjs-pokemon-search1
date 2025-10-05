'use client';

import { useState } from 'react';
import PokemonCard from '../components/PokemonCard';
import PokemonSearch from '../components/PokemonSearch';
import { Pokemon } from '@/types/pokemon';
import axios from 'axios';
import pokemonNames from '@/types/pokemonNames.json';

export default function Home() {
    // 検索されたポケモンの情報を状態として保持（複数対応）
    const [searchedPokemons, setSearchedPokemons] = useState<Pokemon[]>([]);
    // ページ内に表示するエラーメッセージ
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    // 日本語名/英語名ペアの型
    type Candidate = { ja: string; en: string };

    const handleSearch = async (searchName: string) => {
        if (!searchName) {
            // 入力が空の場合は検索結果をクリア
            setSearchedPokemons([]);
            setErrorMessage(null);
            return;
        }

        // 日本語名を英語名に変換（完全一致がなければ前方一致でヒットするものを全件取得）
        const candidates: Candidate[] = getCandidates(searchName);
        if (candidates.length === 0) {
            setErrorMessage('ポケモンの英語名が見つかりません');
            setSearchedPokemons([]);
            return;
        }

        try {
            // 各候補について API を並列実行。
            const pokemons: Pokemon[] = [];
            await Promise.all(
                candidates.map(async ({ ja, en }) => {
                    const pokemon = await searchPokemon(ja, en);
                    pokemons.push(pokemon);
                })
            );
            if (pokemons.length === 0) {
                // 全件失敗
                setErrorMessage('ポケモンが見つかりません');
                setSearchedPokemons([]);
                return;
            }
            setSearchedPokemons(pokemons);
            setErrorMessage(null);
        } catch (error) {
            if (error instanceof Error) {
                setErrorMessage(error.message);
            } else {
                setErrorMessage('予期せぬエラーが発生しました');
            }
            setSearchedPokemons([]);
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

    // 指定された日本語名に対して、完全一致があればそれを最優先で返す。
    // 完全一致がなければ、前方一致でヒットするすべての (ja, en) ペアを返す。
    const getCandidates = (jaName: string): Candidate[] => {
        const map = pokemonNames as Record<string, string>;
        // 完全一致チェック
        const exact = map[jaName];
        if (exact) return [{ ja: jaName, en: exact }];

        // 前方一致 (startsWith) で候補を収集
        const candidates: { ja: string; en: string }[] = [];
        const needle = jaName;
        for (const key of Object.keys(map)) {
            if (key.startsWith(needle)) {
                candidates.push({ ja: key, en: map[key] });
            }
        }
        return candidates;
    };

    return (
        <div className="min-h-screen p-8">
            <PokemonSearch onSearch={handleSearch} />
            {searchedPokemons.length > 0 && (
                <div className="flex flex-wrap gap-4 mb-4">
                    {searchedPokemons.map((p) => (
                        <PokemonCard key={p.name + p.imageUrl} pokemon={p} />
                    ))}
                </div>
            )}
            {errorMessage && (
                <div className="mb-4 text-red-600 font-medium">
                    {errorMessage}
                </div>
            )}
        </div>
    );
}
