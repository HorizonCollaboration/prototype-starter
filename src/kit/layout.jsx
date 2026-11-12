// Fixed by Horizon: don't change this file. Horizon's own components, built on shadcn/ui for now.
import { ArrowLeft, CircleAlert, CircleCheck, X } from 'lucide-react';
import { Card as UiCard, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@/components/ui/empty';
import { Item, ItemActions, ItemContent, ItemDescription, ItemGroup, ItemMedia, ItemSeparator, ItemTitle } from '@/components/ui/item';
import { cn } from '@/lib/utils';
import { Button, Tile } from './basics.jsx';

/**
 * The top of a screen: its picture tile, title and one sentence saying what
 * it's for, with the one main action on the right. back: { label, onClick }
 * shows a way back above it.
 */
export function ScreenHeader({ icon, tone = 'primary', title, description, action, back }) {
    return (
        <header className="flex flex-col gap-4">
            {back && (
                <Button variant="ghost" size="sm" className="-ml-2 w-fit" onClick={back.onClick}>
                    <ArrowLeft aria-hidden="true" />
                    {back.label}
                </Button>
            )}
            <div className="flex flex-wrap items-end justify-between gap-4">
                <div className="flex flex-col gap-3">
                    {icon && <Tile icon={icon} tone={tone} size="lg" />}
                    <h1 className="text-3xl font-semibold tracking-tight">{title}</h1>
                    {description && <p className="max-w-xl text-muted-foreground">{description}</p>}
                </div>
                {action}
            </div>
        </header>
    );
}

/** A titled part of a screen. */
export function Section({ title, description, action, children }) {
    return (
        <section className="flex flex-col gap-3">
            {(title || action) && (
                <div className="flex flex-wrap items-end justify-between gap-2">
                    <div>
                        {title && <h2 className="text-sm font-medium tracking-wide text-muted-foreground uppercase">{title}</h2>}
                        {description && <p className="text-sm text-muted-foreground">{description}</p>}
                    </div>
                    {action}
                </div>
            )}
            {children}
        </section>
    );
}

/** A box for a few related things. Use List for lists, not a stack of cards. */
export function Card({ title, description, action, footer, children, className }) {
    return (
        <UiCard className={className}>
            {(title || description) && (
                <CardHeader>
                    {title && <CardTitle>{title}</CardTitle>}
                    {description && <CardDescription>{description}</CardDescription>}
                    {action && <CardAction>{action}</CardAction>}
                </CardHeader>
            )}
            {children && <CardContent>{children}</CardContent>}
            {footer && <CardFooter>{footer}</CardFooter>}
        </UiCard>
    );
}

/** A list of rows, with hairlines between them. framed gives it its own rounded border; leave it off inside a Card. */
export function List({ children, framed = true }) {
    const rows = [children].flat(Infinity).filter(Boolean);

    if (rows.length === 0) {
        return null;
    }

    return (
        <ItemGroup className={cn(framed && 'rounded-2xl border')}>
            {rows.map((row, index) => (
                <div key={row?.key ?? index} role="listitem">
                    {index > 0 && <ItemSeparator />}
                    {row}
                </div>
            ))}
        </ItemGroup>
    );
}

/**
 * One thing in a List: a picture (usually a Tile), a title, a muted line under
 * it, anything else under that (tags), and actions at the end. onClick makes
 * the title a button that opens the thing.
 */
export function Row({ media, title, description, children, actions, onClick, compact = false }) {
    // With onClick, the whole row opens the thing (its title is the button, stretched over the row), while its actions stay on top.
    return (
        <Item size={compact ? 'sm' : 'default'} className={cn(onClick && 'relative hover:bg-muted/50')}>
            {media && <ItemMedia>{media}</ItemMedia>}
            <ItemContent>
                <ItemTitle>
                    {onClick ? (
                        <button type="button" className="text-left after:absolute after:inset-0 after:content-['']" onClick={onClick}>
                            {title}
                        </button>
                    ) : (
                        title
                    )}
                </ItemTitle>
                {description && <ItemDescription>{description}</ItemDescription>}
                {children && <div className="relative z-10 flex flex-wrap gap-1.5 pt-1">{children}</div>}
            </ItemContent>
            {actions && <ItemActions className="relative z-10">{actions}</ItemActions>}
        </Item>
    );
}

/** What a screen shows when there's nothing yet: a picture, a short title, one helpful sentence and what to do next. */
export function EmptyState({ icon: Icon, title, description, action }) {
    return (
        <Empty className="rounded-2xl bg-muted/50">
            <EmptyHeader>
                {Icon && (
                    <EmptyMedia variant="icon">
                        <Icon aria-hidden="true" />
                    </EmptyMedia>
                )}
                <EmptyTitle>{title}</EmptyTitle>
                {description && <EmptyDescription>{description}</EmptyDescription>}
            </EmptyHeader>
            {action && <EmptyContent>{action}</EmptyContent>}
        </Empty>
    );
}

/**
 * A short message that something happened, floating near the bottom. Keep the
 * message in state, show it after an action, and clear it with onClose (or
 * after a few seconds). tone: good (default) or problem.
 */
export function Notice({ message, onClose, tone = 'good' }) {
    const Icon = tone === 'problem' ? CircleAlert : CircleCheck;

    return (
        <div role="status" aria-live="polite" className="pointer-events-none fixed inset-x-0 bottom-24 z-30 flex justify-center px-4 md:bottom-6">
            {message && (
                <div className="pointer-events-auto flex max-w-md items-center gap-3 rounded-xl border bg-background py-2.5 pr-2 pl-4 text-sm shadow-lg animate-in fade-in slide-in-from-bottom-2">
                    <Icon className={cn('size-4 shrink-0', tone === 'problem' ? 'text-destructive' : 'text-emerald-600')} aria-hidden="true" />
                    <span>{message}</span>
                    {onClose && (
                        <Button variant="ghost" size="icon-sm" onClick={onClose} aria-label="Close">
                            <X aria-hidden="true" />
                        </Button>
                    )}
                </div>
            )}
        </div>
    );
}
