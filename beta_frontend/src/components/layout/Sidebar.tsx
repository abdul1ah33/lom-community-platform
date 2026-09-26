import { motion } from "motion/react";
import { NavLink } from "react-router-dom";
import { NAV_ITEMS } from "@/app/navigation";
import { ArcaneSigil } from "@/components/effects/ArcaneSigil";
import { Avatar } from "@/components/ui/Avatar";
import { Icon } from "@/components/ui/Icon";
import { useAuth } from "@/features/auth";
import styles from "./Sidebar.module.css";

interface SidebarProps {
  onLogout: () => void;
  loggingOut: boolean;
}

export function Sidebar({ onLogout, loggingOut }: SidebarProps) {
  const { user } = useAuth();

  return (
    <motion.aside
      className={styles.sidebar}
      initial={{ x: -40, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className={styles.brand}>
        <ArcaneSigil size={40} />
        <div>
          <strong className={styles.brandName}>LOM</strong>
          <span className={styles.brandTag}>Above the Gray Fog</span>
        </div>
      </div>

      <nav aria-label="Main">
        <ul className={styles.nav}>
          {NAV_ITEMS.map((item, index) => (
            <motion.li
              key={item.to}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 + index * 0.05 }}
            >
              {item.available ? (
                <NavLink to={item.to} end className={styles.link}>
                  {({ isActive }) => (
                    <>
                      {isActive && (
                        <motion.span
                          layoutId="sidebar-active"
                          className={styles.active}
                          transition={{ type: "spring", stiffness: 380, damping: 32 }}
                        />
                      )}
                      <Icon name={item.icon} className={styles.icon} />
                      <span className={styles.label}>{item.label}</span>
                    </>
                  )}
                </NavLink>
              ) : (
                <span className={`${styles.link} ${styles.disabled}`} aria-disabled="true">
                  <Icon name={item.icon} className={styles.icon} />
                  <span className={styles.label}>{item.label}</span>
                  <span className={styles.soon}>Soon</span>
                </span>
              )}
            </motion.li>
          ))}
        </ul>
      </nav>

      <button type="button" className={styles.compose} disabled title="Posting arrives with the Posts module">
        <Icon name="plus" size={18} />
        <span>New post</span>
      </button>

      {user && (
        <div className={styles.account}>
          <Avatar name={user.username} src={user.avatar_url} size={38} ring />
          <div className={styles.accountText}>
            <strong>{user.username}</strong>
            <span>{user.email}</span>
          </div>
          <button
            type="button"
            className={styles.logout}
            onClick={onLogout}
            disabled={loggingOut}
            aria-label="Log out"
            title="Log out"
          >
            <Icon name="logout" size={18} />
          </button>
        </div>
      )}
    </motion.aside>
  );
}
