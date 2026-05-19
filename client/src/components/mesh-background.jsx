function MeshBackground() {
    return (
        <>
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    backgroundImage: "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
                    backgroundSize: "36px 36px",
                }}
            />

            <div
                className="absolute w-125 h-125 rounded-full pointer-events-none -bottom-30 -right-25"
                style={{ background: "radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 68%)" }}
            />

            <div
                className="absolute w-90 h-90 rounded-full pointer-events-none -top-20 -left-20"
                style={{ background: "radial-gradient(circle, rgba(99,102,241,0.10) 0%, transparent 68%)" }}
            />
        </>
    )
}

export default MeshBackground;
