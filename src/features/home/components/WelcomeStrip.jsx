export default function WelcomeStrip() {
  return (
    <div className="bg-gradient-to-r from-green-600 to-green-400 text-white rounded-2xl p-4 sm:p-6">
      
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-xs opacity-80">Rabu, 9 Mei 2024</p>
          <h1 className="text-lg sm:text-2xl font-extrabold">
            Halo, Budi 👋
          </h1>
        </div>

        <div className="bg-white/20 px-3 py-2 rounded-xl text-center">
          <p>🔥</p>
          <p className="font-bold text-lg">7</p>
          <p className="text-xs">Hari</p>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-2 bg-white/10 p-2 rounded-lg text-center">
        {["KAM","JUM","SAB","MIN","SEN","SEL","RAB"].map((d,i)=>(
          <div key={i}>
            <p className="text-[10px]">{d}</p>
            <div className="w-5 h-5 sm:w-6 sm:h-6 bg-white rounded-full mx-auto mt-1"></div>
          </div>
        ))}
      </div>
    </div>
  );
}