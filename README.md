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

pokemon-seartch1 フォルダ下にアプリケーションが作成されます。
pokemon-seartch1 フォルダ下に移動し、アプリケーションを起動します。

```
cd pokemon-seartch1
npm run dev
```

起動後、ブラウザで http://localhost:3000 にアクセスすると下記のようなページが表示されます。

<img src="images/step1.png" width="240"/>
