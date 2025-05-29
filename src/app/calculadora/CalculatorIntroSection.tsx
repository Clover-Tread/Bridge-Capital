import React from "react";

const SHARED_MAX_WIDTH_CLASS = "max-w-screen-xl";
const SHARED_HORIZONTAL_PADDING_CLASSES = "px-4 sm:px-6 lg:px-8";
const CONTENT_PADDING_TOP_CLASS = "pt-32"; // Ajusta según la altura de tu Navbar

const CalculatorIntroSection = () => {
  return (
    <section
      className={`relative w-full bg-slate-50 flex flex-col items-center text-center overflow-hidden ${CONTENT_PADDING_TOP_CLASS} pt-12 md:pt-16`}
      // Esta sección es la primera, así que necesita el padding para el Navbar
      // y su propio padding interno (el segundo pt-12/pt-16)
    >
      <div
        className={`mx-auto ${SHARED_MAX_WIDTH_CLASS} ${SHARED_HORIZONTAL_PADDING_CLASSES} pb-12 md:pb-16`}>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-800 mb-4">
          Simula Tu Inversión, Planifica Tu Futuro.
        </h1>
        <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto">
          Aquí podrás calcular los rendimientos aproximados de tus inversiones a
          lo largo de los años, tú decides el plazo y el monto a invertir.
        </p>
      </div>
    </section>
  );
};

export default CalculatorIntroSection;
