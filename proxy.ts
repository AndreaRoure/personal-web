import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Todo menos ficheros estaticos (con extension) y las rutas internas de Next.
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
