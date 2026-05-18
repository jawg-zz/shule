"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ToggleLeft } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Manage school profile and system preferences</p>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">School Profile</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="school-name">School Name</Label>
              <Input id="school-name" defaultValue="Shule High School" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="school-email">Email</Label>
              <Input id="school-email" type="email" defaultValue="info@shule.ac.ke" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="school-phone">Phone</Label>
              <Input id="school-phone" defaultValue="+254 712 345 678" />
            </div>
            <Button className="bg-green-700 hover:bg-green-800">Save Profile</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Preferences</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {preferences.map((preference) => (
              <div key={preference} className="flex items-center justify-between rounded-md border p-3">
                <span className="text-sm font-medium">{preference}</span>
                <Button variant="outline" size="icon" aria-label={`Toggle ${preference}`}>
                  <ToggleLeft className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

const preferences = [
  "Enable M-Pesa payments",
  "Send attendance alerts",
  "Use CBC grading by default",
];
