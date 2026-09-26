import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { useToast } from "@/components/feedback/ToastProvider";
import { Icon } from "@/components/ui/Icon";
import { ApiError } from "@/lib/http/ApiError";
import { useFollow } from "../hooks/useProfile";
import styles from "./FollowButton.module.css";

interface FollowButtonProps {
  username: string;
  following: boolean;
  compact?: boolean;
}

/** Follow toggle. When following, hovering reveals "Unfollow". */
export function FollowButton({ username, following: serverFollowing, compact = false }: FollowButtonProps) {
  const follow = useFollow(username);
  const { notify } = useToast();
  const [hovered, setHovered] = useState(false);
  // Local override so the button flips instantly, even where the list data refetches later.
  const [override, setOverride] = useState<boolean | null>(null);
  useEffect(() => setOverride(null), [serverFollowing]);
  const following = override ?? serverFollowing;

  const label = following ? (hovered ? "Unfollow" : "Following") : "Follow";

  const toggle = () => {
    const next = !following;
    setOverride(next);
    setHovered(false); // don't greet a fresh follow with "Unfollow" under the cursor
    follow.mutate(next, {
      onError: (error) => {
        setOverride(null);
        notify(error instanceof ApiError ? error.message : "Could not update follow status.", "error");
      },
    });
  };

  return (
    <motion.button
      type="button"
      className={`${styles.button} ${following ? styles.following : styles.idle} ${compact ? styles.compact : ""}`}
      onClick={toggle}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileTap={{ scale: 0.94 }}
      layout
      aria-pressed={following}
      aria-label={following ? `Unfollow ${username}` : `Follow ${username}`}
    >
      {!following && <Icon name="userPlus" size={compact ? 15 : 17} />}
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={label}
          initial={{ y: 12, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -12, opacity: 0 }}
          transition={{ duration: 0.18 }}
        >
          {label}
        </motion.span>
      </AnimatePresence>
    </motion.button>
  );
}
