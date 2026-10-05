"use client";

import { useEffect, useState } from "react";
import { useScroll } from "@/lib/store";
import { cityPhoto, listings, euro } from "@/lib/script";
import { revealAt } from "@/components/canvas/CityPhoto";

/**
 * En móvil las tarjetas de la ciudad no cuelgan del edificio (no caben): entran desde abajo
 * y se apilan como notificaciones, una visible y la anterior detrás, atenuada.
 */
export function MobileListingCards() {
  const [idx, setIdx] = useState(-1);
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const apply = () => {
      const s = useScroll.getState();
      setMobile(s.isMobile);
      const p = s.onScreen.ciudad ? s.progress.ciudad : 0;
      let i = -1;
      cityPhoto.anchors.forEach((_, k) => {
        if (p >= revealAt(k)) i = k;
      });
      if (p > 0.9) i = -1;
      setIdx(i);
    };
    apply();
    return useScroll.subscribe(apply);
  }, []);

  if (!mobile || idx < 0) return null;
  const show = [idx - 1, idx].filter((k) => k >= 0);

  return (
    <div className="absolute inset-x-0 bottom-24 md:hidden" aria-live="polite">
      {show.map((k) => {
        const l = listings[cityPhoto.anchors[k].listing];
        const color = l.kind === "particular" ? "#22C55E" : l.kind === "encubierta" ? "#D4A017" : "#FFFFFF";
        const top = k === idx;
        return (
          <div
            key={l.id}
            className="card absolute inset-x-0 bottom-0 flex flex-col gap-[7px] px-4 py-[13px]"
            style={{
              borderColor: top && k === 0 ? color : top ? "#3A3A3A" : "#262626",
              opacity: top ? 1 : 0.45,
              transform: top ? "none" : "scale(.94) translateY(-14px)",
              transition: "opacity .35s, transform .35s",
            }}
          >
            <div className="mono flex items-center justify-between text-[13px] text-grey6">
              <span>hace {1 + k * 3} min · {l.portal}</span>
              <span className={`st ${l.kind === "particular" ? "st-g" : l.kind === "encubierta" ? "st-a" : "st-n"}`}>
                {l.kind === "particular" ? "● particular · tel." : l.kind === "encubierta" ? "● agencia encubierta" : "agencia"}
              </span>
            </div>
            <div className="text-[15px] font-medium text-white8">{l.title}</div>
            <div className="flex gap-[10px] text-[12px] text-grey6">
              <span>
                <b className="font-medium text-white8">{l.m2}</b> m²
              </span>
              <span>
                <b className="font-medium text-white8">{l.rooms}</b> hab
              </span>
              <span>
                <b className="font-medium text-white8">{l.baths}</b> baños
              </span>
              <span>
                <b className="font-medium text-white8">{euro(l.price)}</b>
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
