// Colocated 404 for routes inside the (features) route group. The
// group's layout (app/(features)/layout.tsx) already renders a fixed
// Nav — composing the root not-found.tsx here would render a second Nav
// on top of it, so we render just the 404 body and let the layout supply
// the chrome.

import { NotFoundContent } from "@/components/NotFoundContent";

// Bare title — root layout's title.template ("%s | Velt") appends the suffix.
export const metadata = {
  title: "Page not found",
  description:
    "The page you're looking for doesn't exist. Head back home or jump into the Velt docs.",
};

export default function FeaturesNotFound() {
  return <NotFoundContent />;
}
