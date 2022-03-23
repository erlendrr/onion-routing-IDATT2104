import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';

const Hello = () => {
  return (
    <div className="min-h-screen bg-gray-200">
      <div className="container mx-auto p-8 md:py-8 md:px-16 space-y-8">
        <section className="space-y-2">
          <h1 className="text-center text-4xl font-bold">Onion Routing</h1>
          <p className="text-center">
            By <i>Erlend Ryan</i> & <i>Erlend Matre</i>
          </p>
        </section>
        <section className="grid grid-cols-2 gap-4 rounded-md">
          <div className="grid grid-cols-4 gap-4">
            <div className="col-start-1 col-span-3 md:col-span-2">
              <p>IP</p>
              <input className="shadow-lg w-full" type="text" id="ip" />
            </div>
            <div className="col-start-1 col-span-2 md:col-start-auto md:col-span-1">
              <p>Port</p>
              <input className="shadow-lg w-full" type="number" id="port" />
            </div>
            <button
              type="button"
              className="bg-gray-800 col-start-1 col-span-2 text-white shadow-lg p-2 rounded-md"
            >
              Get HTML
            </button>
          </div>
          <div>
            <div>
              <p>Node count:</p>
              <h3 className="text-lg font-bold">0</h3>
            </div>
          </div>
        </section>
        <section className="flex flex-col items-start mx-auto">
          <p>Content</p>
          <article
            id="content"
            className="bg-white shadow-xl w-full min-h-[200px]"
          >
            <div className="prose">
              <h1>test</h1>
            </div>
          </article>
        </section>
        <section className="flex flex-col items-start mx-auto">
          <div className="grid grid-cols-8 w-full gap-4">
            <div className="col-start-1 col-span-3">
              <p>Post request</p>
              <input
                className="shadow-lg w-full"
                type="text"
                id="postRequest"
              />
            </div>
            <button
              type="button"
              className="bg-gray-800 col-start-1 col-span-2 text-white shadow-lg p-2 rounded-md"
            >
              Send
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hello />} />
      </Routes>
    </Router>
  );
}
