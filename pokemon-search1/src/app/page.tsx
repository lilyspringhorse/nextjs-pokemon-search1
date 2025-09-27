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
