import { Card, CardContent } from "../components/ui/card";
import { AlertCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-900">
      <Card className="w-full max-w-md mx-4 bg-black border-yellow-600/20">
        <CardContent className="pt-6">
          <div className="flex mb-4 gap-2 items-center">
            <AlertCircle className="h-8 w-8 text-yellow-500" />
            <h1 className="text-2xl font-bold text-yellow-500">404 Page Not Found</h1>
          </div>

          <p className="mt-4 text-sm text-gray-300">
            The page you're looking for doesn't exist. Let's get you back to{" "}
            <a href="/" className="text-yellow-500 hover:underline">home</a>.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
