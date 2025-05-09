export const getAvatarInitials = (email: string): string => {
  if (!email || typeof email !== "string") return "??";

  const localPart = email.split("@")[0];
  const cleaned = localPart.replace(/[^a-zA-Z0-9]/g, " ").trim();

  // Split by space or number (common for usernames like "john.doe99")
  const parts = cleaned.split(/[\s\d]+/).filter(Boolean);

  let initials = "";

  if (parts.length >= 2) {
    initials = parts[0][0] + parts[1][0];
  } else if (parts.length === 1) {
    initials = parts[0].slice(0, 2);
  }

  return initials.toUpperCase().padEnd(2, "?");
};
