// instrument -> electric-guitar / electric-bass / acoustic-guitar / amps-effects
// id -> nft - id
// @todo if 0, redirect a explore page with error message
export default function InstrumentPage({
  params,
}: {
  params: { instrument: string; id: string };
}) {
  return (
    <div>
      <h1>Instrument Page</h1>
    </div>
  );
}
