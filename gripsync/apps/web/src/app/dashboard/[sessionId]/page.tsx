export default function SessionDetail({ params }: { params: { sessionId: string } }) {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Session Details</h1>
      <p className="text-slate-400">Detailed breakdown of analysis session: {params.sessionId}</p>
      {/* Detail components would go here. Re-using dashboard components mostly. */}
    </div>
  )
}
