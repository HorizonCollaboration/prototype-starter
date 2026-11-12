// Fixed by Horizon: don't change this file. Horizon's own components, built on shadcn/ui for now.
import { Badge } from '@/components/ui/badge';
import { Button as UiButton } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { QUIET_TILE, TAG_TONES } from './tones.js';

// The kit's names, plus the library's own (default, destructive, lg), which AI often reaches for.
const BUTTON_VARIANTS = { primary: 'default', default: 'default', secondary: 'secondary', outline: 'outline', ghost: 'ghost', danger: 'destructive', destructive: 'destructive', link: 'link' };
const BUTTON_SIZES = { sm: 'sm', md: 'lg', lg: 'lg', icon: 'icon-lg', 'icon-sm': 'icon-sm' };

/**
 * A button. variant: primary (one per screen, for the main action), secondary,
 * outline, ghost (quiet), danger, link. size: md (default), sm, icon, icon-sm.
 * Put a Lucide icon before the words when it helps. Always 44px tall on a phone.
 */
export function Button({ variant = 'outline', size = 'md', className, ...props }) {
    const isIcon = String(size ?? '').startsWith('icon');

    return (
        <UiButton
            variant={BUTTON_VARIANTS[variant] ?? 'outline'}
            size={BUTTON_SIZES[size] ?? 'lg'}
            // A link is always underlined, so it reads as one in black and white, and on a phone without hover.
            className={cn(isIcon ? 'max-md:size-11' : 'max-md:h-11 max-md:px-4', variant === 'link' && 'underline', className)}
            {...props}
        />
    );
}

/**
 * A picture for a thing: a grey Lucide icon on a quiet white tile. Give each
 * kind of thing its own icon, the same everywhere. tone is accepted from the
 * first kit, but doesn't change it: colour is only for what things mean.
 */
export function Tile({ icon: Icon, size = 'md' }) {
    const box = { sm: 'size-8 rounded-lg', md: 'size-10 rounded-xl', lg: 'size-12 rounded-2xl' }[size] ?? 'size-10 rounded-xl';
    const glyph = { sm: 'size-4', md: 'size-5', lg: 'size-6' }[size] ?? 'size-5';

    return (
        <span className={cn('flex shrink-0 items-center justify-center', box, QUIET_TILE)}>
            {Icon && <Icon className={glyph} strokeWidth={1.75} aria-hidden="true" />}
        </span>
    );
}

/**
 * A small tag for a state, in words, with a coloured dot for its meaning.
 * tone: neutral (default), primary, urgent, warning, good, info. A neutral tag
 * has no dot unless dot is set. icon adds a Lucide icon.
 */
export function Tag({ tone = 'neutral', dot = false, icon: Icon, children }) {
    const colours = TAG_TONES[tone] ?? TAG_TONES.neutral;
    // The dot carries the meaning, so a tag with a meaning always has one.
    const showDot = dot || tone !== 'neutral';

    return (
        <Badge className={cn('font-normal', colours.tag)}>
            {showDot && <span className={cn('size-2 rounded-full', colours.dot)} aria-hidden="true" />}
            {Icon && <Icon aria-hidden="true" />}
            {children}
        </Badge>
    );
}

/** A big number with a label, for a summary at the top of a screen. icon, if given, sits quietly beside the label. */
export function Stat({ label, value, icon: Icon, hint }) {
    return (
        <div className="flex min-w-0 flex-col gap-1 rounded-xl border p-3 sm:p-4">
            <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                {Icon && <Icon className="size-3.5 shrink-0 max-sm:hidden" strokeWidth={1.75} aria-hidden="true" />}
                {label}
            </span>
            <span className="text-2xl font-semibold tracking-tight tabular-nums">{value}</span>
            {hint && <span className="text-xs text-muted-foreground">{hint}</span>}
        </div>
    );
}
