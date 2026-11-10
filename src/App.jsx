import { items } from './sampleData.js';
import { useStoredState } from './storage.js';

export default function App() {
    const [done, setDone] = useStoredState('done', []);

    return (
        <main className="mx-auto max-w-3xl px-4 py-8">
            <h1 className="text-3xl font-bold">Your prototype goes here</h1>
            <p className="mt-2 text-stone-600">Horizon replaces this page with the first version of your prototype.</p>
            <ul className="mt-6 space-y-2">
                {items.map((item) => (
                    <li key={item.id} className="flex items-center gap-3 rounded-lg bg-white p-4 shadow-sm">
                        <input
                            type="checkbox"
                            checked={done.includes(item.id)}
                            onChange={() =>
                                setDone(done.includes(item.id) ? done.filter((id) => id !== item.id) : [...done, item.id])
                            }
                        />
                        {item.title}
                    </li>
                ))}
            </ul>
        </main>
    );
}
