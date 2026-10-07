// Libraries Imports
import { FileText } from "lucide-react";

export default function EmptyStateComp() {
  return (
    <div className="w-full max-w-md mx-auto py-12 text-center">
      <FileText className="w-8 h-8 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
      <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-1">
        Coming Soon
      </h3>
      <p className="text-xs text-gray-400 dark:text-gray-500">
        This section is being updated.
      </p>
    </div>
  );
}
