export const AVATAR_COLORS = [
  {
    bg: "bg-red-100",
    text: "text-red-700",
  },
  {
    bg: "bg-orange-100",
    text: "text-orange-700",
  },
  {
    bg: "bg-amber-100",
    text: "text-amber-700",
  },
  {
    bg: "bg-yellow-100",
    text: "text-yellow-700",
  },
  {
    bg: "bg-lime-100",
    text: "text-lime-700",
  },
  {
    bg: "bg-green-100",
    text: "text-green-700",
  },
  {
    bg: "bg-emerald-100",
    text: "text-emerald-700",
  },
  {
    bg: "bg-teal-100",
    text: "text-teal-700",
  },
  {
    bg: "bg-cyan-100",
    text: "text-cyan-700",
  },
  {
    bg: "bg-sky-100",
    text: "text-sky-700",
  },
  {
    bg: "bg-blue-100",
    text: "text-blue-700",
  },
  {
    bg: "bg-indigo-100",
    text: "text-indigo-700",
  },
  {
    bg: "bg-violet-100",
    text: "text-violet-700",
  },
  {
    bg: "bg-purple-100",
    text: "text-purple-700",
  },
  {
    bg: "bg-pink-100",
    text: "text-pink-700",
  },
]

export function getAvatarColor(seed: string) {
  let hash = 0

  for (let i = 0; i < seed.length; i++) {
    hash = seed.charCodeAt(i) + ((hash << 5) - hash)
  }

  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length]
}

export function getAvatarInitials(name: string, maxLength = 2): string {
  const words = name.trim().split(/\s+/).filter(Boolean)

  if (!words.length) {
    return "?"
  }

  // One word → first 1 or 2 characters
  if (words.length === 1) {
    return words[0].slice(0, maxLength).toUpperCase()
  }

  // Multiple words → first letter of first & last word
  return `${words[0][0]}${words[words.length - 1][0]}`
    .slice(0, maxLength)
    .toUpperCase()
}

export function getAvatarClass(seed: string): string {
  const { bg, text } = getAvatarColor(seed);

  return `${bg} ${text} font-semibold select-none`;
}