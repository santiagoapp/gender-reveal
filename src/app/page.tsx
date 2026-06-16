import CoverGate from "@/components/CoverGate";
import Invitation from "@/components/Invitation";

// Root invitation (no specific group). Per-group URLs live at /<slug>/.
export default function Home() {
  return (
    <CoverGate>
      <Invitation />
    </CoverGate>
  );
}
