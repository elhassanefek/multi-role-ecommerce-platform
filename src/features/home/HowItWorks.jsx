export default function HowItWorks() {
  return (
    <section className="bg-gray-50 py-16 px-6 max-w-4xl mx-auto text-center">
      <h2 className="text-3xl font-bold mb-12">How It Works</h2>
      <div className="grid md:grid-cols-3 gap-10">
        <Step
          number="1️⃣"
          title="Enter Your Store"
          desc="Start by entering your store ID or name to access your store page."
        />
        <Step
          number="2️⃣"
          title="Manage Products & Sales"
          desc="Use the dashboard to add products and track your sales in real-time."
        />
        <Step
          number="3️⃣"
          title="Grow Your Business"
          desc="Analyze customer insights to make smarter sales and marketing decisions."
        />
      </div>
    </section>
  );
}

function Step({ number, title, desc }) {
  return (
    <div>
      <div className="mb-4 text-blue-600 text-5xl">{number}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p>{desc}</p>
    </div>
  );
}
