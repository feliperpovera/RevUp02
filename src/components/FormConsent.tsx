import { Link } from "react-router-dom";
import { pagePath, useLang } from "@/config/i18n";

/** Consent notice shown under lead forms (contact consent for calls, texts and WhatsApp + policy links). */
export const FormConsent = () => {
  const lang = useLang();
  const link = "underline underline-offset-2 hover:text-performance";
  return lang === "es" ? (
    <p className="text-center text-[11px] font-light leading-relaxed text-stone">
      Al enviar, aceptas nuestra <Link to={pagePath("privacy", lang)} className={link}>Política de privacidad</Link> y{" "}
      <Link to={pagePath("terms", lang)} className={link}>Términos</Link>, y que RevUp te contacte por correo, llamada, mensaje de texto
      o WhatsApp sobre tu solicitud. Pueden aplicar tarifas de mensajes y datos. Responde STOP para dejar de recibir mensajes.
    </p>
  ) : (
    <p className="text-center text-[11px] font-light leading-relaxed text-stone">
      By submitting, you agree to our <Link to={pagePath("privacy", lang)} className={link}>Privacy Policy</Link> and{" "}
      <Link to={pagePath("terms", lang)} className={link}>Terms</Link>, and to be contacted by RevUp by email, call, text or WhatsApp about
      your request. Message and data rates may apply. Reply STOP to opt out.
    </p>
  );
};
