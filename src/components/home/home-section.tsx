import type { ComponentProps } from "react";

import { Section } from "@/components/section";

type HomeSectionProps = ComponentProps<typeof Section>;

export function HomeSection(props: HomeSectionProps) {
  return <Section {...props} />;
}
