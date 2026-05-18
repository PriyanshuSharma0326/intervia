const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const difficultyColor = {
    Easy: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
    Medium: "text-amber-400 bg-amber-400/10 border-amber-400/20",
    Hard: "text-rose-400 bg-rose-400/10 border-rose-400/20",
};

const scoreColor = (score) => {
    if (score >= 80) return "text-emerald-400";
    if (score >= 60) return "text-amber-400";
    return "text-rose-400";
};

const formatDate = (iso) => new Date(iso).toLocaleDateString("en-US", {
    day: "numeric", month: "short", year: "numeric"
});

const formatDuration = (start, end) => {
    if (!end) return "In progress";
    const mins = Math.round((new Date(end) - new Date(start)) / 60000);
    return `${mins}m`;
};

const greeting = () => {
    const h = new Date().getHours();
    if (h < 12) return "Good morning";
    if (h < 17) return "Good afternoon";
    return "Good evening";
};

const memberSince = (iso) => new Date(iso).toLocaleDateString("en-US", {
    month: "long", year: "numeric"
});

export {
    isValidEmail,
    difficultyColor,
    scoreColor,
    formatDate,
    formatDuration,
    greeting,
    memberSince,
}
