type Event = {
  time: string;
  text: string;
};

const mockEvents: Event[] = [
  { time: "00:03", text: "Person detected near entrance" },
  { time: "00:07", text: "Door opened" },
  { time: "00:12", text: "Package placed on table" },
  { time: "00:20", text: "Person leaves room" },
  { time: "00:31", text: "Lights turned off" },
];

export default function TranscriptTimeline() {
  return (
    <div className="bg-white shadow-xl rounded-xl p-6 w-full max-w-xl">

      <h2 className="text-xl font-bold mb-6 text-gray-800">
        Transcript Timeline
      </h2>

      <div className="relative border-l-2 border-blue-300 ml-4">

        {mockEvents.map((event, index) => (
          <div key={index} className="mb-6 ml-6">

            {/* Timeline Dot */}
            <span className="absolute -left-2 flex items-center justify-center w-4 h-4 bg-blue-500 rounded-full"></span>

            <div className="bg-gray-50 p-4 rounded-lg shadow-sm hover:bg-blue-50 transition">

              <p className="text-sm text-blue-600 font-semibold">
                {event.time}
              </p>

              <p className="text-gray-700">
                {event.text}
              </p>

            </div>

          </div>
        ))}

      </div>
    </div>
  );
}