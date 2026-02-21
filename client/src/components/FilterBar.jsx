const filters = [
    { label: 'All', value: '' },
    { label: 'Pending', value: 'pending' },
    { label: 'Completed', value: 'completed' },
];

function FilterBar({ active, onChange }) {
    return (
        <div className="flex gap-1.5 my-5">
            {filters.map((f) => (
                <button
                    key={f.value}
                    id={`filter-${f.label.toLowerCase()}`}
                    className={`flex-1 py-2 border rounded-xl font-medium text-sm font-sans transition-all duration-200 cursor-pointer ${active === f.value
                            ? 'bg-accent/[0.12] border-accent/30 text-accent'
                            : 'bg-surface border-border text-muted hover:bg-surface-hover hover:text-text'
                        }`}
                    onClick={() => onChange(f.value)}
                >
                    {f.label}
                </button>
            ))}
        </div>
    );
}

export default FilterBar;
