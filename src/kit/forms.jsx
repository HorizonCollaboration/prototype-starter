// Fixed by Horizon: don't change this file. Horizon's own components, built on shadcn/ui for now.
import { useId } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select as UiSelect, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { cn } from '@/lib/utils';

function Labelled({ id, label, hint, error, children }) {
    return (
        <div className="flex flex-col gap-1.5">
            <Label htmlFor={id}>{label}</Label>
            {children}
            {hint && !error && (
                <p id={`${id}-hint`} className="text-sm text-muted-foreground">
                    {hint}
                </p>
            )}
            {error && (
                <p id={`${id}-error`} className="text-sm text-destructive">
                    {error}
                </p>
            )}
        </div>
    );
}

/** A labelled text box. Pass value and onChange (it hands back the text), plus type, placeholder and the like. */
export function Field({ label, hint, error, onChange, className, ...props }) {
    const id = useId();

    return (
        <Labelled id={id} label={label} hint={hint} error={error}>
            <Input
                {...props}
                id={id}
                aria-invalid={error ? true : undefined}
                aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
                onChange={(event) => onChange?.(event.target.value)}
                className={cn('max-md:h-11', className)}
            />
        </Labelled>
    );
}

/** A labelled box for longer text. onChange hands back the text. */
export function TextArea({ label, hint, error, onChange, ...props }) {
    const id = useId();

    return (
        <Labelled id={id} label={label} hint={hint} error={error}>
            <Textarea
                {...props}
                id={id}
                aria-invalid={error ? true : undefined}
                aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
                onChange={(event) => onChange?.(event.target.value)}
            />
        </Labelled>
    );
}

/**
 * Choose one from a list. options: [{ value, label }]. With label it's a
 * labelled field; without, give it ariaLabel (for a filter in a toolbar).
 */
export function Select({ label, ariaLabel, hint, value, onChange, options, placeholder, className }) {
    const id = useId();
    const select = (
        <UiSelect value={value} onValueChange={onChange}>
            <SelectTrigger id={id} aria-label={label ? undefined : ariaLabel} className={cn('w-full max-md:h-11! md:w-56', className)}>
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
                {options.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                        {option.label}
                    </SelectItem>
                ))}
            </SelectContent>
        </UiSelect>
    );

    return label ? (
        <Labelled id={id} label={label} hint={hint}>
            {select}
        </Labelled>
    ) : (
        select
    );
}

/** A few choices side by side, one picked, for filtering or switching a view. options: [{ value, label }]. */
export function Segmented({ value, onChange, options, ariaLabel }) {
    return (
        <ToggleGroup type="single" variant="outline" value={value} onValueChange={(next) => next && onChange(next)} aria-label={ariaLabel} className="w-fit">
            {options.map((option) => (
                <ToggleGroupItem key={option.value} value={option.value} className="max-md:h-11">
                    {option.label}
                </ToggleGroupItem>
            ))}
        </ToggleGroup>
    );
}
