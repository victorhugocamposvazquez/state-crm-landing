import { listings, euro } from "@/lib/script";

/** One readable notification, shared by desktop and mobile, after the skyline sequence. */
export function MobileListingCards({ visible }: { visible: boolean }) {
  const listing = listings[0];
  return (
    <div className="city-notification" data-visible={visible} aria-hidden={!visible} inert={!visible}>
      <article className="card">
        <div className="flex items-center gap-3 border-b border-grey3 pb-3">
          <span className="notification-icon" aria-hidden="true">↗</span>
          <div className="min-w-0 flex-1">
            <p className="m-0 text-[13px] font-medium text-white8">Nuevo anuncio detectado</p>
            <p className="m-0 mt-1 text-[12px] text-grey6">{listing.portal} · {listing.zone}</p>
          </div>
          <span className="st st-g">Particular</span>
        </div>
        <h3 className="mb-2 mt-4 text-[16px] font-medium leading-snug text-white8">{listing.title}</h3>
        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 text-[13px] text-grey6">
          <span className="text-[20px] font-medium tracking-tight text-white8">{euro(listing.price)}</span>
          <span>{listing.m2} m² · {listing.rooms} hab.</span>
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-grey3 pt-3 text-[12px] text-grey6">
          <span className="text-green">✓ Teléfono disponible</span><span>Asignado a Ana</span>
        </div>
      </article>
    </div>
  );
}
