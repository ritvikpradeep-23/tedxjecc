// Shared row for every seat in the Meet the Team roster — Tier 1 leadership
// and every Tier 2/3 head/member. "Filled" is derived from the one field
// people are already told to edit (see comments in siteData.js), so it
// can't drift out of sync with a separately-set flag.
export default function TeamRoleRow({ person, role, onOpen }) {
  const filled = person.name !== "TBD";
  const hasPhoto = filled && Boolean(person.photo);

  const rowContent = (
    <>
      {hasPhoto && (
        <img
          src={person.photo}
          alt={`Portrait of ${person.name}`}
          className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover shrink-0"
        />
      )}
      <div className="flex-1 min-w-0 text-left">
        {filled ? (
          <>
            <p className="font-semibold text-white text-sm sm:text-base truncate">{person.name}</p>
            <p className="text-white/50 text-xs sm:text-sm mt-0.5 truncate">{role}</p>
          </>
        ) : (
          <p className="text-white/80 text-sm sm:text-base truncate">{role}</p>
        )}
      </div>
      <span
        className={
          filled
            ? "shrink-0 text-[10px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-full bg-green-600 text-white"
            : "shrink-0 text-[10px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-full border border-tedx-red text-tedx-red"
        }
      >
        {filled ? "Confirmed" : "Open"}
      </span>
    </>
  );

  if (!filled) {
    return <div className="flex items-center gap-4 py-3.5">{rowContent}</div>;
  }

  return (
    <button
      type="button"
      onClick={() => onOpen(person)}
      className="w-full flex items-center gap-4 py-3.5 text-left hover:bg-white/5 transition-colors duration-200 cursor-pointer rounded-lg px-2 -mx-2"
    >
      {rowContent}
    </button>
  );
}
