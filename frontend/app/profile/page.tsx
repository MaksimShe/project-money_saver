import { ProfilePageClient } from "@/src/components/Profile/ProfilePageClient";
import { ProfileSummary } from "@/src/components/Profile/ProfileSummary";
import { QuickActions } from "@/src/components/Profile/QuickActions";

export default function ProfilePage () {
  return (
    <div className="min-h-screen w-full bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto space-y-8">

        {/* Profile Main Content */}
        <ProfilePageClient />
      </div>
    </div>
  )
}