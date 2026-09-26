import { motion } from "motion/react";
import { NavLink } from "react-router-dom";
import { NAV_ITEMS, navHref } from "@/app/navigation";
import { useAuth } from "@/features/auth";
import { useComposer } from "@/features/posts";
import { Icon } from "@/components/ui/Icon";
import styles from "./MobileNav.module.css";

const [home, search, notifications, profile] = NAV_ITEMS.filter((item) => item.mobile);

/** Bottom bar for phones: Home, Search, +, Notifications, Profile (UI/UX doc §4). */
export function MobileNav() {
  const { openComposer } = useComposer();

  return (
    <nav className={styles.bar} aria-label="Main">
      {[home, search].map((item) => (
        <Item key={item.to} {...item} />
      ))}
      <button type="button" className={styles.plus} onClick={() => openComposer()} aria-label="New post">
        <Icon name="plus" size={22} />
      </button>
      {[notifications, profile].map((item) => (
        <Item key={item.to} {...item} />
      ))}
    </nav>
  );
}

function Item(item: (typeof NAV_ITEMS)[number]) {
  const { user } = useAuth();
  const { icon, label, available } = item;
  const to = navHref(item, user?.username);

  if (!available) {
    return (
      <span className={`${styles.item} ${styles.disabled}`} aria-disabled="true" title={`${label} (soon)`}>
        <Icon name={icon} size={22} />
      </span>
    );
  }

  return (
    <NavLink to={to} end className={styles.item} aria-label={label}>
      {({ isActive }) => (
        <>
          {isActive && <motion.span layoutId="mobile-active" className={styles.dot} />}
          <Icon name={icon} size={22} />
        </>
      )}
    </NavLink>
  );
}
