export default function FeaturesSection() {
  return (
    <section className="py-16 px-6 max-w-6xl mx-auto text-center">
      <h2 className="text-3xl font-bold mb-12">Why Choose Us?</h2>
      <div className="grid md:grid-cols-3 gap-10">
        <Feature
          icon="📊"
          title="Sales Tracking"
          desc="Get real-time insights into your sales and product performance."
        />
        <Feature
          icon="🛠️"
          title="Easy Product Management"
          desc="Add, edit, and organize your products effortlessly from your dashboard."
        />
        <Feature
          icon="🌍"
          title="Customer Insights"
          desc="Discover which cities, age groups, and genders are buying your products."
        />
      </div>
    </section>
  );
}

function Feature({ icon, title, desc }) {
  return (
    <div>
      <div className="mb-4 text-blue-600 text-5xl">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p>{desc}</p>
    </div>
  );
}
