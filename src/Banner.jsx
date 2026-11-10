// Fixed by Horizon: don't change this file.
import horizon from './horizon.json';

/** Says what this is, and where to suggest changes. Always shown. */
export default function Banner() {
    return (
        <div className="bg-amber-100 px-4 py-2 text-center text-sm text-amber-900">
            A prototype made together on Horizon. Sample data only: please don&apos;t enter real personal details.{' '}
            <a href={horizon.problemUrl} className="font-semibold underline">
                Suggest a change
            </a>
        </div>
    );
}
