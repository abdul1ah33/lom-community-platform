import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { NAV_ITEMS, navHref, type NavItem } from "@/app/navigation";
import { Icon } from "@/components/ui/Icon";
import { useAuth } from "@/features/auth";
import { useComposer } from "@/features/posts";
import styles from "./MobileNav.module.css";

const [home, wiki, summaries] = NAV_ITEMS.filter((item) => item.mobile);

/** Everything without a bar slot, with the screens that work listed before the "soon" ones. */
const MORE_ITEMS = NAV_ITEMS.filter((item) => !item.mobile).sort((a, b) => Number(b.available) - Number(a.available));

interface MobileNavProps {
  onLogout: () => void;
  loggingOut: boolean;
}

/** Bottom bar for phones: Home, Wiki, +, Summaries, More. "More" opens a sheet with the rest. */
export function MobileNav({ onLogout, loggingOut }: MobileNavProps) {
  const { user } = useAuth();
  const { openComposer } = useComposer();
  const { pathname } = useLocation();
  const [moreOpen, setMoreOpen] = useState(false);
  const moreButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => setMoreOpen(false), [pathname]);

  useEffect(() => {
    if (!moreOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setMoreOpen(false);
      moreButtonRef.current?.focus();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [moreOpen]);

  const moreIsCurrent = MORE_ITEMS.some((item) => {
    const to = navHref(item, user?.username);
    return item.available && (pathname === to || pathname.startsWith(`${to}/`));
  });

  return (
    <>
      <AnimatePresence>
        {moreOpen && (
          <>
            <motion.div
              className={styles.scrim}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.16 }}
              onClick={() => setMoreOpen(false)}
            />
            <motion.div
              id="mobile-more"
              className={styles.sheet}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              transition={{ duration: 0.16, ease: "easeOut" }}
            >
              <ul className={styles.sheetList}>
                {MORE_ITEMS.map((item) => (
                  <li key={item.to}>
                    {item.available ? (
                      <NavLink
                        to={navHref(item, user?.username)}
                        className={styles.sheetItem}
                        onClick={() => setMoreOpen(false)}
                      >
                        <Icon name={item.icon} size={20} />
                        {item.label}
                      </NavLink>
                    ) : (
                      <span className={`${styles.sheetItem} ${styles.disabled}`} aria-disabled="true">
                        <Icon name={item.icon} size={20} />
                        {item.label}
                        <span className={styles.soon}>Soon</span>
                      </span>
                    )}
                  </li>
                ))}
                <li className={styles.sheetDivider}>
                  <button type="button" className={styles.sheetItem} onClick={onLogout} disabled={loggingOut}>
                    <Icon name="logout" size={20} />
                    Log out
                  </button>
                </li>
              </ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <nav className={styles.bar} aria-label="Main">
        <BarLink item={home} />
        <BarLink item={wiki} />
        <button type="button" className={styles.plus} onClick={() => openComposer()} aria-label="New post">
          <Icon name="plus" size={22} />
        </button>
        <BarLink item={summaries} />
        <button
          ref={moreButtonRef}
          type="button"
          className={`${styles.item} ${moreIsCurrent || moreOpen ? styles.current : ""}`}
          onClick={() => setMoreOpen((open) => !open)}
          aria-expanded={moreOpen}
          aria-controls="mobile-more"
        >
          <Icon name="more" size={22} />
          <span className={styles.label}>More</span>
        </button>
      </nav>
    </>
  );
}

function BarLink({ item }: { item: NavItem }) {
  return (
    <NavLink to={item.to} end={item.to === "/"} className={styles.item}>
      <Icon name={item.icon} size={22} />
      <span className={styles.label}>{item.label}</span>
    </NavLink>
  );
}
