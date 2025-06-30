import DriverStats from "@/components/driver/driver-stats";
import AvailablePickups from "@/components/driver/available-pickups";

export default function DriverDashboard() {
  return (
    <div className="py-8 px-4 bg-automotive-black-900 min-h-screen pb-20 md:pb-8">
      <div className="container mx-auto max-w-6xl">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <DriverStats />
          </div>
          <div className="lg:col-span-2">
            <AvailablePickups />
          </div>
        </div>
      </div>
    </div>
  );
}
