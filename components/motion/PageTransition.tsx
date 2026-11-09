import { ViewTransition } from "react";

/** 각 page.tsx 를 감싸 페이지 이동 시 이전 화면은 위로 흐려지고, 새 화면은 아래에서 떠오름 */
export default function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <ViewTransition
      enter={{ page: "page-in", default: "none" }}
      exit={{ page: "page-out", default: "none" }}
      default="none"
    >
      <main>{children}</main>
    </ViewTransition>
  );
}
