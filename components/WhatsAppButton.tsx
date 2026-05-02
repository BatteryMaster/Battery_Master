"use client";
export default function WhatsAppButton() {
  return (
    <>
      <style>{`
        @keyframes wa-pulse {
          0%   { box-shadow: 0 0 0 0 rgba(37,211,102,0.55); }
          70%  { box-shadow: 0 0 0 14px rgba(37,211,102,0); }
          100% { box-shadow: 0 0 0 0 rgba(37,211,102,0); }
        }
        @keyframes wa-bounce {
          0%, 100% { transform: translateY(0) scale(1); }
          30%       { transform: translateY(-6px) scale(1.08); }
          60%       { transform: translateY(-2px) scale(1.03); }
        }
        .wa-float {
          position: fixed;
          bottom: 24px;
          right: 24px;
          z-index: 999;
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background: #25D366;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 20px rgba(37,211,102,0.45);
          animation: wa-pulse 2s infinite, wa-bounce 3s ease-in-out infinite;
          transition: transform .2s, box-shadow .2s;
          text-decoration: none;
        }
        .wa-float:hover {
          animation: none;
          transform: scale(1.15) !important;
          box-shadow: 0 8px 30px rgba(37,211,102,0.60) !important;
        }
      `}</style>
      <a
        href="https://wa.me/923150220243"
        target="_blank"
        rel="noopener noreferrer"
        className="wa-float"
        title="WhatsApp Order"
      >
        <svg width="30" height="30" viewBox="0 0 24 24" fill="white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
          <path d="M12 0C5.373 0 0 5.373 0 12c0 2.117.552 4.103 1.513 5.824L0 24l6.341-1.487A11.932 11.932 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.79 9.79 0 01-5.015-1.379l-.36-.214-3.727.875.891-3.652-.234-.374A9.774 9.774 0 012.182 12C2.182 6.579 6.579 2.182 12 2.182S21.818 6.579 21.818 12 17.421 21.818 12 21.818z"/>
        </svg>
      </a>
    </>
  );
}
