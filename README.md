# pokemon-search1

本プロジェクトは Next.js を使って簡単なウェブアプリケーションを作ってみるチュートリアルです。

バックエンドには [PokeAPI](https://pokeapi.co/) を使用します。

## 準備

下記をインストールしておいてください

-   Node.js 18.18 以降

## STEP1: アプリケーションの作成

ターミナルから下記コマンドを実行し、Next.js アプリケーションを作成します。

```
npx create-next-app@latest pokemon-search1 --ts --tailwind --eslint --src-dir --app --import-alias '@/*' --turbopack
```

`npx create-next-app@latest`で対話型でオプションを指定することも可能ですが、コマンドラインのオプションで下記のような指定を行っています。

-   ts: TypeScript を使用
-   tailwind: CSS のフレームワークに [TailWind CSS](https://tailwindcss.com/) を使用
-   eslint: 静的解析に [ESLint](https://eslint.org/) を使用
-   src-dir: コードを src フォルダ下に格納
-   app: Next.js のルーティングに App Router を使用
-   import-alias: import に @ などの alias を使用可能とする
-   turbopack: バンドラーに Turbopack を使用

pokemon-search1 フォルダ下にアプリケーションが作成されます。
pokemon-search1 フォルダ下に移動し、アプリケーションを起動します。

```
cd pokemon-search1
npm run dev
```

起動後、ブラウザで http://localhost:3000 にアクセスすると下記のようなページが表示されます。

<img src="images/step1.png" width="240"/>

## STEP2: ポケモンの表示

トップページにポケモンを表示してみましょう。

page.tsx の内容を下記のように変更します。

```typescript
import Image from 'next/image';

export default function Home() {
    return (
        <div className="min-h-screen p-8">
            <div>
                <div>ピカチュウ</div>
                <div>でんき</div>
                <Image
                    src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png"
                    alt="ピカチュウ"
                    width={200}
                    height={200}
                />
            </div>
        </div>
    );
}
```

next/image コンポーネントに使用するホストとして `https://raw.githubusercontent.com` を追加します。

```
const nextConfig: NextConfig = {
    images: {
        remotePatterns: [new URL('https://raw.githubusercontent.com/**')],
    },
};
```

ブラウザでポケモンの名称、タイプ、画像が表示されていることを確認してください。
