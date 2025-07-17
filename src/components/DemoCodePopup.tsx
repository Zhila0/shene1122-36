
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface DemoCodePopupProps {
  isOpen: boolean;
  onCodeSubmit: (code: string) => void;
}

export function DemoCodePopup({ isOpen, onCodeSubmit }: DemoCodePopupProps) {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (code === "111" || code === "222" || code === "333") {
      onCodeSubmit(code);
      setError("");
      setCode("");
    } else {
      setError("کۆدی نادروست! تکایە یەکێک لەمانە داخل بکە: 111، 222، 333");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && code.length === 3) {
      handleSubmit();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onCodeSubmit("")}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold">
            کۆدی جۆری تاقیکردنەوە داخل بکە
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Input
              type="text"
              placeholder="کۆدی جۆری تاقیکردنەوە..."
              value={code}
              onChange={(e) => setCode(e.target.value)}
              onKeyDown={handleKeyDown}
              className="text-center text-lg"
              maxLength={3}
            />
            {error && (
              <p className="text-destructive text-sm text-center">{error}</p>
            )}
          </div>
          <div className="text-sm text-muted-foreground space-y-1">
            <p>• 111 - جۆری یەکەم</p>
            <p>• 222 - جۆری دووەم</p>
            <p>• 333 - جۆری سێیەم (زیاد دەکرێت)</p>
          </div>
          <Button 
            onClick={handleSubmit} 
            className="w-full"
            disabled={code.length !== 3}
          >
            دەست پێکردن
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
