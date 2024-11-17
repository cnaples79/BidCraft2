import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Brush, Camera, Car, Diamond, Gamepad, Watch } from "lucide-react";

const CATEGORIES = [
  {
    name: "Art",
    icon: Brush,
    items: 1234,
  },
  {
    name: "Watches",
    icon: Watch,
    items: 856,
  },
  {
    name: "Jewelry",
    icon: Diamond,
    items: 643,
  },
  {
    name: "Collectibles",
    icon: Gamepad,
    items: 1567,
  },
  {
    name: "Vehicles",
    icon: Car,
    items: 432,
  },
  {
    name: "Photography",
    icon: Camera,
    items: 789,
  },
];

export function TrendingCategories() {
  return (
    <section className="container">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold tracking-tight">Popular Categories</h2>
        <Button variant="ghost">View all</Button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {CATEGORIES.map((category) => (
          <Card key={category.name} className="group cursor-pointer hover:border-primary transition-colors">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <category.icon className="h-12 w-12 mb-4 group-hover:text-primary transition-colors" />
              <h3 className="font-semibold mb-1">{category.name}</h3>
              <p className="text-sm text-muted-foreground">{category.items} items</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}