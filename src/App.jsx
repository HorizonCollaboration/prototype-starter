import { CircleCheck, House, Sparkles } from 'lucide-react';
import { AppShell, Button, EmptyState, List, Row, ScreenHeader, Tag, Tile } from './kit/index.js';
import { items } from './sampleData.js';
import { useStoredState } from './storage.js';

export default function App() {
    const [tab, setTab] = useStoredState('tab', 'home');
    const [done, setDone] = useStoredState('done', []);

    const toggle = (id) => setDone(done.includes(id) ? done.filter((doneId) => doneId !== id) : [...done, id]);

    return (
        <AppShell name="Your prototype" icon={Sparkles} current={tab} onChange={setTab} tabs={[{ id: 'home', label: 'Home', icon: House }]}>
            <ScreenHeader icon={Sparkles} title="Your prototype goes here" description="Horizon replaces this screen with the first version of your prototype." />
            {items.length === 0 ? (
                <EmptyState title="Nothing yet" description="Sample items will show here." />
            ) : (
                <List>
                    {items.map((item) => (
                        <Row
                            key={item.id}
                            media={<Tile icon={CircleCheck} />}
                            title={item.title}
                            actions={
                                <Button size="sm" variant={done.includes(item.id) ? 'secondary' : 'outline'} onClick={() => toggle(item.id)}>
                                    {done.includes(item.id) ? 'Done' : 'Mark as done'}
                                </Button>
                            }
                        >
                            {done.includes(item.id) && <Tag tone="good">Done</Tag>}
                        </Row>
                    ))}
                </List>
            )}
        </AppShell>
    );
}
