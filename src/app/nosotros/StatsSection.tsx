import React from "react";

// Usa las mismas definiciones que en Navbar.tsx
const SHARED_MAX_WIDTH_CLASS = "max-w-screen-xl";
const SHARED_HORIZONTAL_PADDING_CLASSES = "px-4 sm:px-6 lg:px-8";

const statsData = [
  { value: "10+", label: "Años de Experiencia" },
  { value: "20+", label: "Clientes Satisfechos" },
];

const StatsSection = () => {
  return (
    <section className="py-12 md:py-16 bg-slate-50 w-full">
      <div
        className={`mx-auto ${SHARED_MAX_WIDTH_CLASS} ${SHARED_HORIZONTAL_PADDING_CLASSES}`}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 text-center">
          {statsData.map((stat, index) => (
            <div key={index} className="p-6 rounded-lg">
              <div className="text-4xl md:text-5xl font-extrabold text-(--color-primary) mb-2">
                {stat.value}
              </div>
              <div className="text-base md:text-lg text-slate-600">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
