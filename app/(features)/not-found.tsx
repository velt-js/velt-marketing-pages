// Colocated 404 for routes inside the (features) route group. The group's
// layout is a pass-through (the page bodies own their nav), so this 404 wraps
// its content in FixedNavLayout to supply the nav chrome itself.

import { FixedNavLayout } from "@/components/home/FixedNavLayout";
import { NotFoundContent } from "@/components/NotFoundContent";

// Bare title — root layout's title.template ("%s | Velt") appends the suffix.
export const metadata = {
  title: "Page not found",
  description:
    "The page you're looking for doesn't exist. Head back home or jump into the Velt docs.",
};

export default function FeaturesNotFound() {
  return (
    <FixedNavLayout>
      <NotFoundContent />
    </FixedNavLayout>
  );
}
