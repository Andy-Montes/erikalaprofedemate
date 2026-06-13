import React from "react";

// Link de pago de Flow de Erika (botón de pago genérico: sirve para
// cualquier clase, programa o producto). El usuario hace clic en el
// botón con la estética de la marca y solo el checkout final ocurre en Flow.
const FLOW_PAYMENT_URL =
  "https://www.flow.cl/app/web/pagarBtnPago.php?token=oa36972d1d1f342ee3c33150f7654ee508b5e1f2";

const PaymentSection: React.FC = () => {
  return (
    <section className="py-16 lg:py-24 scroll-mt-24" id="pagos">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Encabezado */}
        <div className="text-center mb-12">
          <span className="text-brandNavy font-bold text-[14px] sm:text-[16px] mb-2 block">
            Pagos
          </span>
          <h2 className="text-2xl md:text-3xl font-black text-brandNavy leading-tight">
            Paga tus clases o productos{" "}
            <span className="text-brandRed">de forma segura</span>
          </h2>
        </div>

        {/* Tarjeta de pago destacada */}
        <div className="relative rounded-[3rem] bg-[#38388d] shadow-inner border-2 border-white/20 overflow-hidden group">
          {/* Glow shine (mismo efecto que las tarjetas de programas) */}
          <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
            <div className="absolute -top-24 -left-44 h-[185%] w-20 rotate-[18deg] bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.12)_24%,rgba(255,255,255,0.88)_50%,rgba(255,255,255,0.12)_76%,transparent_100%)] blur-md opacity-35 group-hover:opacity-95 group-hover:translate-x-[760px] transition-all duration-1000 ease-out" />
          </div>

          <div className="px-6 sm:px-10 py-10 relative z-10">
            <div className="bg-white rounded-[2rem] border border-white/70 shadow-[0_28px_70px_-45px_rgba(0,0,0,0.40)] p-8 sm:p-10 text-center">
              {/* Ícono de pago seguro */}
              <div
                className="mx-auto mb-5 flex items-center justify-center w-16 h-16 rounded-2xl"
                style={{ background: "rgba(0,134,242,0.10)" }}
                aria-hidden="true"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="w-8 h-8"
                  fill="none"
                  stroke="#0086f2"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="11" width="18" height="11" rx="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  <circle cx="12" cy="16.5" r="1.5" />
                </svg>
              </div>

              <h3 className="text-xl sm:text-[23px] font-black text-brandNavy mb-3">
                Realiza tu pago en línea
              </h3>
              <p className="text-slate-600 text-[15px] sm:text-[16px] leading-[1.8] max-w-xl mx-auto mb-8">
                Paga tu programa, clase o material con{" "}
                <strong className="font-semibold text-slate-900">Erika</strong> de
                forma rápida y segura. Aceptamos tarjetas de crédito, débito y
                transferencia.
              </p>

              <a
                href={FLOW_PAYMENT_URL}
                target="_blank"
                rel="noreferrer"
                aria-label="Ir a pagar de forma segura con Flow"
                className="inline-flex items-center justify-center gap-2 bg-brandNavy text-white font-bold text-[14px] sm:text-[15px] uppercase tracking-[0.14em] py-4 px-10 rounded-xl shadow-lg transition-all duration-300 hover:bg-[#162a4f] hover:-translate-y-0.5 active:scale-[0.99]"
              >
                Pagar ahora <span aria-hidden="true">→</span>
              </a>

              <div className="mt-6 flex items-center justify-center gap-2 text-slate-400 text-[12px] font-medium">
                <svg
                  viewBox="0 0 24 24"
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
                Pago seguro procesado por Flow
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PaymentSection;
