import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building, MapPin, IndianRupee } from "lucide-react";

const ForumExplainer = () => {
  const forums = [
    {
      title: "District Consumer Forum",
      icon: Building,
      range: "Up to ₹1 Crore",
      description: "Handles complaints for goods and services valued up to ₹1 crore. Most common complaints are filed here.",
      features: ["Local jurisdiction", "Faster resolution", "Lower fees", "Accessible location"],
      color: "bg-trust"
    },
    {
      title: "State Consumer Commission",
      icon: MapPin,
      range: "₹1 - ₹10 Crore",
      description: "Appeals from District Forums and original complaints between ₹1-10 crore are handled here.",
      features: ["State-level authority", "Appellate jurisdiction", "Higher compensation", "Expert panels"],
      color: "bg-primary"
    },
    {
      title: "National Consumer Commission",
      icon: IndianRupee,
      range: "Above ₹10 Crore",
      description: "Highest consumer forum handling high-value complaints and appeals from State Commissions.",
      features: ["Supreme authority", "Pan-India jurisdiction", "Complex cases", "Final appellate court"],
      color: "bg-accent"
    }
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Understanding Consumer Forums</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            India has a three-tier consumer protection system. We automatically determine the right forum based on your complaint value and location.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {forums.map((forum, index) => (
            <Card key={index} className="shadow-soft hover:shadow-medium transition-all duration-300 border-0 overflow-hidden">
              <CardHeader className={`${forum.color} text-white p-6`}>
                <div className="flex items-center justify-between mb-4">
                  <forum.icon className="w-8 h-8" />
                  <Badge variant="secondary" className="text-xs font-medium">
                    {forum.range}
                  </Badge>
                </div>
                <CardTitle className="text-xl">{forum.title}</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {forum.description}
                </p>
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm text-foreground mb-3">Key Features:</h4>
                  {forum.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center text-sm">
                      <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                      <span className="text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="bg-gradient-card p-8 rounded-lg shadow-soft max-w-4xl mx-auto">
            <h3 className="text-2xl font-semibold mb-4">Don't Worry About Choosing</h3>
            <p className="text-muted-foreground text-lg">
              Our system automatically identifies the correct consumer forum based on your complaint details. 
              You just need to provide the information, and we'll handle the rest.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ForumExplainer;