import Link from "next/link";
import type { ComponentProps } from "react";

/** 페이지 전환 애니메이션이 붙는 내부 링크 */
export default function TLink(props: ComponentProps<typeof Link>) {
  return <Link transitionTypes={["page"]} {...props} />;
}
