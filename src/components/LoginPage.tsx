import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Train, Shield, Users } from 'lucide-react';

interface LoginPageProps {
  onLogin: () => void;
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side - Hero Image */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-blue-600 to-green-600">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1602244314547-473f532b7bfa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHttb2Rlcm4lMjB0cmFpbiUyMGRhc2hib2FyZCUyMHRlY2hub2xvZ3l8ZW58MXx8fHwxNzU2NTM5Nzc5fDA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Kochi Metro Train"
          className="w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-8 left-8 right-8 text-white">
          <h1 className="text-4xl mb-4">കൊച്ചി മെട്രോ</h1>
          <h2 className="text-3xl mb-2">Fleet Management System</h2>
          <p className="text-lg opacity-90">Intelligent Train Scheduling & Operations Dashboard</p>
          <div className="flex items-center gap-6 mt-6">
            <div className="flex items-center gap-2">
              <Train className="w-5 h-5" />
              <span>25 Trainsets</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              <span>99.5% Punctuality</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              <span>Smart Operations</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="p-3 bg-blue-600 rounded-xl">
                <Train className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl text-blue-900">KMRL</h1>
                <p className="text-sm text-blue-600">Fleet Operations</p>
              </div>
            </div>
          </div>

          <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-2xl text-gray-800">Welcome Back</CardTitle>
              <CardDescription className="text-gray-600">
                Sign in to access the Fleet Management Dashboard
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="username" className="text-gray-700">Username</Label>
                  <Input
                    id="username"
                    type="text"
                    placeholder="Enter your username"
                    value={credentials.username}
                    onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                    className="h-12 bg-white/50 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-gray-700">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={credentials.password}
                    onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                    className="h-12 bg-white/50 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full h-12 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white shadow-lg"
                >
                  Sign In to Dashboard
                </Button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-500">
                  Demo credentials: admin / password
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="mt-8 text-center text-xs text-gray-500">
            <p>© 2024 Kochi Metro Rail Limited. All rights reserved.</p>
            <p className="mt-1">Intelligent Fleet Management System v2.0</p>
          </div>
        </div>
      </div>
    </div>
  );
}
