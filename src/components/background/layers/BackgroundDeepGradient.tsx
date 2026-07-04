export default function BackgroundDeepGradient() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 -z-10"
      style={{
        background:
          'radial-gradient(1200px circle at 50% -10%, rgba(59,130,246,0.10), transparent 55%), radial-gradient(900px circle at 20% 110%, rgba(139,92,246,0.10), transparent 55%), linear-gradient(180deg, rgba(2,6,23,1) 0%, rgba(5,8,22,1) 45%, rgba(11,17,32,1) 100%)',
      }}
    />
  )
}
